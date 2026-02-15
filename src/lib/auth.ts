import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  plugins: [nextCookies()],
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            // Create a default organization for the new user
            const orgId = nanoid();
            const orgSlug = user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-');
            
            const [newOrg] = await db.insert(schema.organizations).values({
              id: orgId,
              name: `${user.name || user.email.split('@')[0]}'s Organization`,
              slug: `${orgSlug}-${orgId.slice(0, 4)}`,
              type: 'dealer',
            }).returning();

            // Update user with organizationId and admin role
            await db.update(schema.users)
              .set({ organizationId: newOrg.id, role: 'admin' })
              .where(eq(schema.users.id, user.id));
          } catch (error) {
            console.error('Failed to create organization for user:', error);
          }
        },
      },
    },
  },
});
