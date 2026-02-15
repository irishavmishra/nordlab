"use client";

import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "1",
    title: "Connect Your Data",
    subtitle: "Day 1",
    description: "Upload your product catalog and dealer list. We handle CSV, Excel, or direct ERP integration. Your products and pricing are live in minutes.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Set Your Pricing",
    subtitle: "Day 2",
    description: "Define dealer tiers and discount levels. The system applies them automatically. Each dealer sees their personalized pricing when they log in.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182-.879-.879-3.07-.879-4.242 0-.879.879-.879 2.303 0 3.182zM16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Invite Your Dealers",
    subtitle: "Day 3",
    description: "Send login links to your dealers. They browse your catalog, see their pricing, and place orders. No training needed. No phone calls required.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
];

export function ProcessSection() {
  const header = useScrollReveal<HTMLDivElement>();
  const steps$ = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-charcoal">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={header.ref} className={`max-w-3xl mx-auto text-center mb-16 reveal-up ${header.isVisible ? "visible" : ""}`}>
          <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
            How It Works
          </span>
          <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-4">
            From Signup to Live in <span className="serif-italic copper-text">72 Hours</span>
          </h2>
          <p className="text-warm-gray/60 text-base max-w-xl mx-auto">
            No discovery calls. No custom development. No six-month projects. 
            Upload your data, set your pricing, invite your dealers. Done.
          </p>
        </div>

        {/* Steps */}
        <div ref={steps$.ref} className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group relative bg-obsidian/40 border border-warm-gray/10 p-8 hover:border-copper/20 transition-all duration-300 reveal-up ${steps$.isVisible ? "visible" : ""} stagger-${index + 1}`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center text-copper mb-6 group-hover:bg-copper/15 group-hover:border-copper/50 transition-colors">
                {step.icon}
              </div>

              {/* Number and subtitle */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-copper text-xs tracking-[0.15em] uppercase font-medium">
                  {step.subtitle}
                </span>
              </div>

              {/* Content */}
              <h3 className="serif-display text-cream text-xl lg:text-2xl mb-4 group-hover:text-copper transition-colors">
                {step.title}
              </h3>
              <p className="text-warm-gray/60 text-sm leading-relaxed group-hover:text-warm-gray/80 transition-colors">
                {step.description}
              </p>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-warm-gray/20" aria-hidden="true">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-warm-gray/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#pricing"
            className="btn-copper text-obsidian px-8 py-4 text-base font-medium tracking-wide inline-flex items-center justify-center gap-3"
          >
            Start Setup — Takes 15 Minutes
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-warm-gray/30 text-xs mt-4">
            No credit card required • Free for up to 5 dealers
          </p>
        </div>
      </div>
    </section>
  );
}