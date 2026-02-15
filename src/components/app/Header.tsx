"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

interface HeaderProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
  onMenuToggle: () => void;
  title?: string;
}

export function Header({ user, onMenuToggle, title }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-30 bg-obsidian/95 backdrop-blur-md border-b border-slate-dark">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-warm-gray hover:text-cream hover:bg-graphite transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <nav className="hidden sm:flex items-center gap-2 text-sm">
              <Link
                href="/app"
                className="text-warm-gray hover:text-cream transition-colors"
              >
                Dashboard
              </Link>
              {title && (
                <>
                  <span className="text-slate-mid">/</span>
                  <span className="text-cream">{title}</span>
                </>
              )}
            </nav>
            {title && (
              <h1 className="sm:hidden text-cream text-lg font-medium">
                {title}
              </h1>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="relative p-2 rounded-md text-warm-gray hover:text-cream hover:bg-graphite transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-copper rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-md hover:bg-graphite transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-graphite flex items-center justify-center border border-slate-mid">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-copper text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-warm-gray transition-transform duration-200 hidden sm:block ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-charcoal border border-slate-dark rounded-md shadow-lg z-50 py-1">
                  <Link
                    href="/app/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-warm-gray hover:text-cream hover:bg-graphite transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/app/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-warm-gray hover:text-cream hover:bg-graphite transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <hr className="my-1 border-slate-dark" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-warm-gray hover:text-copper hover:bg-graphite transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}