import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
  role?: string;
}

export default async function SetupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  }) as { user?: SessionUser } | null;

  if (!session?.user) {
    redirect('/login');
  }

  // Check the database directly for organizationId (session might be stale)
  const [dbUser] = await db
    .select({ organizationId: schema.users.organizationId })
    .from(schema.users)
    .where(eq(schema.users.id, session.user.id))
    .limit(1);

  // If user already has an organization, redirect to app
  if (dbUser?.organizationId) {
    redirect('/app');
  }

  // Create organization
  const orgId = nanoid();
  const orgSlug = session.user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');

  const [newOrg] = await db.insert(schema.organizations).values({
    id: orgId,
    name: `${session.user.name || session.user.email.split('@')[0]}'s Organization`,
    slug: `${orgSlug}-${orgId.slice(0, 4)}`,
    type: 'dealer',
  }).returning();

  // Update user with organizationId
  await db.update(schema.users)
    .set({ organizationId: newOrg.id, role: 'admin' })
    .where(eq(schema.users.id, session.user.id));

  // Force a hard redirect to refresh the session
  redirect('/app?refresh=1');
}
