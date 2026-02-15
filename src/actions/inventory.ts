'use server'

import { db } from '@/db';
import { inventory, inventoryMovements, products, users } from '@/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { eq, and, desc, gte, lte } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
  role?: string;
}

async function getCurrentUserWithOrg() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user as SessionUser | undefined;
  if (!user?.id) return null;

  const [dbUser] = await db
    .select({ organizationId: users.organizationId })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  return {
    id: user.id,
    organizationId: dbUser?.organizationId ?? null,
  };
}

export type InventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface InventoryFilters {
  status?: InventoryStatus;
  search?: string;
}

export interface MovementFilters {
  type?: 'purchase' | 'sale' | 'adjustment' | 'transfer';
  productId?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface InventoryItemWithProduct {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantityOnHand: number;
  quantityReserved: number;
  availableQuantity: number;
  reorderPoint: number;
  status: InventoryStatus;
  price: string;
  updatedAt: Date;
}

export interface InventoryStats {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  totalValue: number;
}

export interface MovementWithProduct {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: 'purchase' | 'sale' | 'adjustment' | 'transfer';
  quantity: number;
  reason: string | null;
  referenceId: string | null;
  createdAt: Date;
}

function getStockStatus(available: number, reorderPoint: number): InventoryStatus {
  if (available <= 0) return 'out-of-stock';
  if (available <= reorderPoint) return 'low-stock';
  return 'in-stock';
}

export async function getInventory(
  organizationId: string,
  filters?: InventoryFilters
): Promise<InventoryItemWithProduct[]> {
  const user = await getCurrentUserWithOrg();
  if (!user || !user.organizationId || user.organizationId !== organizationId) {
    throw new Error('Unauthorized');
  }

  const query = db
    .select({
      id: inventory.id,
      productId: inventory.productId,
      productName: products.name,
      sku: products.sku,
      quantityOnHand: inventory.quantityOnHand,
      quantityReserved: inventory.quantityReserved,
      reorderPoint: inventory.reorderPoint,
      price: products.price,
      updatedAt: inventory.updatedAt,
    })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .where(eq(inventory.organizationId, organizationId));

  const results = await query;

  const items: InventoryItemWithProduct[] = results.map((item) => {
    const available = item.quantityOnHand - item.quantityReserved;
    const reorderPoint = item.reorderPoint ?? 0;
    return {
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      sku: item.sku,
      quantityOnHand: item.quantityOnHand,
      quantityReserved: item.quantityReserved,
      availableQuantity: available,
      reorderPoint,
      status: getStockStatus(available, reorderPoint),
      price: item.price,
      updatedAt: item.updatedAt,
    };
  });

  let filtered = items;

  if (filters?.status) {
    filtered = filtered.filter((item) => item.status === filters.status);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.productName.toLowerCase().includes(searchLower) ||
        item.sku.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
}

export async function getInventoryItem(
  productId: string,
  organizationId: string
): Promise<InventoryItemWithProduct | null> {
  const user = await getCurrentUserWithOrg();
  if (!user || !user.organizationId || user.organizationId !== organizationId) {
    throw new Error('Unauthorized');
  }

  const result = await db
    .select({
      id: inventory.id,
      productId: inventory.productId,
      productName: products.name,
      sku: products.sku,
      quantityOnHand: inventory.quantityOnHand,
      quantityReserved: inventory.quantityReserved,
      reorderPoint: inventory.reorderPoint,
      price: products.price,
      updatedAt: inventory.updatedAt,
    })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .where(
      and(
        eq(inventory.productId, productId),
        eq(inventory.organizationId, organizationId)
      )
    )
    .limit(1);

  if (result.length === 0) return null;

  const item = result[0];
  const available = item.quantityOnHand - item.quantityReserved;
  const reorderPoint = item.reorderPoint ?? 0;

  return {
    id: item.id,
    productId: item.productId,
    productName: item.productName,
    sku: item.sku,
    quantityOnHand: item.quantityOnHand,
    quantityReserved: item.quantityReserved,
    availableQuantity: available,
    reorderPoint,
    status: getStockStatus(available, reorderPoint),
    price: item.price,
    updatedAt: item.updatedAt,
  };
}

export async function updateInventoryItem(
  productId: string,
  organizationId: string,
  data: { quantityOnHand?: number; quantityReserved?: number; reorderPoint?: number }
): Promise<void> {
  const user = await getCurrentUserWithOrg();
  if (!user || !user.organizationId || user.organizationId !== organizationId) {
    throw new Error('Unauthorized');
  }

  const existing = await db
    .select()
    .from(inventory)
    .where(
      and(
        eq(inventory.productId, productId),
        eq(inventory.organizationId, organizationId)
      )
    )
    .limit(1);

  if (existing.length === 0) {
    throw new Error('Inventory item not found');
  }

  await db
    .update(inventory)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(inventory.id, existing[0].id));

  revalidatePath('/app/inventory');
}

export async function adjustInventory(
  productId: string,
  organizationId: string,
  quantity: number,
  reason: string,
  type: 'add' | 'remove' | 'set'
): Promise<void> {
  const user = await getCurrentUserWithOrg();
  if (!user || !user.organizationId || user.organizationId !== organizationId) {
    throw new Error('Unauthorized');
  }

  const existing = await db
    .select()
    .from(inventory)
    .where(
      and(
        eq(inventory.productId, productId),
        eq(inventory.organizationId, organizationId)
      )
    )
    .limit(1);

  if (existing.length === 0) {
    throw new Error('Inventory item not found');
  }

  const currentQty = existing[0].quantityOnHand;
  let newQty: number;
  let movementQty: number;

  if (type === 'add') {
    newQty = currentQty + quantity;
    movementQty = quantity;
  } else if (type === 'remove') {
    newQty = Math.max(0, currentQty - quantity);
    movementQty = -quantity;
  } else {
    newQty = quantity;
    movementQty = quantity - currentQty;
  }

  await db.transaction(async (tx) => {
    await tx
      .update(inventory)
      .set({
        quantityOnHand: newQty,
        updatedAt: new Date(),
      })
      .where(eq(inventory.id, existing[0].id));

    await tx.insert(inventoryMovements).values({
      id: crypto.randomUUID(),
      productId,
      organizationId,
      type: 'adjustment',
      quantity: movementQty,
      reason,
      referenceId: null,
      createdAt: new Date(),
    });
  });

  revalidatePath('/app/inventory');
  revalidatePath('/app/inventory/movements');
}

export async function getInventoryMovements(
  organizationId: string,
  filters?: MovementFilters
): Promise<MovementWithProduct[]> {
  const user = await getCurrentUserWithOrg();
  if (!user || !user.organizationId || user.organizationId !== organizationId) {
    throw new Error('Unauthorized');
  }

  const conditions = [eq(inventoryMovements.organizationId, organizationId)];

  if (filters?.type) {
    conditions.push(eq(inventoryMovements.type, filters.type));
  }

  if (filters?.productId) {
    conditions.push(eq(inventoryMovements.productId, filters.productId));
  }

  if (filters?.startDate) {
    conditions.push(gte(inventoryMovements.createdAt, filters.startDate));
  }

  if (filters?.endDate) {
    conditions.push(lte(inventoryMovements.createdAt, filters.endDate));
  }

  const results = await db
    .select({
      id: inventoryMovements.id,
      productId: inventoryMovements.productId,
      productName: products.name,
      sku: products.sku,
      type: inventoryMovements.type,
      quantity: inventoryMovements.quantity,
      reason: inventoryMovements.reason,
      referenceId: inventoryMovements.referenceId,
      createdAt: inventoryMovements.createdAt,
    })
    .from(inventoryMovements)
    .innerJoin(products, eq(inventoryMovements.productId, products.id))
    .where(and(...conditions))
    .orderBy(desc(inventoryMovements.createdAt));

  return results;
}

export async function getLowStockItems(
  organizationId: string
): Promise<InventoryItemWithProduct[]> {
  return getInventory(organizationId, { status: 'low-stock' });
}

export async function getInventoryStats(
  organizationId: string
): Promise<InventoryStats> {
  const user = await getCurrentUserWithOrg();
  if (!user || !user.organizationId || user.organizationId !== organizationId) {
    throw new Error('Unauthorized');
  }

  const results = await db
    .select({
      quantityOnHand: inventory.quantityOnHand,
      quantityReserved: inventory.quantityReserved,
      reorderPoint: inventory.reorderPoint,
      price: products.price,
    })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .where(eq(inventory.organizationId, organizationId));

  let totalProducts = 0;
  let lowStockCount = 0;
  let outOfStockCount = 0;
  let totalValue = 0;

  for (const item of results) {
    totalProducts++;
    const available = item.quantityOnHand - item.quantityReserved;
    const reorderPoint = item.reorderPoint ?? 0;
    const price = parseFloat(item.price || '0');

    totalValue += item.quantityOnHand * price;

    if (available <= 0) {
      outOfStockCount++;
    } else if (available <= reorderPoint) {
      lowStockCount++;
    }
  }

  return {
    totalProducts,
    lowStockCount,
    outOfStockCount,
    totalValue,
  };
}

export async function getProductsWithInventory(organizationId: string) {
  const user = await getCurrentUserWithOrg();
  if (!user || !user.organizationId || user.organizationId !== organizationId) {
    throw new Error('Unauthorized');
  }

  const results = await db
    .select({
      id: products.id,
      name: products.name,
      sku: products.sku,
    })
    .from(products)
    .leftJoin(
      inventory,
      and(
        eq(products.id, inventory.productId),
        eq(inventory.organizationId, organizationId)
      )
    )
    .where(eq(products.organizationId, organizationId));

  return results;
}
