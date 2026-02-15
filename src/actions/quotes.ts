'use server'

import { db } from '@/db';
import { quotes, quoteItems, products, orders, orderItems, organizations, users } from '@/db/schema';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { eq, and, desc, ilike, sql, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired' | 'converted';

export interface QuoteFilter {
  status?: QuoteStatus;
  search?: string;
}

export interface QuoteWithItems {
  id: string;
  quoteNumber: string;
  organizationId: string;
  distributorId: string;
  status: QuoteStatus;
  validUntil: Date | null;
  total: string;
  notes: string | null;
  convertedToOrderId: string | null;
  createdAt: Date;
  updatedAt: Date;
  organization?: { id: string; name: string; type: string };
  distributor?: { id: string; name: string; type: string };
  items?: QuoteItemWithProduct[];
}

export interface QuoteItemWithProduct {
  id: string;
  quoteId: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  notes: string | null;
  product?: {
    id: string;
    sku: string;
    name: string;
    price: string;
  };
}

export interface CreateQuoteData {
  distributorId: string;
  validUntil?: Date;
  notes?: string;
  items?: {
    productId: string;
    quantity: number;
    unitPrice?: string;
  }[];
}

export interface UpdateQuoteData {
  validUntil?: Date;
  notes?: string;
}

export interface AddQuoteItemData {
  productId: string;
  quantity: number;
  unitPrice?: string;
}

export interface UpdateQuoteItemData {
  quantity?: number;
  unitPrice?: string;
  notes?: string;
}

async function getCurrentUser() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  return session?.user;
}

async function getCurrentUserWithOrg() {
  const user = await getCurrentUser();
  if (!user) return null;

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

export async function generateQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `QUO-${year}-`;

  const result = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(quotes)
    .where(sql`quote_number like ${prefix}%`);

  const count = result[0]?.count ?? 0;
  const sequence = String(count + 1).padStart(5, '0');
  return `${prefix}${sequence}`;
}

export async function getQuotes(
  organizationId: string,
  filters?: QuoteFilter,
  page: number = 1,
  pageSize: number = 20
): Promise<{ quotes: QuoteWithItems[]; total: number }> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const conditions = [eq(quotes.organizationId, organizationId)];

  if (filters?.status) {
    conditions.push(eq(quotes.status, filters.status));
  }

  if (filters?.search) {
    conditions.push(ilike(quotes.quoteNumber, `%${filters.search}%`));
  }

  const offset = (page - 1) * pageSize;

  const [quotesResult, countResult] = await Promise.all([
    db
      .select({
        id: quotes.id,
        quoteNumber: quotes.quoteNumber,
        organizationId: quotes.organizationId,
        distributorId: quotes.distributorId,
        status: quotes.status,
        validUntil: quotes.validUntil,
        total: quotes.total,
        notes: quotes.notes,
        convertedToOrderId: quotes.convertedToOrderId,
        createdAt: quotes.createdAt,
        updatedAt: quotes.updatedAt,
      })
      .from(quotes)
      .where(and(...conditions))
      .orderBy(desc(quotes.createdAt))
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(quotes)
      .where(and(...conditions)),
  ]);

  let orgMap = new Map<string, { id: string; name: string; type: string }>();

  if (quotesResult.length > 0) {
    const orgIds = [...new Set([
      ...quotesResult.map(q => q.organizationId),
      ...quotesResult.map(q => q.distributorId)
    ])].filter(Boolean);

    if (orgIds.length > 0) {
      const orgs = await db
        .select({ id: organizations.id, name: organizations.name, type: organizations.type })
        .from(organizations)
        .where(inArray(organizations.id, orgIds));

      orgMap = new Map(orgs.map(o => [o.id, o]));
    }
  }

  const mappedQuotes: QuoteWithItems[] = quotesResult.map(q => ({
    ...q,
    status: q.status as QuoteStatus,
    total: q.total,
    organization: orgMap.get(q.organizationId),
    distributor: orgMap.get(q.distributorId),
  }));

  return {
    quotes: mappedQuotes,
    total: countResult[0]?.count ?? 0,
  };
}

