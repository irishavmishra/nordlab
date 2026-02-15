import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  jsonb,
  decimal,
  index,
  uniqueIndex,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { PgColumn } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    password: text('password'),
    role: text('role', { enum: ['admin', 'dealer', 'staff'] }).notNull().default('staff'),
    organizationId: text('organization_id').references(() => organizations.id),
    emailVerified: boolean('email_verified').notNull().default(false),
    image: text('image'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex('users_email_idx').on(table.email),
    organizationIdx: index('users_organization_idx').on(table.organizationId),
    roleIdx: index('users_role_idx').on(table.role),
  }),
);

export const sessions = pgTable(
  'sessions',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('sessions_user_id_idx').on(table.userId),
    tokenIdx: uniqueIndex('sessions_token_idx').on(table.token),
  }),
);

export const accounts = pgTable(
  'accounts',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('accounts_user_id_idx').on(table.userId),
    providerAccountIdIdx: index('accounts_provider_account_idx').on(table.providerId, table.accountId),
  }),
);

export const verifications = pgTable(
  'verifications',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    identifierIdx: index('verifications_identifier_idx').on(table.identifier),
  }),
);

export const organizations = pgTable(
  'organizations',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    type: text('type', { enum: ['distributor', 'dealer'] }).notNull(),
    parentId: text('parent_id').references((): PgColumn => organizations.id),
    settings: jsonb('settings').$type<Record<string, unknown>>(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex('organizations_slug_idx').on(table.slug),
    parentIdx: index('organizations_parent_idx').on(table.parentId),
    typeIdx: index('organizations_type_idx').on(table.type),
  }),
);

export const categories = pgTable(
  'categories',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    parentId: text('parent_id').references((): PgColumn => categories.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    organizationIdx: index('categories_organization_idx').on(table.organizationId),
    parentIdx: index('categories_parent_idx').on(table.parentId),
  }),
);

export const products = pgTable(
  'products',
  {
    id: text('id').primaryKey(),
    sku: text('sku').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    cost: decimal('cost', { precision: 12, scale: 2 }),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    categoryId: text('category_id').references(() => categories.id),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    skuIdx: index('products_sku_idx').on(table.sku),
    organizationIdx: index('products_organization_idx').on(table.organizationId),
    categoryIdx: index('products_category_idx').on(table.categoryId),
    activeIdx: index('products_active_idx').on(table.isActive),
    skuOrgUnique: uniqueIndex('products_sku_org_idx').on(table.sku, table.organizationId),
  }),
);

export const productImages = pgTable(
  'product_images',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
    alt: text('alt'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    productIdx: index('product_images_product_idx').on(table.productId),
  }),
);

export const inventory = pgTable(
  'inventory',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    quantityOnHand: integer('quantity_on_hand').notNull().default(0),
    quantityReserved: integer('quantity_reserved').notNull().default(0),
    reorderPoint: integer('reorder_point').default(0),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    productIdx: index('inventory_product_idx').on(table.productId),
    organizationIdx: index('inventory_organization_idx').on(table.organizationId),
    productOrgUnique: uniqueIndex('inventory_product_org_idx').on(table.productId, table.organizationId),
  }),
);

export const inventoryMovements = pgTable(
  'inventory_movements',
  {
    id: text('id').primaryKey(),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    type: text('type', { enum: ['purchase', 'sale', 'adjustment', 'transfer'] }).notNull(),
    quantity: integer('quantity').notNull(),
    reason: text('reason'),
    referenceId: text('reference_id'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    productIdx: index('inventory_movements_product_idx').on(table.productId),
    organizationIdx: index('inventory_movements_organization_idx').on(table.organizationId),
    typeIdx: index('inventory_movements_type_idx').on(table.type),
    createdAtIdx: index('inventory_movements_created_at_idx').on(table.createdAt),
  }),
);

