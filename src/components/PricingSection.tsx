const tiers = [
  {
    label: 'Start With One Problem',
    price: 'From $5,000',
    timeline: '2 to 3 weeks',
    description:
      'Your Digital Storefront and one operational system - a dealer portal, a quoting tool, or an inventory dashboard. You get a professional front door for your business and one real problem solved.',
    includes: [
      'Business website that presents your products and brand',
      'One core system - quoting, ordering, or inventory',
      'Connected so the website feeds directly into the system',
      'Training for your team to run it independently',
    ],
    bestFor: 'Companies that want to start with a clear win before committing to more.',
    featured: false,
  },
  {
    label: 'Connect Your Sales Operations',
    price: '$12,000 - $25,000',
    timeline: '4 to 8 weeks, phased delivery',
    description:
      'Multiple systems working together. Your dealers order through a portal, your reps quote from live pricing, and your warehouse sees what is coming. Everything talks to everything.',
    includes: [
      'Digital Storefront with dealer login and product catalog',
      'Dealer or contractor ordering portal',
      'Quoting system with tiered pricing logic',
      'Inventory visibility dashboard for internal teams',
      'Ongoing support during rollout',
    ],
    bestFor: 'Distributors doing $5M-$50M who are ready to replace spreadsheets across the board.',
    featured: true,
  },
  {
    label: 'Full Digital Operations Layer',
    price: 'Custom Scoping',
    timeline: 'Phased over 2 to 4 months',
    description:
      'A complete digital layer covering every touchpoint - dealers, reps, warehouse, purchasing, and management. Built around how your business actually runs, not how software companies think it should.',
    includes: [
      'Everything in the previous tier',
      'Sales rep dashboards with pipeline and commission tracking',
      'Warehouse and fulfillment management tools',
      'Management reporting and analytics',
      'Custom integrations with your existing ERP or accounting system',
      'Ongoing partnership with quarterly roadmap reviews',
    ],
    bestFor: 'Established distributors ready to make digital operations a competitive advantage.',
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-obsidian">
      {/* Subtle top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header - two column */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 mb-20">
          {/* Left - framing */}
          <div>
            <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
              Investment
            </span>
            <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-6">
              Clear Pricing,{' '}
              <span className="serif-italic copper-text">No Surprises</span>
            </h2>
            <div className="w-12 h-px bg-copper/40 mb-6" aria-hidden="true" />
            <p className="text-warm-gray/60 text-base leading-relaxed">
              We price by the project, not by the hour. You know the total cost
              before we start. No scope creep conversations, no surprise invoices
              at the end of the month.
            </p>
          </div>

          {/* Right - context */}
          <div className="flex flex-col justify-end">
            <div className="bg-charcoal/50 border border-warm-gray/8 p-8 lg:p-10">
              <p className="text-warm-gray/50 text-sm leading-relaxed mb-6">
                Most distributors start with Tier 1 to solve one painful
                bottleneck. Once the team sees the result, expanding to Tier 2
                becomes an obvious decision. You do not need to commit to
                everything upfront.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <span className="serif-display text-copper text-2xl md:text-3xl">
                    $5K
                  </span>
                  <p className="text-warm-gray/40 text-xs mt-1">
                    lowest starting point to solve one real problem
                  </p>
                </div>
                <div>
                  <span className="serif-display text-copper text-2xl md:text-3xl">
                    $0
                  </span>
                  <p className="text-warm-gray/40 text-xs mt-1">
                    hidden fees, hourly overages, or surprise invoices
                  </p>
                </div>
                <div>
                  <span className="serif-display text-copper text-2xl md:text-3xl">
                    14d
                  </span>
                  <p className="text-warm-gray/40 text-xs mt-1">
                    first working system can be live in as few as 14 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tiers */}
        <div className="space-y-6">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`group relative border transition-all duration-500 ${tier.featured
                  ? 'border-copper/30 bg-charcoal/60 hover:border-copper/50'
                  : 'border-warm-gray/8 bg-charcoal/20 hover:border-warm-gray/20'
                }`}
            >
              {/* Featured badge */}
              {tier.featured && (
                <div className="absolute -top-px left-8 lg:left-12">
                  <div className="bg-copper text-obsidian text-[10px] tracking-[0.2em] uppercase font-semibold px-4 py-1.5">
                    Most Common
                  </div>
                </div>
              )}

              {/* Copper left accent for featured */}
              {tier.featured && (
                <div
                  className="absolute left-0 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-copper to-transparent"
                  aria-hidden="true"
                />
              )}

              <div className="p-8 lg:p-12">
                {/* Top row - label, price, timeline */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-8 mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-warm-gray/25 text-xs tracking-[0.15em] uppercase">
                        Tier {index + 1}
                      </span>
                      <div
                        className="flex-1 h-px bg-warm-gray/8 hidden lg:block"
                        aria-hidden="true"
                      />
                    </div>
                    <h3
                      className={`serif-display text-xl lg:text-2xl ${tier.featured ? 'text-copper' : 'text-cream'
                        } group-hover:text-copper transition-colors`}
                    >
                      {tier.label}
                    </h3>
                  </div>
                  <div className="flex items-baseline gap-6 lg:text-right">
                    <div>
                      <span
                        className={`serif-display text-2xl lg:text-3xl ${tier.featured ? 'text-cream' : 'text-cream/80'
                          }`}
                      >
                        {tier.price}
                      </span>
                      <p className="text-warm-gray/40 text-xs mt-1">
                        {tier.timeline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-warm-gray/55 text-sm lg:text-base leading-relaxed mb-8 max-w-3xl">
                  {tier.description}
                </p>

                {/* Includes + Best for */}
                <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16">
                  {/* What is included */}
                  <div>
                    <span className="text-warm-gray/30 text-xs tracking-[0.15em] uppercase block mb-4">
                      What is included
                    </span>
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      {tier.includes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-warm-gray/60 text-sm"
                        >
                          <span className="text-copper/60 mt-0.5 flex-shrink-0">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path
                                d="M2 7.5L5.5 11L12 3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Best for */}
                  <div className="lg:max-w-[260px] lg:border-l lg:border-warm-gray/8 lg:pl-8">
                    <span className="text-warm-gray/30 text-xs tracking-[0.15em] uppercase block mb-3">
                      Best for
                    </span>
                    <p className="text-warm-gray/50 text-sm leading-relaxed">
                      {tier.bestFor}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom - free process review */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-charcoal/40 border border-warm-gray/8 px-8 sm:px-12 py-8 sm:py-10 max-w-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-copper/40" aria-hidden="true" />
              <span className="text-copper text-xs tracking-[0.2em] uppercase font-medium">
                Every Engagement Starts Here
              </span>
              <div className="w-8 h-px bg-copper/40" aria-hidden="true" />
            </div>
            <h3 className="serif-display text-cream text-xl sm:text-2xl mb-3">
              Free 30-Minute Process Review
            </h3>
            <p className="text-warm-gray/50 text-sm leading-relaxed mb-6 max-w-md mx-auto">
              We map your biggest bottleneck live on the call. You walk away with
              a clear picture of where digital systems will save time and money -
              whether you work with us or not.
            </p>
            <button
              data-cal-namespace="30min"
              data-cal-link="nordlab/30min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
              className="btn-copper text-obsidian px-8 py-3.5 text-sm font-medium tracking-wide inline-block cursor-pointer"
            >
              Book Your Free Review
            </button>
            <p className="text-warm-gray/25 text-xs mt-4">
              No pitch deck. No pressure. Just a real conversation about your
              operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