export async function getQuoteById(id: string): Promise<QuoteWithItems | null> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const [quoteResult] = await db
    .select()
    .from(quotes)
    .where(eq(quotes.id, id));

  if (!quoteResult) return null;

  const [orgResult, distributorResult, itemsResult] = await Promise.all([
    db
      .select({ id: organizations.id, name: organizations.name, type: organizations.type })
      .from(organizations)
      .where(eq(organizations.id, quoteResult.organizationId))
      .limit(1),
    db
      .select({ id: organizations.id, name: organizations.name, type: organizations.type })
      .from(organizations)
      .where(eq(organizations.id, quoteResult.distributorId))
      .limit(1),
    db
      .select({
        id: quoteItems.id,
        quoteId: quoteItems.quoteId,
        productId: quoteItems.productId,
        quantity: quoteItems.quantity,
        unitPrice: quoteItems.unitPrice,
        totalPrice: quoteItems.totalPrice,
        notes: quoteItems.notes,
        product: {
          id: products.id,
          sku: products.sku,
          name: products.name,
          price: products.price,
        },
      })
      .from(quoteItems)
      .innerJoin(products, eq(quoteItems.productId, products.id))
      .where(eq(quoteItems.quoteId, id)),
  ]);

  return {
    ...quoteResult,
    status: quoteResult.status as QuoteStatus,
    total: quoteResult.total,
    organization: orgResult[0],
    distributor: distributorResult[0],
    items: itemsResult.map(item => ({
      ...item,
      product: item.product,
    })),
  };
}

export async function createQuote(data: CreateQuoteData): Promise<QuoteWithItems> {
  const user = await getCurrentUserWithOrg();
  if (!user || !user.organizationId) throw new Error('Unauthorized');

  const quoteNumber = await generateQuoteNumber();

  let total = '0';
  const itemsToCreate: { productId: string; quantity: number; unitPrice: string; totalPrice: string }[] = [];

  if (data.items && data.items.length > 0) {
    const productIds = data.items.map(i => i.productId);
    const productResults = await db
      .select({ id: products.id, price: products.price })
      .from(products)
      .where(inArray(products.id, productIds));

    const productPriceMap = new Map(productResults.map(p => [p.id, p.price]));

    let totalValue = 0;
    for (const item of data.items) {
      const productPrice = item.unitPrice ?? productPriceMap.get(item.productId) ?? '0';
      const itemTotal = parseFloat(productPrice) * item.quantity;
      totalValue += itemTotal;
      itemsToCreate.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: productPrice,
        totalPrice: itemTotal.toFixed(2),
      });
    }
    total = totalValue.toFixed(2);
  }

  const quoteId = crypto.randomUUID();

  await db
    .insert(quotes)
    .values({
      id: quoteId,
      quoteNumber,
      organizationId: user.organizationId,
      distributorId: data.distributorId,
      status: 'draft',
      validUntil: data.validUntil ?? null,
      total,
      notes: data.notes ?? null,
    });

  if (itemsToCreate.length > 0) {
    await db.insert(quoteItems).values(
      itemsToCreate.map(item => ({
        id: crypto.randomUUID(),
        quoteId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      }))
    );
  }

  revalidatePath('/quotes');
  return getQuoteById(quoteId) as Promise<QuoteWithItems>;
}

export async function updateQuote(id: string, data: UpdateQuoteData): Promise<QuoteWithItems> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  await db
    .update(quotes)
    .set({
      validUntil: data.validUntil ?? null,
      notes: data.notes ?? null,
      updatedAt: new Date(),
    })
    .where(eq(quotes.id, id));

  revalidatePath('/quotes');
  return getQuoteById(id) as Promise<QuoteWithItems>;
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<QuoteWithItems> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  await db
    .update(quotes)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(quotes.id, id));

  revalidatePath('/quotes');
  return getQuoteById(id) as Promise<QuoteWithItems>;
}

export async function deleteQuote(id: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  await db.delete(quoteItems).where(eq(quoteItems.quoteId, id));
  await db.delete(quotes).where(eq(quotes.id, id));

  revalidatePath('/quotes');
}

export async function duplicateQuote(id: string): Promise<QuoteWithItems> {
  const user = await getCurrentUserWithOrg();
  if (!user || !user.organizationId) throw new Error('Unauthorized');

  const originalQuote = await getQuoteById(id);
  if (!originalQuote) throw new Error('Quote not found');

  const quoteNumber = await generateQuoteNumber();
  const newQuoteId = crypto.randomUUID();

  await db
    .insert(quotes)
    .values({
      id: newQuoteId,
      quoteNumber,
      organizationId: originalQuote.organizationId,
      distributorId: originalQuote.distributorId,
      status: 'draft',
      validUntil: originalQuote.validUntil,
      total: originalQuote.total,
      notes: originalQuote.notes,
    });

  if (originalQuote.items && originalQuote.items.length > 0) {
    await db.insert(quoteItems).values(
      originalQuote.items.map(item => ({
        id: crypto.randomUUID(),
        quoteId: newQuoteId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
        notes: item.notes,
      }))
    );
  }

  revalidatePath('/quotes');
  return getQuoteById(newQuoteId) as Promise<QuoteWithItems>;
}

