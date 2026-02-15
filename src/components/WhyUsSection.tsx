'use client';

import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const reasons = [
  {
    title: 'We only build business operations systems',
    description: 'We do not build marketing sites, mobile apps, or SaaS products. We build quoting tools, ordering portals, and inventory systems for companies that move physical product. That is all we do, and we are very good at it.',
  },
  {
    title: 'We build around your process, not ours',
    description: 'If you price by the truckload and not by the unit, we build for truckloads. If your dealers order differently than your contractors, we handle both flows. We do not hand you a generic system and tell you to adapt.',
  },
  {
    title: 'You see working software in weeks, not months',
    description: 'We ship in focused phases. The first usable piece is typically live within two to three weeks. You are never waiting six months wondering what you are paying for.',
  },
  {
    title: 'We stay with you as your operations grow',
    description: 'You will add product lines. You will onboard new dealers. Your pricing will change. We do not hand you a finished system and disappear. We stay involved and make sure the system evolves with your business.',
  },
];

export function WhyUsSection() {
  const header = useScrollReveal<HTMLDivElement>();
  const items = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="why-us" className="relative py-24 md:py-32 bg-charcoal">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* Left column */}
          <div ref={header.ref} className={`reveal-left ${header.isVisible ? 'visible' : ''}`}>
            <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
              Why Work With Us
            </span>
            <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-6">
              We Are Not a <span className="serif-italic copper-text">Generic Dev Shop</span>
            </h2>
            <div className="editorial-rule mb-6" />
            <p className="text-warm-gray/50 text-base leading-relaxed">
              You have probably talked to agencies that build "anything for anyone." We are the opposite. We chose this niche because we understand the operational problems that distributors and wholesalers deal with every day.
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
