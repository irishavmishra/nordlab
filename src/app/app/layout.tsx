import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AppShell } from "@/components/app/AppShell";

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
  role?: string;
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  }) as { user?: SessionUser } | null;

  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  const organization = session?.user?.organizationId
    ? { name: "Organization" }
    : null;

  return (
    <AppShell user={user} organization={organization}>
      {children}
    </AppShell>
  );
}