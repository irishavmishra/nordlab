'use server'

import { db } from '@/db';
import { cartItems, products, inventory } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type CartItemWithProduct = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: {
    id: string;
    sku: string;
    name: string;
    price: string;
    description: string | null;
  } | null;
  inventory: {
    quantityOnHand: number;
    quantityReserved: number;
  } | null;
};

export async function getCart(userId: string): Promise<CartItemWithProduct[]> {
  const items = await db
    .select({
      id: cartItems.id,
      userId: cartItems.userId,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      createdAt: cartItems.createdAt,
      updatedAt: cartItems.updatedAt,
      product: {
        id: products.id,
        sku: products.sku,
        name: products.name,
        price: products.price,
        description: products.description,
      },
      inventory: {
        quantityOnHand: inventory.quantityOnHand,
        quantityReserved: inventory.quantityReserved,
      },
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .leftJoin(inventory, and(eq(inventory.productId, products.id), eq(inventory.organizationId, products.organizationId)))
    .where(eq(cartItems.userId, userId));

  return items;
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number = 1
): Promise<{ success: boolean; error?: string }> {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    });

    if (!product) {
      return { success: false, error: 'Product not found' };
    }

    const existingItem = await db.query.cartItems.findFirst({
      where: and(eq(cartItems.userId, userId), eq(cartItems.productId, productId)),
    });

    if (existingItem) {
      await db
        .update(cartItems)
        .set({
          quantity: existingItem.quantity + quantity,
          updatedAt: new Date(),
        })
        .where(eq(cartItems.id, existingItem.id));
    } else {
      await db.insert(cartItems).values({
        id: crypto.randomUUID(),
        userId,
        productId,
        quantity,
      });
    }

    revalidatePath('/app/cart');
    return { success: true };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: 'Failed to add item to cart' };
  }
}

export async function updateCartItem(
  userId: string,
  cartItemId: string,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  try {
    if (quantity < 1) {
      return { success: false, error: 'Quantity must be at least 1' };
    }

    const cartItem = await db.query.cartItems.findFirst({
      where: eq(cartItems.id, cartItemId),
    });

    if (!cartItem || cartItem.userId !== userId) {
      return { success: false, error: 'Cart item not found' };
    }

    await db
      .update(cartItems)
      .set({
        quantity,
        updatedAt: new Date(),
      })
      .where(eq(cartItems.id, cartItemId));

    revalidatePath('/app/cart');
    return { success: true };
  } catch (error) {
    console.error('Error updating cart item:', error);
    return { success: false, error: 'Failed to update cart item' };
  }
}

export async function removeFromCart(
  userId: string,
  cartItemId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const cartItem = await db.query.cartItems.findFirst({
      where: eq(cartItems.id, cartItemId),
    });

    if (!cartItem || cartItem.userId !== userId) {
      return { success: false, error: 'Cart item not found' };
    }

    await db.delete(cartItems).where(eq(cartItems.id, cartItemId));

    revalidatePath('/app/cart');
    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error: 'Failed to remove item from cart' };
  }
}

export async function clearCart(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await db.delete(cartItems).where(eq(cartItems.userId, userId));

    revalidatePath('/app/cart');
    return { success: true };
  } catch (error) {
    console.error('Error clearing cart:', error);
    return { success: false, error: 'Failed to clear cart' };
  }
}

export async function getCartTotal(
  userId: string
): Promise<{ subtotal: number; itemCount: number }> {
  const items = await getCart(userId);

  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.product?.price || '0');
    return sum + price * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, itemCount };
}
