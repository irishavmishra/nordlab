import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getInventory, getInventoryStats } from '@/actions/inventory';
import { InventoryTableWrapper } from './InventoryTableWrapper';
import { InventoryStats } from '@/components/inventory/InventoryStats';
import { InventoryFilters } from './InventoryFilters';
import { Package } from 'lucide-react';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  const user = session?.user as SessionUser | undefined;
  if (!user) {
    redirect('/login');
  }

  // Check DB directly for organizationId
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

  const status = params.status as 'in-stock' | 'low-stock' | 'out-of-stock' | undefined;
  const search = params.search;

  const [inventory, stats] = await Promise.all([
    getInventory(organizationId, { status, search }),
    getInventoryStats(organizationId),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-cream serif-display flex items-center gap-3">
            <Package className="w-7 h-7 text-copper" />
            Inventory
          </h1>
          <p className="text-warm-gray mt-1">
            Manage your product inventory and stock levels
          </p>
        </div>
      </div>

      <InventoryStats
        totalProducts={stats.totalProducts}
        lowStockCount={stats.lowStockCount}
        outOfStockCount={stats.outOfStockCount}
        totalValue={stats.totalValue}
      />

      <div className="card-dark rounded-lg p-6">
        <InventoryFilters currentStatus={status} currentSearch={search} />

        <div className="mt-4">
          <InventoryTableWrapper
            initialInventory={inventory}
            organizationId={organizationId}
          />
        </div>
      </div>
    </div>
  );
}
