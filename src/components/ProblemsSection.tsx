"use client";

import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const problems = [
  {
    number: "01",
    title: "Quoting Takes Days When It Should Take Minutes",
    description: "A dealer asks for pricing on 60 SKUs. Your rep opens a spreadsheet, cross-references a price list that may or may not be current, builds a PDF, and emails it back. Two days later. By then, the dealer already called your competitor.",
  },
  {
    number: "02",
    title: "Dealer Orders Come in From Everywhere",
    description: "Some dealers email. Some call. A few still fax. Orders get entered manually, details get missed, and your team spends the first hour of every day sorting through yesterday's mess instead of shipping product.",
  },
  {
    number: "03",
    title: "Nobody Knows What Is Actually in Stock",
    description: "Sales promises delivery on a product that warehouse sold out yesterday. Purchasing reorders something you already have 200 units of. Everyone is working off different numbers because there is no single place to look.",
  },
  {
    number: "04",
    title: "Your Best People Spend Their Time on Data Entry",
    description: "You hired experienced sales reps to grow accounts and close deals. Instead, they copy order details between systems, answer \"where is my shipment\" calls, and manually update tracking spreadsheets. That is not a staffing problem. That is a systems problem.",
  },
];

export function ProblemsSection() {
  const header = useScrollReveal<HTMLDivElement>();
  const cards = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="problems" className="relative py-24 md:py-32 bg-charcoal">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div
          ref={header.ref}
          className={`max-w-3xl mb-16 reveal-up ${header.isVisible ? "visible" : ""}`}
        >
          <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
            Sound Familiar?
          </span>
          <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-4">
            The Problems You Have <span className="serif-italic copper-text">Lived With</span> Long Enough
          </h2>
          <p className="text-warm-gray/60 text-base max-w-xl">
            These are not edge cases. Every distributor we talk to has at least three of these four problems running right now.
          </p>
        </div>

        {/* Problem cards */}
        <div ref={cards.ref} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem, i) => (
            <div
              key={problem.number}
              className={`group relative bg-obsidian/60 p-8 lg:p-10 transition-all duration-300 hover:bg-obsidian/90 border border-warm-gray/5 hover:border-copper/20 reveal-up ${cards.isVisible ? "visible" : ""} stagger-${i + 1}`}
            >
              {/* Number */}
              <div className="flex items-start gap-4 mb-5">
                <span className="text-copper/30 text-sm tracking-[0.15em] font-medium shrink-0 mt-1 group-hover:text-copper/60 transition-colors">
                  {problem.number}
                </span>
                <h3 className="serif-display text-cream text-xl lg:text-2xl group-hover:text-copper transition-colors">
                  {problem.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-warm-gray/60 text-sm lg:text-base leading-relaxed pl-10 group-hover:text-warm-gray/80 transition-colors">
                {problem.description}
              </p>

              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-copper transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}