async function generateOrderNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ORD-${year}-`;

  const result = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(orders)
    .where(sql`order_number like ${prefix}%`);

  const count = result[0]?.count ?? 0;
  const sequence = String(count + 1).padStart(5, '0');
  return `${prefix}${sequence}`;
}

export async function convertQuoteToOrder(quoteId: string): Promise<{ orderId: string; orderNumber: string }> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const quote = await getQuoteById(quoteId);
  if (!quote) throw new Error('Quote not found');

  if (quote.status !== 'accepted') {
    throw new Error('Only accepted quotes can be converted to orders');
  }

  const orderNumber = await generateOrderNumber();
  const orderId = crypto.randomUUID();

  await db
    .insert(orders)
    .values({
      id: orderId,
      orderNumber,
      organizationId: quote.organizationId,
      distributorId: quote.distributorId,
      status: 'pending',
      total: quote.total,
      notes: quote.notes,
    });

  if (quote.items && quote.items.length > 0) {
    await db.insert(orderItems).values(
      quote.items.map(item => ({
        id: crypto.randomUUID(),
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice,
      }))
    );
  }

  await db
    .update(quotes)
    .set({
      status: 'converted',
      convertedToOrderId: orderId,
      updatedAt: new Date(),
    })
    .where(eq(quotes.id, quoteId));

  revalidatePath('/quotes');
  revalidatePath('/orders');
  return { orderId, orderNumber };
}

export async function addQuoteItem(quoteId: string, data: AddQuoteItemData): Promise<QuoteWithItems> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const quote = await getQuoteById(quoteId);
  if (!quote) throw new Error('Quote not found');

  let unitPrice = data.unitPrice;
  if (!unitPrice) {
    const [product] = await db
      .select({ price: products.price })
      .from(products)
      .where(eq(products.id, data.productId))
      .limit(1);
    unitPrice = product?.price ?? '0';
  }

  const totalPrice = (parseFloat(unitPrice) * data.quantity).toFixed(2);

  await db.insert(quoteItems).values({
    id: crypto.randomUUID(),
    quoteId,
    productId: data.productId,
    quantity: data.quantity,
    unitPrice,
    totalPrice,
  });

  const items = await db
    .select({ totalPrice: quoteItems.totalPrice })
    .from(quoteItems)
    .where(eq(quoteItems.quoteId, quoteId));

  const newTotal = items.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2);

  await db
    .update(quotes)
    .set({ total: newTotal, updatedAt: new Date() })
    .where(eq(quotes.id, quoteId));

  revalidatePath('/quotes');
  return getQuoteById(quoteId) as Promise<QuoteWithItems>;
}

export async function updateQuoteItem(quoteId: string, itemId: string, data: UpdateQuoteItemData): Promise<QuoteWithItems> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const quote = await getQuoteById(quoteId);
  if (!quote) throw new Error('Quote not found');

  const [existingItem] = await db
    .select()
    .from(quoteItems)
    .where(and(eq(quoteItems.id, itemId), eq(quoteItems.quoteId, quoteId)));

  if (!existingItem) throw new Error('Quote item not found');

  const quantity = data.quantity ?? existingItem.quantity;
  const unitPrice = data.unitPrice ?? existingItem.unitPrice;
  const totalPrice = (parseFloat(unitPrice) * quantity).toFixed(2);

  await db
    .update(quoteItems)
    .set({
      quantity,
      unitPrice,
      totalPrice,
      notes: data.notes ?? existingItem.notes,
    })
    .where(eq(quoteItems.id, itemId));

  const items = await db
    .select({ totalPrice: quoteItems.totalPrice })
    .from(quoteItems)
    .where(eq(quoteItems.quoteId, quoteId));

  const newTotal = items.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2);

  await db
    .update(quotes)
    .set({ total: newTotal, updatedAt: new Date() })
    .where(eq(quotes.id, quoteId));

  revalidatePath('/quotes');
  return getQuoteById(quoteId) as Promise<QuoteWithItems>;
}

export async function removeQuoteItem(quoteId: string, itemId: string): Promise<QuoteWithItems> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');

  const quote = await getQuoteById(quoteId);
  if (!quote) throw new Error('Quote not found');

  await db
    .delete(quoteItems)
    .where(and(eq(quoteItems.id, itemId), eq(quoteItems.quoteId, quoteId)));

  const items = await db
    .select({ totalPrice: quoteItems.totalPrice })
    .from(quoteItems)
    .where(eq(quoteItems.quoteId, quoteId));

  const newTotal = items.length > 0
    ? items.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2)
    : '0';

  await db
    .update(quotes)
    .set({ total: newTotal, updatedAt: new Date() })
    .where(eq(quotes.id, quoteId));

  revalidatePath('/quotes');
  return getQuoteById(quoteId) as Promise<QuoteWithItems>;
}
