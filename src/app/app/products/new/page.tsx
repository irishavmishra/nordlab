import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getCategories } from '@/actions/products';
import { NewProductForm } from './NewProductForm';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
  role?: string;
}

export default async function NewProductPage() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  }) as { user?: SessionUser } | null;

  if (!session?.user) {
    redirect('/login');
  }

  // Check DB directly for organizationId
  const [dbUser] = await db
    .select({ organizationId: schema.users.organizationId, role: schema.users.role })
    .from(schema.users)
    .where(eq(schema.users.id, session.user.id))
    .limit(1);

  if (!dbUser?.organizationId) {
    redirect('/app/setup');
  }

  // Only admin/staff can create products
  if (dbUser.role !== 'admin' && dbUser.role !== 'staff') {
    redirect('/app/products');
  }

  const categories = await getCategories(dbUser.organizationId);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-light text-cream serif-display">
          Add New Product
        </h1>
        <p className="text-warm-gray mt-1">
          Create a new product in your catalog
        </p>
      </div>

      <NewProductForm categories={categories} />
    </div>
  );
}
