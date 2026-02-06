import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

const team = [
  {
    name: 'Rishav',
    role: 'Founder - Full Stack Systems',
    letter: 'R',
    description:
      'Five years deep in building business systems that replace spreadsheets and manual workflows. Writes the backend logic, database architecture, and integration layers that make everything work under the hood.',
  },
  {
    name: 'Neha',
    role: 'Co-founder - Client Operations',
    letter: 'N',
    description:
      'Your single point of contact from day one. Handles discovery calls, onboarding, feedback loops, and makes sure what we build matches what your team actually needs. Not a project manager reading a script.',
  },
  {
    name: 'Pranjal',
    role: 'Frontend Systems',
    letter: 'P',
    description:
      'Builds every screen your dealers and sales reps will touch. The portals, dashboards, quoting interfaces, inventory views. If a user interacts with it, Pranjal built it.',
  },
  {
    name: 'Ravi',
    role: 'Finance and Compliance',
    letter: 'R',
    description:
      'Chartered Accountant who keeps contracts clean, invoicing transparent, and makes sure your engagement is structured properly from a financial and legal standpoint.',
  },
];

export function TeamSection() {
  return (
    <section id="team" className="relative py-24 md:py-32 bg-obsidian">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(201,145,90,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,145,90,0.1) 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
            Who Is NordLab
          </span>
          <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-6">
            Four People. <span className="serif-italic copper-text">One Focus.</span>
          </h2>
          <div className="editorial-rule mb-8" />
          <div className="max-w-3xl">
            <p className="text-warm-gray/70 text-base md:text-lg leading-relaxed mb-4">
              We are not a 200-person agency that assigns you a junior team. NordLab is four people who chose to focus entirely on operational systems for product distributors and wholesalers. Every project gets the full team. Every call includes someone who can make a decision.
            </p>
            <p className="text-warm-gray/50 text-base leading-relaxed">
              We have five years of experience building business systems - from ERP platforms for financial firms to complete management systems for property companies. We brought that experience into distribution because we saw firsthand how badly it was needed.
            </p>
          </div>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 gap-5 md:gap-6 mb-20 md:mb-24">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative bg-charcoal/40 border border-warm-gray/8 p-6 md:p-8 hover:border-copper/20 transition-all duration-500"
            >
              <div className="flex items-start gap-5">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-sm bg-obsidian border border-warm-gray/15 flex items-center justify-center group-hover:border-copper/40 transition-all duration-500">
                    <span className="serif-display text-copper/70 text-xl group-hover:text-copper transition-colors duration-500">
                      {member.letter}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-cream text-lg font-medium mb-0.5">
                    {member.name}
                  </h3>
                  <span className="text-copper/70 text-sm tracking-wide">
                    {member.role}
                  </span>
                  <p className="text-warm-gray/50 text-sm leading-relaxed mt-3 group-hover:text-warm-gray/65 transition-colors duration-500">
                    {member.description}
                  </p>
                </div>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              >
                <div className="absolute top-0 right-0 w-full h-px bg-copper/30" />
                <div className="absolute top-0 right-0 h-full w-px bg-copper/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Origin story */}
        <div className="relative">
          {/* Decorative quote */}
          <div
            className="absolute -top-6 left-4 text-copper/8 text-[120px] leading-none serif-display select-none"
            aria-hidden="true"
          >
            "
          </div>

          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12">
            {/* Label */}
            <div className="lg:pt-2">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-px bg-copper/40" />
                <span className="text-copper text-xs tracking-[0.3em] uppercase font-medium whitespace-nowrap">
                  Why This Niche
                </span>
              </div>
            </div>

            {/* Story */}
            <div className="relative bg-charcoal/30 border border-warm-gray/8 p-8 md:p-10 lg:p-12">
              <div className="max-w-3xl">
                <p className="text-cream/90 text-base md:text-lg leading-relaxed mb-5">
                  Last year I walked into a wholesaler's office in central India. They import and sell natural stone slabs - marble, quartzite, granite - in bulk. Their own mines, their own supply chain, 20+ years in the business. Serious operation.
                </p>
                <p className="text-warm-gray/65 text-base md:text-lg leading-relaxed mb-5">
                  While I was there, an old client walked in with a payment dispute. Something about a quantity difference from months ago. The owner pulled out a register. Then another one. Then a third. Ten registers stacked on a shelf, each one covering a different period. His staff spent over an hour flipping through pages trying to find one transaction.
                </p>
                <p className="text-warm-gray/65 text-base md:text-lg leading-relaxed mb-5">
                  They never found it while I was there.
                </p>
                <p className="text-warm-gray/65 text-base md:text-lg leading-relaxed mb-5">
                  Here is a business that did everything right. Built relationships over decades. Mined their own product. Hired loyal staff. But when a customer stood in front of them asking a simple question - how much did I order and how much did I pay - they could not answer it. All that hard work, and the system still let them down at the moment it mattered most.
                </p>
                <p className="text-cream/90 text-base md:text-lg leading-relaxed">
                  That is the day NordLab stopped being a general software team and became a company that builds operational systems for distributors and wholesalers. Because these businesses do not need another website. They need systems that actually run.
                </p>

                {/* Attribution */}
                <div className="mt-8 pt-6 border-t border-warm-gray/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-obsidian border border-copper/30 flex items-center justify-center">
                    <span className="serif-display text-copper text-base">R</span>
                  </div>
                  <div>
                    <span className="text-cream text-sm font-medium">Rishav</span>
                    <span className="text-warm-gray/40 text-sm ml-2">Founder, NordLab</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center sm:text-left">
            <div className="text-copper serif-display text-3xl md:text-4xl mb-2">5+</div>
            <div className="text-warm-gray/50 text-sm">Years building business systems</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-copper serif-display text-3xl md:text-4xl mb-2">100%</div>
            <div className="text-warm-gray/50 text-sm">Senior team on every project. No outsourcing, no handoffs.</div>
          </div>
          <div className="text-center sm:text-left">
            <div className="text-copper serif-display text-3xl md:text-4xl mb-2">2</div>
            <div className="text-warm-gray/50 text-sm">
              Live production systems -
              <a href="https://rently.property" target="_blank" rel="noopener noreferrer" className="text-copper/70 hover:text-copper transition-colors ml-1 link-underline">Rently</a>,
              <a href="https://fiscally.online" target="_blank" rel="noopener noreferrer" className="text-copper/70 hover:text-copper transition-colors ml-1 link-underline">Fiscally</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
