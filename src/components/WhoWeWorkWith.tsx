"use client";

import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const industries = [
  {
    name: "Building Materials",
    detail: "Lumber, roofing, drywall, concrete, siding",
  },
  {
    name: "Home Improvement & Finishes",
    detail: "Cabinets, countertops, flooring, doors, hardware",
  },
  {
    name: "Industrial & Specialty Products",
    detail: "Fasteners, tools, safety gear, plumbing, electrical",
  },
];

export function WhoWeWorkWith() {
  const header = useScrollReveal<HTMLDivElement>();
  const content = useScrollReveal<HTMLDivElement>({ rootMargin: "0px 0px -40px 0px" });
  const industries$ = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="who-we-serve" className="relative py-24 md:py-32 bg-obsidian">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column */}
          <div
            ref={header.ref}
            className={`reveal-left ${header.isVisible ? "visible" : ""}`}
          >
            <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
              Who This Is For
            </span>
            <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-6">
              You Distribute Physical Products <br className="hidden md:block" />
              Through <span className="serif-italic copper-text">Dealers and Contractors</span>
            </h2>
            <div className={`editorial-rule reveal-line ${header.isVisible ? "visible" : ""}`} style={{ transitionDelay: "400ms" }} />
          </div>

          {/* Right column */}
          <div
            ref={content.ref}
            className={`space-y-6 reveal-right ${content.isVisible ? "visible" : ""}`}
          >
            <p className="text-warm-gray text-lg leading-relaxed">
              You have 40 to 500 dealers placing orders. Your sales reps spend half their day 
              building quotes in Excel. Your warehouse team finds out about orders when someone 
              walks over with a printout. And your customers call in asking where their shipment is 
              because nobody updated the status.
            </p>
            <p className="text-warm-gray/70 text-base leading-relaxed">
              You are a distributor, importer, wholesaler, or regional supplier. You move real product 
              through a network of buyers. And the way orders, quotes, and inventory flow through 
              your business has not kept up with your growth.
            </p>
            <p className="text-warm-gray/50 text-base leading-relaxed">
              If that sounds like a normal Tuesday at your company, keep reading.
            </p>
          </div>
        </div>

        {/* Industry examples */}
        <div
          ref={industries$.ref}
          className="mt-16 pt-12 border-t border-warm-gray/10"
        >
          <span className={`text-warm-gray/40 text-xs tracking-[0.2em] uppercase reveal-up ${industries$.isVisible ? "visible" : ""}`}>
            Industries we know well
          </span>
          <div className="grid sm:grid-cols-3 gap-6 mt-6">
            {industries.map((industry, i) => (
              <div
                key={industry.name}
                className={`group reveal-up ${industries$.isVisible ? "visible" : ""} stagger-${i + 2}`}
              >
                <h3 className="text-cream font-medium text-base mb-1 group-hover:text-copper transition-colors">
                  {industry.name}
                </h3>
                <p className="text-warm-gray/50 text-sm">{industry.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}