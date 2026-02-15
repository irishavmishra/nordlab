'use client';

import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const reasons = [
  {
    title: 'Purpose-Built for Distribution',
    description: 'We only serve product distributors. Every feature exists because a distributor like you asked for it. No bloat. No unused features from other industries.',
  },
  {
    title: '3 Days to Live, Not 6 Months',
    description: 'No discovery calls. No custom development. Upload your catalog, set pricing, invite dealers. Done. Your team starts using it immediately.',
  },
  {
    title: 'Improves Automatically',
    description: 'New features ship weekly. Every distributor benefits. Your platform gets better without you paying more or managing updates.',
  },
  {
    title: 'You Own Your Data',
    description: 'Export everything anytime. Your catalog, orders, and dealers belong to you. Not locked in our system. No vendor lock-in.',
  },
];

export function WhyUsSection() {
  const header = useScrollReveal<HTMLDivElement>();
  const items = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="why-nordlab" className="relative py-24 md:py-32 bg-charcoal">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* Left column */}
          <div ref={header.ref} className={`reveal-left ${header.isVisible ? 'visible' : ''}`}>
            <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
              Why NordLab
            </span>
            <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-6">
              Built for Distributors, <span className="serif-italic copper-text">Not Developers</span>
            </h2>
            <div className="editorial-rule mb-6" />
            <p className="text-warm-gray/50 text-base leading-relaxed">
              We spent five years building operational systems before realizing distributors needed a product, not a project. That insight became NordLab.
            </p>
          </div>

          {/* Right column */}
          <div ref={items.ref} className="space-y-0">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className={`group py-8 border-b border-warm-gray/10 last:border-b-0 reveal-up ${items.isVisible ? 'visible' : ''} stagger-${index + 1}`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1.5 w-5 h-5 rounded-full border border-copper/30 flex items-center justify-center group-hover:border-copper/60 group-hover:bg-copper/10 transition-all duration-300">
                    <svg className="w-2.5 h-2.5 text-copper/50 group-hover:text-copper transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-cream text-base lg:text-lg font-medium mb-2 group-hover:text-copper transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-warm-gray/50 text-sm lg:text-base leading-relaxed group-hover:text-warm-gray/70 transition-colors">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}