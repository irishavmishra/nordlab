import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getProducts, getCategories, ProductWithInventory } from '@/actions/products';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFiltersClient } from './ProductFiltersClient';
import { redirect } from 'next/navigation';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
  role?: string;
}

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sortBy?: 'name' | 'price' | 'sku';
    sortOrder?: 'asc' | 'desc';
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  }) as { user?: SessionUser } | null;

  if (!session?.user) {
    redirect('/login');
  }

  // Check DB directly for organizationId
  const [dbUser] = await db
    .select({ organizationId: schema.users.organizationId })
    .from(schema.users)
    .where(eq(schema.users.id, session.user.id))
    .limit(1);

  if (!dbUser?.organizationId) {
    redirect('/app/setup');
  }

  const organizationId = dbUser.organizationId;
  const params = await searchParams;

  const filters = {
    search: params.search,
    categoryId: params.category,
    sortBy: params.sortBy ?? 'name',
    sortOrder: params.sortOrder ?? 'asc',
    page: params.page ? parseInt(params.page) : 1,
    limit: 12,
  };

  const [productsResult, categories] = await Promise.all([
    getProducts(organizationId, filters),
    getCategories(organizationId),
  ]);

  const mappedProducts = productsResult.data.map((p: ProductWithInventory) => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    price: p.price,
    inventory: p.inventory
      ? {
          quantityOnHand: p.inventory.quantityOnHand,
          quantityReserved: p.inventory.quantityReserved,
        }
      : null,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-cream serif-display">
            Product Catalog
          </h1>
          <p className="text-warm-gray mt-1">
            Browse and order products from your distributor
          </p>
        </div>
        <a
          href="/app/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-copper to-copper-dark text-obsidian text-sm font-medium rounded shadow-[0_4px_24px_-4px_rgba(201,145,90,0.4)] hover:shadow-[0_8px_32px_-4px_rgba(201,145,90,0.5)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Add Product
        </a>
      </div>

      <ProductFiltersClient
        categories={categories}
        initialFilters={{
          search: params.search ?? '',
          categoryId: params.category ?? '',
          sortBy: params.sortBy ?? 'name',
          sortOrder: params.sortOrder ?? 'asc',
        }}
        totalPages={productsResult.totalPages}
        currentPage={productsResult.page}
        total={productsResult.total}
      />

      <ProductGrid
        products={mappedProducts}
        onProductClick={(id) => {
          window.location.href = `/app/products/${id}`;
        }}
      />

      {productsResult.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: productsResult.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <a
                key={pageNum}
                href={`/app/products?${new URLSearchParams({
                  ...params,
                  page: pageNum.toString(),
                }).toString()}`}
                className={`px-4 py-2 rounded text-sm transition-colors ${
                  pageNum === productsResult.page
                    ? 'bg-copper text-obsidian font-medium'
                    : 'bg-charcoal text-cream hover:bg-graphite'
                }`}
              >
                {pageNum}
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}
