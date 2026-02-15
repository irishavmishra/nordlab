"use client";

import { useState, useEffect } from "react";
import { NordLabLogo } from "./NordLabLogo";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileOpen]);

  const navLinks = [
    { label: "Platform", href: "#platform" },
    { label: "Pricing", href: "#pricing" },
    { label: "Customers", href: "#customers" },
  ];

  return (
    <>
      <header
        className={`fixed top-[2px] left-0 right-0 z-40 transition-all duration-500 ${scrolled
          ? "bg-obsidian/95 backdrop-blur-md border-b border-slate-dark"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <NordLabLogo size={42} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-warm-gray text-sm tracking-wide link-underline hover:text-cream transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/login"
                className="text-warm-gray text-sm tracking-wide link-underline hover:text-cream transition-colors duration-300"
              >
                Login
              </Link>
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/signup"
              className="hidden lg:inline-flex btn-copper text-obsidian px-6 py-3 text-sm font-medium tracking-wide"
            >
              Start Free Trial
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={`block w-6 h-px bg-cream transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                  }`}
              />
              <span
                className={`block w-6 h-px bg-cream transition-all duration-300 ${mobileOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`block w-6 h-px bg-cream transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="mobile-nav-overlay lg:hidden" onClick={() => setMobileOpen(false)}>
          <nav
            className="flex flex-col items-center justify-center h-full gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-cream text-2xl serif-display hover:text-copper transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-cream text-2xl serif-display hover:text-copper transition-colors duration-300"
            >
              Login
            </Link>
            <div className="mt-4 pt-8 border-t border-slate-dark">
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="btn-copper text-obsidian px-10 py-4 text-base font-medium tracking-wide inline-block"
              >
                Start Free Trial
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
