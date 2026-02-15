'use server'

import { db } from '@/db';
import { orders, orderItems, cartItems, products, inventory, inventoryMovements, organizations } from '@/db/schema';
import { eq, and, desc, ilike } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type OrderStatus = typeof orders.$inferSelect['status'];

export type OrderWithItems = {
  id: string;
  orderNumber: string;
  organizationId: string;
  distributorId: string;
  status: OrderStatus;
  total: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  distributor: { id: string; name: string } | null;
  items: {
    id: string;
    productId: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    notes: string | null;
    product: { id: string; sku: string; name: string } | null;
  }[];
};

export type OrderListItem = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  total: string;
  createdAt: Date;
  distributor: { name: string } | null;
};

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `ORD-${year}-${random}`;
}

export async function getOrders(
  organizationId: string,
  filters?: {
    status?: OrderStatus;
    search?: string;
    page?: number;
    pageSize?: number;
  }
): Promise<{ orders: OrderListItem[]; total: number }> {
  const page = filters?.page || 1;
  const pageSize = filters?.pageSize || 10;
  const offset = (page - 1) * pageSize;

  const conditions = [eq(orders.organizationId, organizationId)];

  if (filters?.status) {
    conditions.push(eq(orders.status, filters.status));
  }

  if (filters?.search) {
    conditions.push(ilike(orders.orderNumber, `%${filters.search}%`));
  }

  const allOrders = await db
    .select({
      id: orders.id,
      orderNumber: orders.orderNumber,
      status: orders.status,
      total: orders.total,
      createdAt: orders.createdAt,
      distributor: { name: organizations.name },
    })
    .from(orders)
    .leftJoin(organizations, eq(orders.distributorId, organizations.id))
    .where(and(...conditions))
    .orderBy(desc(orders.createdAt));

  const paginatedOrders = allOrders.slice(offset, offset + pageSize);

  return {
    orders: paginatedOrders,
    total: allOrders.length,
  };
}

export async function getOrderById(id: string): Promise<OrderWithItems | null> {
  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: {
      distributor: {
        columns: { id: true, name: true },
      },
      items: {
        with: {
          product: {
            columns: { id: true, sku: true, name: true },
          },
        },
      },
    },
  });

  if (!order) return null;

  return order as OrderWithItems;
}

export async function createOrderFromCart(
  userId: string,
  organizationId: string,
  distributorId: string,
  notes?: string
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    const cartItemsList = await db.query.cartItems.findMany({
      where: eq(cartItems.userId, userId),
      with: {
        product: {
          columns: {
            id: true,
            sku: true,
            name: true,
            price: true,
            organizationId: true,
          },
        },
      },
    });

    if (cartItemsList.length === 0) {
      return { success: false, error: 'Cart is empty' };
    }

    const orderItemsData: {
      productId: string;
      quantity: number;
      unitPrice: string;
      totalPrice: string;
    }[] = [];

    for (const item of cartItemsList) {
      if (item.product && 'price' in item.product) {
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price,
          totalPrice: (parseFloat(item.product.price) * item.quantity).toFixed(2),
        });
      }
    }

    const total = orderItemsData.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0);

    const orderId = crypto.randomUUID();
    const orderNumber = generateOrderNumber();

    await db.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: orderId,
        orderNumber,
        organizationId,
        distributorId,
        status: 'pending',
        total: total.toFixed(2),
        notes,
      });

      await tx.insert(orderItems).values(
        orderItemsData.map((item) => ({
          id: crypto.randomUUID(),
          orderId,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
        }))
      );

      await tx.delete(cartItems).where(eq(cartItems.userId, userId));
    });

    revalidatePath('/app/orders');
    revalidatePath('/app/cart');
    return { success: true, orderId };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Failed to create order' };
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });

    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    await db
      .update(orders)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    if (status === 'delivered') {
      const items = await db.query.orderItems.findMany({
        where: eq(orderItems.orderId, orderId),
      });

      for (const item of items) {
        const existingInventory = await db.query.inventory.findFirst({
          where: and(
            eq(inventory.productId, item.productId),
            eq(inventory.organizationId, order.organizationId)
          ),
        });

        if (existingInventory) {
          await db
            .update(inventory)
            .set({
              quantityOnHand: existingInventory.quantityOnHand + item.quantity,
              updatedAt: new Date(),
            })
            .where(eq(inventory.id, existingInventory.id));
        } else {
          await db.insert(inventory).values({
            id: crypto.randomUUID(),
            productId: item.productId,
            organizationId: order.organizationId,
            quantityOnHand: item.quantity,
            quantityReserved: 0,
          });
        }

        await db.insert(inventoryMovements).values({
          id: crypto.randomUUID(),
          productId: item.productId,
          organizationId: order.organizationId,
          type: 'purchase',
          quantity: item.quantity,
          reason: `Order ${order.orderNumber} delivered`,
          referenceId: orderId,
        });
      }
    }

    revalidatePath('/app/orders');
    revalidatePath(`/app/orders/${orderId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: 'Failed to update order status' };
  }
}

export async function cancelOrder(orderId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });

    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      return { success: false, error: 'Cannot cancel order that has been shipped or delivered' };
    }

    await db
      .update(orders)
      .set({
        status: 'cancelled',
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    revalidatePath('/app/orders');
    revalidatePath(`/app/orders/${orderId}`);
    return { success: true };
  } catch (error) {
    console.error('Error cancelling order:', error);
    return { success: false, error: 'Failed to cancel order' };
  }
}

export { generateOrderNumber };