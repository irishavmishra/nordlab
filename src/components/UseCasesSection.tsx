'use client';

import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const useCases = [
  {
    type: 'Cabinet & Millwork Distributor',
    location: 'Southeast US, 85 dealers',
    before: 'Dealers emailed PDF order forms. Reps manually re-typed orders into the ERP. Quoting a custom kitchen took 2-3 days because someone had to pull pricing from three different spreadsheets and check stock on 14 door styles.',
    after: 'Dealers log in, configure their order from the live catalog, and get an instant quote with volume pricing applied automatically. Orders drop straight into fulfillment. Quote turnaround went from days to minutes.',
  },
  {
    type: 'Building Materials Supplier',
    location: 'Midwest, 200+ contractor accounts',
    before: 'Sales reps quoted from memory and last month\'s price list. Warehouse found out about large orders when the truck was supposed to leave. Three people spent every Friday reconciling orders against inventory counts done on clipboards.',
    after: 'Sales, warehouse, and purchasing share one dashboard. Reps see live stock levels before they quote. Contractors see order status online instead of calling in. Friday reconciliation went from half a day to twenty minutes.',
  },
  {
    type: 'Industrial Fastener & Hardware Importer',
    location: 'National, 320 reseller accounts',
    before: 'Container shipments arrived and nobody knew which orders to allocate stock to first. Resellers called daily asking about ETAs. The sales team spent more time on order status updates than on selling.',
    after: 'Incoming container inventory is pre-allocated to open orders automatically. Resellers check delivery status themselves through the portal. Sales team recovered 15+ hours per week they now spend on account growth.',
  },
];

export function UseCasesSection() {
  const header = useScrollReveal<HTMLDivElement>();
  const cases$ = useStaggerReveal<HTMLDivElement>();

return (
    <section id="customers" className="relative py-24 md:py-32 bg-obsidian">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={header.ref} className={`max-w-3xl mb-16 reveal-up ${header.isVisible ? 'visible' : ''}`}>
          <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
            Customer Success Stories
          </span>
          <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-4">
            Distributors Like Yours, <span className="serif-italic copper-text">Before and After</span>
          </h2>
          <p className="text-warm-gray/60 text-base max-w-xl">
            Real results from distributors who made the switch. The details change. The outcomes speak for themselves.
          </p>
        </div>

        {/* Use case cards */}
        <div ref={cases$.ref} className="space-y-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`group bg-charcoal/40 border border-warm-gray/5 hover:border-copper/15 transition-all duration-300 reveal-up ${cases$.isVisible ? 'visible' : ''} stagger-${index + 1}`}
            >
              {/* Header bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-8 lg:px-10 py-5 border-b border-warm-gray/8">
                <h3 className="serif-display text-cream text-lg lg:text-xl group-hover:text-copper transition-colors">
                  {useCase.type}
                </h3>
                <span className="text-warm-gray/30 text-xs tracking-[0.15em] uppercase mt-1 sm:mt-0">
                  {useCase.location}
                </span>
              </div>

              {/* Before / After */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-warm-gray/8">
                <div className="px-8 lg:px-10 py-8">
                  <span className="text-warm-gray/30 text-xs tracking-[0.2em] uppercase font-medium">Before</span>
                  <p className="text-warm-gray/50 text-sm lg:text-base leading-relaxed mt-3">
                    {useCase.before}
                  </p>
                </div>
                <div className="px-8 lg:px-10 py-8">
                  <span className="text-copper/60 text-xs tracking-[0.2em] uppercase font-medium">After</span>
                  <p className="text-warm-gray/80 text-sm lg:text-base leading-relaxed mt-3">
                    {useCase.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-warm-gray/30 text-sm mt-10 text-center max-w-lg mx-auto">
          These are representative scenarios based on the work we do. Specific numbers reflect typical outcomes, not guaranteed results.
        </p>
      </div>
    </section>
  );
}
