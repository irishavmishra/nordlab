import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getInventoryMovements, getProductsWithInventory } from '@/actions/inventory';
import { MovementHistoryWrapper } from './MovementHistoryWrapper';
import { MovementFilters } from './MovementFilters';
import { ArrowLeftRight } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
}

export default async function MovementsPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    productId?: string;
    startDate?: string;
    endDate?: string;
  }>;
}) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const user = session?.user as SessionUser | undefined;
  if (!user) {
    redirect('/login');
  }

  const [dbUser] = await db
    .select({ organizationId: schema.users.organizationId })
    .from(schema.users)
    .where(eq(schema.users.id, user.id))
    .limit(1);

  if (!dbUser?.organizationId) {
    redirect('/app/setup');
  }

  const organizationId = dbUser.organizationId;

  const params = await searchParams;

  const type = params.type as 'purchase' | 'sale' | 'adjustment' | 'transfer' | undefined;
  const productId = params.productId;
  const startDate = params.startDate ? new Date(params.startDate) : undefined;
  const endDate = params.endDate ? new Date(params.endDate) : undefined;

  const [movements, products] = await Promise.all([
    getInventoryMovements(organizationId, { type, productId, startDate, endDate }),
    getProductsWithInventory(organizationId),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-cream serif-display flex items-center gap-3">
            <ArrowLeftRight className="w-7 h-7 text-copper" />
            Inventory Movements
          </h1>
          <p className="text-warm-gray mt-1">
            Track all inventory changes and adjustments
          </p>
        </div>
        <Link
          href="/app/inventory"
          className="text-sm text-copper hover:text-copper-light transition-colors"
        >
          Back to Inventory
        </Link>
      </div>

      <div className="card-dark rounded-lg p-6">
        <MovementFilters
          products={products}
          currentType={type}
          currentProductId={productId}
          currentStartDate={params.startDate}
          currentEndDate={params.endDate}
        />

        <div className="mt-4">
          <MovementHistoryWrapper initialMovements={movements} />
        </div>
      </div>
    </div>
  );
}
