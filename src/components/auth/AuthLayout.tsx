"use client";

import Link from "next/link";
import { NordLabLogo } from "@/components/NordLabLogo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-obsidian text-cream flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-charcoal border-r border-slate-dark">
        <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-copper to-transparent" aria-hidden="true" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <Link href="/" className="mb-12">
            <NordLabLogo size={48} />
          </Link>
          
          <h1 className="serif-display text-4xl xl:text-5xl text-cream mb-6">
            B2B Ordering Portal
          </h1>
          
          <p className="text-warm-gray text-lg leading-relaxed max-w-md">
            Streamline your wholesale operations with our custom dealer portals, 
            automated quoting systems, and real-time inventory dashboards.
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-graphite border border-slate-dark flex items-center justify-center">
                <svg className="w-5 h-5 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-warm-gray">Real-time inventory tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-graphite border border-slate-dark flex items-center justify-center">
                <svg className="w-5 h-5 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-warm-gray">Automated order processing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-graphite border border-slate-dark flex items-center justify-center">
                <svg className="w-5 h-5 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-warm-gray">Custom pricing for dealers</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-12 xl:left-20 text-warm-gray/50 text-sm">
          &copy; {new Date().getFullYear()} NordLab. All rights reserved.
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-8 lg:px-12 xl:px-16">
        <div className="lg:hidden mb-8">
          <Link href="/" className="inline-block">
            <NordLabLogo size={40} />
          </Link>
        </div>
        
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-light text-cream mb-2">{title}</h2>
          {subtitle && (
            <p className="text-warm-gray mb-8">{subtitle}</p>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
}
