import { NordLabLogo } from "./NordLabLogo";

export function Footer() {
  return (
    <footer className="relative py-12 md:py-16 px-6 sm:px-8 lg:px-12 bg-obsidian border-t border-slate-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Logo & tagline */}
          <div className="sm:col-span-2 lg:col-span-5">
            <a href="#" className="inline-flex mb-5">
              <NordLabLogo size={44} />
            </a>
            <p className="text-warm-gray leading-relaxed max-w-sm text-sm sm:text-base">
              We build quoting, ordering, and inventory systems for product distributors 
              who are done managing their business through email and spreadsheets.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-cream text-sm tracking-[0.15em] uppercase mb-5 font-medium">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Who We Serve", href: "#who-we-serve" },
                { label: "What We Build", href: "#solutions" },
                { label: "How It Works", href: "#process" },
                { label: "Pricing", href: "#pricing" },
                { label: "Why Work With Us", href: "#why-us" },
                { label: "Our Team", href: "#team" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-warm-gray hover:text-copper transition-colors duration-300 link-underline text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-cream text-sm tracking-[0.15em] uppercase mb-5 font-medium">
              Start a Conversation
            </h4>
            <div className="space-y-4">
              <p className="text-warm-gray text-sm leading-relaxed">
                Not sure if we are the right fit? Book a 30-minute call. 
                We will look at your current setup and tell you honestly 
                whether we can make a difference.
              </p>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-copper hover:text-copper-light transition-colors duration-300 text-sm font-medium"
              >
                <span>Schedule a strategy call</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-slate-dark/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-warm-gray/50 text-sm">
            &copy; {new Date().getFullYear()} NordLab. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-warm-gray/30 text-xs tracking-wide">
              Operations systems for product distributors
            </span>
            <div className="w-1.5 h-1.5 bg-copper rounded-sm" />
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-copper to-transparent opacity-40" />
    </footer>
  );
}
