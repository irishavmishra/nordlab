"use client";

import { useState } from "react";

const tiers = [
  {
    label: "Starter",
    priceMonthly: "Free",
    priceAnnual: "Free",
    description:
      "Perfect for small distributors getting started with modern ordering. No credit card required.",
    features: [
      "Up to 5 dealers",
      "Basic dealer portal",
      "100 SKUs",
      "Email support",
      "Order history & tracking",
    ],
    cta: "Start Free",
    featured: false,
    badge: null,
  },
  {
    label: "Growth",
    priceMonthly: "$299",
    priceAnnual: "$249",
    description:
      "For growing distributors who need quoting, inventory visibility, and more dealer capacity.",
    features: [
      "Up to 25 dealers",
      "Full dealer portal",
      "Quoting system",
      "Inventory dashboard",
      "Priority email support",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    featured: true,
    badge: "Most Popular",
  },
  {
    label: "Pro",
    priceMonthly: "$799",
    priceAnnual: "$649",
    description:
      "For established distributors who need operations visibility, API access, and higher limits.",
    features: [
      "Up to 100 dealers",
      "Everything in Growth",
      "Operations dashboard",
      "API access",
      "Phone support",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    featured: false,
    badge: null,
  },
  {
    label: "Enterprise",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    description:
      "For large distributors with complex needs. Dedicated support, unlimited scale, and SLA guarantees.",
    features: [
      "Unlimited dealers",
      "Everything in Pro",
      "Dedicated success team",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    featured: false,
    badge: null,
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-obsidian">
      {/* Subtle top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
            Pricing
          </span>
          <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-6">
            Simple, Transparent <span className="serif-italic copper-text">Pricing</span>
          </h2>
          <p className="text-warm-gray/60 text-base max-w-xl mx-auto leading-relaxed">
            Start free. Scale as you grow. No hidden fees, no long-term contracts.
            Cancel anytime.
          </p>

          {/* Monthly/Annual toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!annual ? "text-cream" : "text-warm-gray/50"}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? "bg-copper" : "bg-warm-gray/20"
                }`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-obsidian transition-transform duration-300 ${annual ? "translate-x-8" : "translate-x-1"
                  }`}
              />
            </button>
            <span className={`text-sm ${annual ? "text-cream" : "text-warm-gray/50"}`}>
              Annual
              <span className="ml-1 text-copper text-xs">(Save 17%)</span>
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.label}
              className={`relative border transition-all duration-300 ${tier.featured
                  ? "border-copper/40 bg-charcoal/60"
                  : "border-warm-gray/10 bg-charcoal/30 hover:border-warm-gray/20"
                }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-copper text-obsidian text-[10px] tracking-[0.15em] uppercase font-semibold px-3 py-1">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-6 lg:p-8">
                {/* Plan name */}
                <h3 className={`text-lg font-medium ${tier.featured ? "text-copper" : "text-cream"}`}>
                  {tier.label}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-6">
                  <span className="serif-display text-3xl text-cream">
                    {annual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  {tier.priceMonthly !== "Free" && tier.priceMonthly !== "Custom" && (
                    <span className="text-warm-gray/40 text-sm">/mo</span>
                  )}
                  {annual && tier.priceMonthly !== "Free" && tier.priceMonthly !== "Custom" && (
                    <p className="text-warm-gray/30 text-xs mt-1">
                      billed annually
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-warm-gray/50 text-sm leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-warm-gray/60 text-sm">
                      <svg
                        className="w-4 h-4 text-copper/60 mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={tier.label === "Enterprise" ? "#contact" : "#signup"}
                  className={`block text-center py-3 text-sm font-medium tracking-wide transition-colors ${tier.featured
                      ? "btn-copper text-obsidian"
                      : "bg-warm-gray/10 text-cream hover:bg-warm-gray/15"
                    }`}
                >
                  {tier.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="serif-display text-cream text-xl mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div className="border-b border-warm-gray/10 pb-6">
              <h4 className="text-cream font-medium mb-2">Can I switch plans later?</h4>
              <p className="text-warm-gray/50 text-sm leading-relaxed">
                Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing cycle.
              </p>
            </div>
            <div className="border-b border-warm-gray/10 pb-6">
              <h4 className="text-cream font-medium mb-2">What counts as a dealer?</h4>
              <p className="text-warm-gray/50 text-sm leading-relaxed">
                A dealer is any unique login account that can access your portal. You can have unlimited admin users on any plan.
              </p>
            </div>
            <div className="border-b border-warm-gray/10 pb-6">
              <h4 className="text-cream font-medium mb-2">Is there a free trial?</h4>
              <p className="text-warm-gray/50 text-sm leading-relaxed">
                The Starter plan is free forever for up to 5 dealers. Paid plans include a 14-day free trial with full feature access.
              </p>
            </div>
            <div className="border-b border-warm-gray/10 pb-6">
              <h4 className="text-cream font-medium mb-2">Can I export my data?</h4>
              <p className="text-warm-gray/50 text-sm leading-relaxed">
                Absolutely. You own your data. Export your catalog, orders, and dealer list anytime in CSV or Excel format.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 text-warm-gray/40 text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              14-day free trial on paid plans
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}