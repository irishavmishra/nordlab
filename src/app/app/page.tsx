import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { Package, ShoppingCart, AlertTriangle, FileText, Plus } from "lucide-react";

interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  organizationId?: string;
  role?: string;
}

export default async function DashboardPage() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  }) as { user?: SessionUser } | null;

  if (!session?.user) {
    redirect('/login');
  }

  // Check DB directly for organizationId (session might be stale)
  const [dbUser] = await db
    .select({ organizationId: schema.users.organizationId })
    .from(schema.users)
    .where(eq(schema.users.id, session.user.id))
    .limit(1);

  // If user doesn't have an organization, redirect to setup
  if (!dbUser?.organizationId) {
    redirect('/app/setup');
  }

  const stats = [
    {
      label: "Total Orders",
      value: "0",
      change: "Get started",
      icon: ShoppingCart,
      href: "/app/orders",
    },
    {
      label: "Products",
      value: "0",
      change: "Add products",
      icon: Package,
      href: "/app/products",
    },
    {
      label: "Low Stock",
      value: "0",
      change: "All stocked",
      icon: AlertTriangle,
      href: "/app/inventory",
    },
    {
      label: "Open Quotes",
      value: "0",
      change: "Create one",
      icon: FileText,
      href: "/app/quotes",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-cream serif-display">
          Welcome, {session.user.name || 'there'}
        </h1>
        <p className="text-warm-gray mt-1">
          Here&apos;s an overview of your B2B portal
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <a
              key={stat.label}
              href={stat.href}
              className="card-dark p-5 rounded-lg group"
            >
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-md bg-graphite border border-slate-dark group-hover:border-copper transition-colors">
                  <Icon className="w-5 h-5 text-copper" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-light text-cream">{stat.value}</p>
                <p className="text-sm text-warm-gray mt-1 tracking-wide">
                  {stat.label}
                </p>
              </div>
              <p className="text-xs text-copper mt-3">{stat.change}</p>
            </a>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 card-dark rounded-lg p-6">
          <h2 className="text-lg font-medium text-cream mb-4">Getting Started</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-charcoal rounded-lg border border-slate-dark">
              <div className="p-3 rounded-full bg-copper/10">
                <Plus className="w-6 h-6 text-copper" />
              </div>
              <div className="flex-1">
                <h3 className="text-cream font-medium">Add your first product</h3>
                <p className="text-warm-gray text-sm">Start building your product catalog</p>
              </div>
              <a
                href="/app/products/new"
                className="px-4 py-2 bg-copper text-obsidian text-sm font-medium rounded hover:bg-copper-light transition-colors"
              >
                Add Product
              </a>
            </div>
            <p className="text-warm-gray/60 text-sm">
              Once you add products, your dealers can browse and place orders through the portal.
            </p>
          </div>
        </div>

        <div className="card-dark rounded-lg p-6">
          <h2 className="text-lg font-medium text-cream mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/app/products"
              className="block w-full text-center btn-ghost px-4 py-3 text-sm text-warm-gray"
            >
              Browse Products
            </a>
            <a
              href="/app/products/new"
              className="block w-full text-center btn-copper px-4 py-3 text-sm text-obsidian font-medium"
            >
              Add New Product
            </a>
            <a
              href="/app/quotes"
              className="block w-full text-center btn-ghost px-4 py-3 text-sm text-warm-gray"
            >
              Create Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
