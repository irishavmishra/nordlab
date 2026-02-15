"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  ShoppingCart,
  FileText,
  Warehouse,
  Settings,
  LogOut,
} from "lucide-react";
import { NordLabLogo } from "@/components/NordLabLogo";
import { signOut } from "@/lib/auth-client";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/app", icon: Home },
  { label: "Products", href: "/app/products", icon: Package },
  { label: "Orders", href: "/app/orders", icon: ShoppingCart },
  { label: "Quotes", href: "/app/quotes", icon: FileText },
  { label: "Inventory", href: "/app/inventory", icon: Warehouse },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

interface SidebarProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
  organization?: {
    name: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ user, organization, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  const isActive = (href: string) => {
    if (href === "/app") {
      return pathname === "/app";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-charcoal border-r border-slate-dark z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-slate-dark">
            <Link href="/app" className="flex items-center gap-3">
              <NordLabLogo size={36} showWordmark={false} />
              <div className="flex flex-col">
                <span className="text-cream font-medium tracking-wide text-sm">
                  {organization?.name || "NordLab"}
                </span>
                <span className="text-warm-gray text-xs tracking-wide">
                  B2B Portal
                </span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                        active
                          ? "bg-graphite text-copper border-l-2 border-copper"
                          : "text-warm-gray hover:text-cream hover:bg-graphite/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="tracking-wide">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-slate-dark">
            {user && (
              <div className="mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-graphite flex items-center justify-center border border-slate-mid">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-copper text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-cream text-sm font-medium truncate">
                      {user.name}
                    </p>
                    <p className="text-warm-gray text-xs truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm text-warm-gray hover:text-copper hover:bg-graphite/50 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="tracking-wide">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}