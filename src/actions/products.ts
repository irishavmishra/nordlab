'use server'

import { db } from '@/db';
import { products, categories, inventory, productImages, users } from '@/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { eq, and, ilike, desc, asc, sql, or, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
  role?: string;
}

function getSessionOrganizationId(session: { user?: SessionUser } | null): string | null {
  return session?.user?.organizationId ?? null;
}

export interface ProductFilters {
  search?: string;
  categoryId?: string;
  isActive?: boolean;
  sortBy?: 'name' | 'price' | 'sku';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ProductWithInventory {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  price: string;
  cost: string | null;
  organizationId: string;
  categoryId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: { id: string; name: string } | null;
  inventory: { quantityOnHand: number; quantityReserved: number } | null;
  images: { id: string; url: string; alt: string | null; sortOrder: number }[];
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getProducts(
  organizationId: string,
  filters?: ProductFilters
): Promise<PaginatedResult<ProductWithInventory>> {
  const page = filters?.page ?? 1;
  const limit = filters?.limit ?? 12;
  const offset = (page - 1) * limit;

  const conditions = [eq(products.organizationId, organizationId)];

  if (filters?.isActive !== undefined) {
    conditions.push(eq(products.isActive, filters.isActive));
  } else {
    conditions.push(eq(products.isActive, true));
  }

  if (filters?.categoryId) {
    conditions.push(eq(products.categoryId, filters.categoryId));
  }

  if (filters?.search) {
    conditions.push(
      or(
        ilike(products.name, `%${filters.search}%`),
        ilike(products.sku, `%${filters.search}%`)
      )!
    );
  }

  const sortColumn = filters?.sortBy ?? 'name';
  const sortDirection = filters?.sortOrder ?? 'asc';

  const orderByClause = {
    name: sortDirection === 'asc' ? asc(products.name) : desc(products.name),
    price: sortDirection === 'asc' ? asc(products.price) : desc(products.price),
    sku: sortDirection === 'asc' ? asc(products.sku) : desc(products.sku),
  };

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(and(...conditions));

  const total = Number(countResult[0]?.count ?? 0);

  const result = await db
    .select({
      id: products.id,
      sku: products.sku,
      name: products.name,
      description: products.description,
      price: products.price,
      cost: products.cost,
      organizationId: products.organizationId,
      categoryId: products.categoryId,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      category: {
        id: categories.id,
        name: categories.name,
      },
      inventory: {
        quantityOnHand: inventory.quantityOnHand,
        quantityReserved: inventory.quantityReserved,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(
      inventory,
      and(
        eq(inventory.productId, products.id),
        eq(inventory.organizationId, organizationId)
      )
    )
    .where(and(...conditions))
    .orderBy(orderByClause[sortColumn])
    .limit(limit)
    .offset(offset);

  const productIds = result.map((p) => p.id);

  const allImages: { id: string; productId: string; url: string; alt: string | null; sortOrder: number }[] = productIds.length > 0
    ? await db
        .select({
          id: productImages.id,
          productId: productImages.productId,
          url: productImages.url,
          alt: productImages.alt,
          sortOrder: productImages.sortOrder,
        })
        .from(productImages)
        .where(inArray(productImages.productId, productIds))
        .orderBy(productImages.sortOrder)
    : [];

  const imagesByProduct: Record<string, { id: string; url: string; alt: string | null; sortOrder: number }[]> = {};
  for (const img of allImages) {
    if (!imagesByProduct[img.productId]) {
      imagesByProduct[img.productId] = [];
    }
    imagesByProduct[img.productId].push({
      id: img.id,
      url: img.url,
      alt: img.alt,
      sortOrder: img.sortOrder,
    });
  }

  const data: ProductWithInventory[] = result.map((row) => ({
    id: row.id,
    sku: row.sku,
    name: row.name,
    description: row.description,
    price: row.price,
    cost: row.cost,
    organizationId: row.organizationId,
    categoryId: row.categoryId,
    isActive: row.isActive,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    category: row.category?.id ? row.category : null,
    inventory: row.inventory && row.inventory.quantityOnHand !== null ? {
      quantityOnHand: row.inventory.quantityOnHand,
      quantityReserved: row.inventory.quantityReserved ?? 0,
    } : null,
    images: imagesByProduct[row.id] ?? [],
  }));

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductById(id: string): Promise<ProductWithInventory | null> {
  const result = await db
    .select({
      id: products.id,
      sku: products.sku,
      name: products.name,
      description: products.description,
      price: products.price,
      cost: products.cost,
      organizationId: products.organizationId,
      categoryId: products.categoryId,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      category: {
        id: categories.id,
        name: categories.name,
      },
      inventory: {
        quantityOnHand: inventory.quantityOnHand,
        quantityReserved: inventory.quantityReserved,
        reorderPoint: inventory.reorderPoint,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(inventory, eq(inventory.productId, products.id))
    .where(eq(products.id, id))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const row = result[0];

  const images = await db
    .select({
      id: productImages.id,
      url: productImages.url,
      alt: productImages.alt,
      sortOrder: productImages.sortOrder,
    })
    .from(productImages)
    .where(eq(productImages.productId, id))
    .orderBy(productImages.sortOrder);

  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    description: row.description,
    price: row.price,
    cost: row.cost,
    organizationId: row.organizationId,
    categoryId: row.categoryId,
    isActive: row.isActive,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    category: row.category?.id ? row.category : null,
    inventory: row.inventory && row.inventory.quantityOnHand !== null
      ? {
          quantityOnHand: row.inventory.quantityOnHand,
          quantityReserved: row.inventory.quantityReserved ?? 0,
        }
      : null,
    images: images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      sortOrder: img.sortOrder,
    })),
  };
}

export async function getProductBySku(
  sku: string,
  organizationId: string
): Promise<ProductWithInventory | null> {
  const result = await db
    .select({
      id: products.id,
      sku: products.sku,
      name: products.name,
      description: products.description,
      price: products.price,
      cost: products.cost,
      organizationId: products.organizationId,
      categoryId: products.categoryId,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      category: {
        id: categories.id,
        name: categories.name,
      },
      inventory: {
        quantityOnHand: inventory.quantityOnHand,
        quantityReserved: inventory.quantityReserved,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(
      inventory,
      and(
        eq(inventory.productId, products.id),
        eq(inventory.organizationId, organizationId)
      )
    )
    .where(
      and(eq(products.sku, sku), eq(products.organizationId, organizationId))
    )
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const row = result[0];

  const images = await db
    .select({
      id: productImages.id,
      url: productImages.url,
      alt: productImages.alt,
      sortOrder: productImages.sortOrder,
    })
    .from(productImages)
    .where(eq(productImages.productId, row.id))
    .orderBy(productImages.sortOrder);

  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    description: row.description,
    price: row.price,
    cost: row.cost,
    organizationId: row.organizationId,
    categoryId: row.categoryId,
    isActive: row.isActive,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    category: row.category?.id ? row.category : null,
    inventory: row.inventory && row.inventory.quantityOnHand !== null ? {
      quantityOnHand: row.inventory.quantityOnHand,
      quantityReserved: row.inventory.quantityReserved ?? 0,
    } : null,
    images: images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      sortOrder: img.sortOrder,
    })),
  };
}

export interface CreateProductData {
  sku: string;
  name: string;
  description?: string;
  price: string;
  cost?: string;
  categoryId?: string;
  isActive?: boolean;
}

export async function createProduct(
  data: CreateProductData
): Promise<{ success: boolean; product?: ProductWithInventory; error?: string }> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' };
  }

  const [dbUser] = await db
    .select({ organizationId: users.organizationId })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!dbUser?.organizationId) {
    return { success: false, error: 'Organization not found. Please complete setup.' };
  }

  const organizationId = dbUser.organizationId;

  const existing = await db
    .select()
    .from(products)
    .where(
      and(eq(products.sku, data.sku), eq(products.organizationId, organizationId))
    )
    .limit(1);

  if (existing.length > 0) {
    return { success: false, error: 'A product with this SKU already exists' };
  }

  const insertResult = await db
    .insert(products)
    .values({
      id: crypto.randomUUID(),
      sku: data.sku,
      name: data.name,
      description: data.description ?? null,
      price: data.price,
      cost: data.cost ?? null,
      organizationId,
      categoryId: data.categoryId ?? null,
      isActive: data.isActive ?? true,
    })
    .returning();

  const newProduct = insertResult[0];

  revalidatePath('/app/products');

  return {
    success: true,
    product: {
      ...newProduct,
      category: null,
      inventory: null,
      images: [],
    },
  };
}

export interface UpdateProductData {
  sku?: string;
  name?: string;
  description?: string;
  price?: string;
  cost?: string;
  categoryId?: string;
  isActive?: boolean;
}

export async function updateProduct(
  id: string,
  data: UpdateProductData
): Promise<{ success: boolean; product?: ProductWithInventory; error?: string }> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized' };
  }

  const [dbUser] = await db
    .select({ organizationId: users.organizationId })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!dbUser?.organizationId) {
    return { success: false, error: 'Organization not found. Please complete setup.' };
  }

  const organizationId = dbUser.organizationId;

  const existingProduct = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (existingProduct.length === 0) {
    return { success: false, error: 'Product not found' };
  }

  if (existingProduct[0].organizationId !== organizationId) {
    return { success: false, error: 'Unauthorized' };
  }

  if (data.sku && data.sku !== existingProduct[0].sku) {
    const skuExists = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.sku, data.sku),
          eq(products.organizationId, organizationId)
        )
      )
      .limit(1);

    if (skuExists.length > 0) {
      return { success: false, error: 'A product with this SKU already exists' };
    }
  }

  await db
    .update(products)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));

  revalidatePath('/app/products');
  revalidatePath(`/app/products/${id}`);

  const product = await getProductById(id);

  return {
    success: true,
    product: product ?? undefined,
  };
}

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const organizationId = getSessionOrganizationId(session as { user?: SessionUser } | null);
  if (!organizationId) {
    return { success: false, error: 'Unauthorized' };
  }

  const existingProduct = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (existingProduct.length === 0) {
    return { success: false, error: 'Product not found' };
  }

  if (existingProduct[0].organizationId !== organizationId) {
    return { success: false, error: 'Unauthorized' };
  }

  await db
    .update(products)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(products.id, id));

  revalidatePath('/app/products');
  revalidatePath(`/app/products/${id}`);

  return { success: true };
}

export interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

export async function getCategories(organizationId: string): Promise<Category[]> {
  const result = await db
    .select({
      id: categories.id,
      name: categories.name,
      parentId: categories.parentId,
    })
    .from(categories)
    .where(eq(categories.organizationId, organizationId))
    .orderBy(asc(categories.name));

  return result;
}

export interface CreateCategoryData {
  name: string;
  parentId?: string;
}

export async function createCategory(
  data: CreateCategoryData
): Promise<{ success: boolean; category?: Category; error?: string }> {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const organizationId = getSessionOrganizationId(session as { user?: SessionUser } | null);
  if (!organizationId) {
    return { success: false, error: 'Unauthorized' };
  }

  const newCategoryResult: { id: string; name: string; parentId: string | null }[] = await db
    .insert(categories)
    .values({
      id: crypto.randomUUID(),
      name: data.name,
      organizationId,
      parentId: data.parentId ?? null,
    })
    .returning({ id: categories.id, name: categories.name, parentId: categories.parentId });

  const newCategory = newCategoryResult[0];

  revalidatePath('/app/products');

  return {
    success: true,
    category: {
      id: newCategory.id,
      name: newCategory.name,
      parentId: newCategory.parentId,
    },
  };
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string | null,
  organizationId: string,
  limit: number = 4
): Promise<ProductWithInventory[]> {
  if (!categoryId) {
    return [];
  }

  const result = await db
    .select({
      id: products.id,
      sku: products.sku,
      name: products.name,
      description: products.description,
      price: products.price,
      cost: products.cost,
      organizationId: products.organizationId,
      categoryId: products.categoryId,
      isActive: products.isActive,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      inventory: {
        quantityOnHand: inventory.quantityOnHand,
        quantityReserved: inventory.quantityReserved,
      },
    })
    .from(products)
    .leftJoin(
      inventory,
      and(
        eq(inventory.productId, products.id),
        eq(inventory.organizationId, organizationId)
      )
    )
    .where(
      and(
        eq(products.categoryId, categoryId),
        eq(products.organizationId, organizationId),
        eq(products.isActive, true),
        sql`${products.id} != ${productId}`
      )
    )
    .limit(limit);

  return result.map((row) => ({
    id: row.id,
    sku: row.sku,
    name: row.name,
    description: row.description,
    price: row.price,
    cost: row.cost,
    organizationId: row.organizationId,
    categoryId: row.categoryId,
    isActive: row.isActive,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    category: null,
    inventory: row.inventory && row.inventory.quantityOnHand !== null ? {
      quantityOnHand: row.inventory.quantityOnHand,
      quantityReserved: row.inventory.quantityReserved ?? 0,
    } : null,
    images: [],
  }));
}
