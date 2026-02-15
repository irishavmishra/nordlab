import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getOrders } from '@/actions/orders';
import { OrdersContent } from './OrdersContent';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
}

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
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

  const params = await searchParams;
  const { orders, total } = await getOrders(dbUser.organizationId, {
    status: params.status as any,
    search: params.search,
    page: params.page ? parseInt(params.page, 10) : 1,
  });

  return (
    <OrdersContent
      initialOrders={orders}
      total={total}
      initialStatus={params.status}
      initialSearch={params.search}
    />
  );
}
