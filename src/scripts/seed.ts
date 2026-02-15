import 'dotenv/config';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { nanoid } from 'nanoid';

async function seed() {
  const orgs = await db.select().from(schema.organizations);
  if (orgs.length === 0) {
    console.log('No organization found. Please sign up first.');
    return;
  }
  const orgId = orgs[0].id;

  const categoriesData = [
    { id: nanoid(), name: 'Electronics', organizationId: orgId },
    { id: nanoid(), name: 'Office Supplies', organizationId: orgId },
    { id: nanoid(), name: 'Industrial', organizationId: orgId },
  ];

  const insertedCategories = await db.insert(schema.categories).values(categoriesData).returning();
  console.log(`Created ${insertedCategories.length} categories`);

  const electronicsCategory = insertedCategories.find((c) => c.name === 'Electronics')!;
  const officeCategory = insertedCategories.find((c) => c.name === 'Office Supplies')!;
  const industrialCategory = insertedCategories.find((c) => c.name === 'Industrial')!;

  const productsData = [
    {
      id: nanoid(),
      sku: 'ELEC-001',
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
      price: '149.99',
      cost: '75.00',
      organizationId: orgId,
      categoryId: electronicsCategory.id,
    },
    {
      id: nanoid(),
      sku: 'ELEC-002',
      name: 'USB-C Hub 7-in-1',
      description: 'Multi-port adapter with HDMI, USB 3.0, SD card reader, and PD charging',
      price: '59.99',
      cost: '28.50',
      organizationId: orgId,
      categoryId: electronicsCategory.id,
    },
    {
      id: nanoid(),
      sku: 'ELEC-003',
      name: 'Mechanical Keyboard RGB',
      description: 'Full-size mechanical keyboard with Cherry MX switches and per-key RGB lighting',
      price: '129.99',
      cost: '62.00',
      organizationId: orgId,
      categoryId: electronicsCategory.id,
    },
    {
      id: nanoid(),
      sku: 'ELEC-004',
      name: 'Wireless Gaming Mouse',
      description: 'High-precision gaming mouse with 16000 DPI sensor and programmable buttons',
      price: '79.99',
      cost: '38.00',
      organizationId: orgId,
      categoryId: electronicsCategory.id,
    },
    {
      id: nanoid(),
      sku: 'OFF-001',
      name: 'Premium Notebook A5',
      description: 'Hardcover notebook with 180 pages of acid-free paper',
      price: '12.99',
      cost: '4.50',
      organizationId: orgId,
      categoryId: officeCategory.id,
    },
    {
      id: nanoid(),
      sku: 'OFF-002',
      name: 'Ballpoint Pens Box of 12',
      description: 'Smooth-writing ballpoint pens with blue ink, medium point',
      price: '8.99',
      cost: '2.80',
      organizationId: orgId,
      categoryId: officeCategory.id,
    },
    {
      id: nanoid(),
      sku: 'OFF-003',
      name: 'Desk Organizer 5-Compartment',
      description: 'Mesh metal desk organizer for pens, scissors, and office supplies',
      price: '24.99',
      cost: '11.00',
      organizationId: orgId,
      categoryId: officeCategory.id,
    },
    {
      id: nanoid(),
      sku: 'OFF-004',
      name: 'Sticky Notes Pack 500 Sheets',
      description: 'Assorted colors sticky notes with strong adhesive backing',
      price: '6.99',
      cost: '2.20',
      organizationId: orgId,
      categoryId: officeCategory.id,
    },
    {
      id: nanoid(),
      sku: 'IND-001',
      name: 'Heavy Duty Utility Knife',
      description: 'Industrial-grade retractable utility knife with rubber grip handle',
      price: '18.99',
      cost: '7.50',
      organizationId: orgId,
      categoryId: industrialCategory.id,
    },
    {
      id: nanoid(),
      sku: 'IND-002',
      name: 'Safety Goggles Clear Lens',
      description: 'ANSI Z87.1 rated safety goggles with anti-fog coating',
      price: '14.99',
      cost: '5.80',
      organizationId: orgId,
      categoryId: industrialCategory.id,
    },
    {
      id: nanoid(),
      sku: 'IND-003',
      name: 'Work Gloves Large 12-Pack',
      description: 'Durable cotton work gloves with knit wrist and PVC dots for grip',
      price: '22.99',
      cost: '9.00',
      organizationId: orgId,
      categoryId: industrialCategory.id,
    },
    {
      id: nanoid(),
      sku: 'IND-004',
      name: 'Measuring Tape 25ft',
      description: 'Professional grade measuring tape with magnetic tip and belt clip',
      price: '16.99',
      cost: '6.50',
      organizationId: orgId,
      categoryId: industrialCategory.id,
    },
  ];

  const insertedProducts = await db.insert(schema.products).values(productsData).returning();
  console.log(`Created ${insertedProducts.length} products`);

  const inventoryData = insertedProducts.map((product) => ({
    id: nanoid(),
    productId: product.id,
    organizationId: orgId,
    quantityOnHand: Math.floor(Math.random() * 500) + 50,
    quantityReserved: Math.floor(Math.random() * 30),
    reorderPoint: Math.floor(Math.random() * 30) + 10,
  }));

  await db.insert(schema.inventory).values(inventoryData);
  console.log(`Created ${inventoryData.length} inventory records`);

  console.log('Seed completed!');
}

seed().catch(console.error);