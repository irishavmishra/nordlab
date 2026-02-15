"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/app/Sidebar";
import { Header } from "@/components/app/Header";

interface AppShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    email: string;
    image?: string | null;
  } | null;
  organization?: {
    name: string;
  } | null;
}

export function AppShell({ children, user, organization }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-obsidian">
      <Sidebar
        user={user || null}
        organization={organization || null}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        <Header
          user={user || null}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}