export const orders = pgTable(
  'orders',
  {
    id: text('id').primaryKey(),
    orderNumber: text('order_number').notNull().unique(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    distributorId: text('distributor_id')
      .notNull()
      .references(() => organizations.id),
    status: text('status', {
      enum: ['draft', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    })
      .notNull()
      .default('draft'),
    total: decimal('total', { precision: 12, scale: 2 }).notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    orderNumberIdx: uniqueIndex('orders_order_number_idx').on(table.orderNumber),
    organizationIdx: index('orders_organization_idx').on(table.organizationId),
    distributorIdx: index('orders_distributor_idx').on(table.distributorId),
    statusIdx: index('orders_status_idx').on(table.status),
    createdAtIdx: index('orders_created_at_idx').on(table.createdAt),
  }),
);

export const orderItems = pgTable(
  'order_items',
  {
    id: text('id').primaryKey(),
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: text('product_id')
      .notNull()
      .references(() => products.id),
    quantity: integer('quantity').notNull(),
    unitPrice: decimal('unit_price', { precision: 12, scale: 2 }).notNull(),
    totalPrice: decimal('total_price', { precision: 12, scale: 2 }).notNull(),
    notes: text('notes'),
  },
  (table) => ({
    orderIdx: index('order_items_order_idx').on(table.orderId),
    productIdx: index('order_items_product_idx').on(table.productId),
  }),
);

export const quotes = pgTable(
  'quotes',
  {
    id: text('id').primaryKey(),
    quoteNumber: text('quote_number').notNull().unique(),
    organizationId: text('organization_id')
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    distributorId: text('distributor_id')
      .notNull()
      .references(() => organizations.id),
    status: text('status', {
      enum: ['draft', 'sent', 'accepted', 'rejected', 'expired', 'converted'],
    })
      .notNull()
      .default('draft'),
    validUntil: timestamp('valid_until'),
    total: decimal('total', { precision: 12, scale: 2 }).notNull(),
    notes: text('notes'),
    convertedToOrderId: text('converted_to_order_id').references(() => orders.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    quoteNumberIdx: uniqueIndex('quotes_quote_number_idx').on(table.quoteNumber),
    organizationIdx: index('quotes_organization_idx').on(table.organizationId),
    distributorIdx: index('quotes_distributor_idx').on(table.distributorId),
    statusIdx: index('quotes_status_idx').on(table.status),
    convertedToOrderIdx: index('quotes_converted_to_order_idx').on(table.convertedToOrderId),
    validUntilIdx: index('quotes_valid_until_idx').on(table.validUntil),
  }),
);

export const quoteItems = pgTable(
  'quote_items',
  {
    id: text('id').primaryKey(),
    quoteId: text('quote_id')
      .notNull()
      .references(() => quotes.id, { onDelete: 'cascade' }),
    productId: text('product_id')
      .notNull()
      .references(() => products.id),
    quantity: integer('quantity').notNull(),
    unitPrice: decimal('unit_price', { precision: 12, scale: 2 }).notNull(),
    totalPrice: decimal('total_price', { precision: 12, scale: 2 }).notNull(),
    notes: text('notes'),
  },
  (table) => ({
    quoteIdx: index('quote_items_quote_idx').on(table.quoteId),
    productIdx: index('quote_items_product_idx').on(table.productId),
  }),
);

export const cartItems = pgTable(
  'cart_items',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull().default(1),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('cart_items_user_idx').on(table.userId),
    productIdx: index('cart_items_product_idx').on(table.productId),
    userProductUnique: uniqueIndex('cart_items_user_product_idx').on(table.userId, table.productId),
  }),
);

export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
  cartItems: many(cartItems),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const organizationsRelations = relations(organizations, ({ many, one }) => ({
  users: many(users),
  parent: one(organizations, {
    fields: [organizations.parentId],
    references: [organizations.id],
    relationName: 'organization_hierarchy',
  }),
  children: many(organizations, { relationName: 'organization_hierarchy' }),
  products: many(products),
  categories: many(categories),
  inventory: many(inventory),
  inventoryMovements: many(inventoryMovements),
  ordersAsDealer: many(orders, { relationName: 'dealer_orders' }),
  ordersAsDistributor: many(orders, { relationName: 'distributor_orders' }),
  quotesAsDealer: many(quotes, { relationName: 'dealer_quotes' }),
  quotesAsDistributor: many(quotes, { relationName: 'distributor_quotes' }),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [categories.organizationId],
    references: [organizations.id],
  }),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'category_hierarchy',
  }),
  children: many(categories, { relationName: 'category_hierarchy' }),
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [products.organizationId],
    references: [organizations.id],
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  inventory: many(inventory),
  inventoryMovements: many(inventoryMovements),
  orderItems: many(orderItems),
  quoteItems: many(quoteItems),
  cartItems: many(cartItems),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const inventoryRelations = relations(inventory, ({ one }) => ({
  product: one(products, {
    fields: [inventory.productId],
    references: [products.id],
  }),
  organization: one(organizations, {
    fields: [inventory.organizationId],
    references: [organizations.id],
  }),
}));

export const inventoryMovementsRelations = relations(inventoryMovements, ({ one }) => ({
  product: one(products, {
    fields: [inventoryMovements.productId],
    references: [products.id],
  }),
  organization: one(organizations, {
    fields: [inventoryMovements.organizationId],
    references: [organizations.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [orders.organizationId],
    references: [organizations.id],
    relationName: 'dealer_orders',
  }),
  distributor: one(organizations, {
    fields: [orders.distributorId],
    references: [organizations.id],
    relationName: 'distributor_orders',
  }),
  items: many(orderItems),
  convertedQuotes: many(quotes),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const quotesRelations = relations(quotes, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [quotes.organizationId],
    references: [organizations.id],
    relationName: 'dealer_quotes',
  }),
  distributor: one(organizations, {
    fields: [quotes.distributorId],
    references: [organizations.id],
    relationName: 'distributor_quotes',
  }),
  items: many(quoteItems),
  convertedToOrder: one(orders, {
    fields: [quotes.convertedToOrderId],
    references: [orders.id],
  }),
}));

export const quoteItemsRelations = relations(quoteItems, ({ one }) => ({
  quote: one(quotes, {
    fields: [quoteItems.quoteId],
    references: [quotes.id],
  }),
  product: one(products, {
    fields: [quoteItems.productId],
    references: [products.id],
  }),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  user: one(users, {
    fields: [cartItems.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));