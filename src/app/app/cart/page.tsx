import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getCart, getCartTotal } from '@/actions/cart';
import { CartContent } from './CartContent';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
}

export default async function CartPage() {
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

  const cartItems = await getCart(user.id);
  const { subtotal, itemCount } = await getCartTotal(user.id);

  return <CartContent initialItems={cartItems} initialSubtotal={subtotal} itemCount={itemCount} />;
}
