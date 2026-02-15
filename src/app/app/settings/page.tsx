import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { SettingsContent } from './SettingsContent';

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
  role?: string;
}

export default async function SettingsPage() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  }) as { user?: SessionUser } | null;

  if (!session?.user) {
    redirect('/login');
  }

  const [dbUser] = await db
    .select({
      organizationId: schema.users.organizationId,
      role: schema.users.role,
    })
    .from(schema.users)
    .where(eq(schema.users.id, session.user.id))
    .limit(1);

  if (!dbUser?.organizationId) {
    redirect('/app/setup');
  }

  const [organization] = await db
    .select({
      name: schema.organizations.name,
      type: schema.organizations.type,
      createdAt: schema.organizations.createdAt,
    })
    .from(schema.organizations)
    .where(eq(schema.organizations.id, dbUser.organizationId))
    .limit(1);

  const userSettings = {
    name: session.user.name,
    email: session.user.email,
    role: dbUser.role,
  };

  const organizationSettings = organization
    ? {
        name: organization.name,
        type: organization.type,
        createdAt: organization.createdAt,
      }
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-cream serif-display">Settings</h1>
        <p className="text-warm-gray mt-1">
          Manage your account and organization settings
        </p>
      </div>

      <SettingsContent
        userSettings={userSettings}
        organizationSettings={organizationSettings}
      />
    </div>
  );
}
