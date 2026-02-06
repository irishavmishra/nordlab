import { useScrollReveal, useStaggerReveal } from '../hooks/useScrollReveal';

const steps = [
  {
    number: 'I',
    title: 'Map Your Current Process',
    subtitle: 'Days 1-3',
    description: 'We sit with your sales team, your warehouse, and your operations manager. We document exactly how orders, quotes, and inventory move through your business today. Every workaround. Every bottleneck. Every "we just deal with it" moment.',
  },
  {
    number: 'II',
    title: 'Design Around Your Business',
    subtitle: 'Week 1-2',
    description: 'We design a system that fits your workflow. If your dealers need to see live pricing by tier, we build that. If your warehouse needs to confirm stock before a quote goes out, we build that. No generic templates. No forcing your team to learn someone else\'s logic.',
  },
  {
    number: 'III',
    title: 'Build and Launch in Phases',
    subtitle: 'Week 2-3',
    description: 'We do not disappear for six months and come back with a finished product. We ship the highest-impact piece first. Usually the quoting system or the dealer portal. Your team starts using it, we get real feedback, and we keep building from there.',
  },
  {
    number: 'IV',
    title: 'Improve as Your Business Grows',
    subtitle: 'Ongoing',
    description: 'You add a new product line. You onboard 30 more dealers. You want your reps to see real-time commission numbers. We stay with you and evolve the system so it never falls behind your business again.',
  },
];

export function ProcessSection() {
  const header = useScrollReveal<HTMLDivElement>();
  const steps$ = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="process" className="relative py-24 md:py-32 bg-charcoal">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={header.ref} className={`max-w-3xl mb-16 reveal-up ${header.isVisible ? 'visible' : ''}`}>
          <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
            How It Works
          </span>
          <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-4">
            A Clear Process <span className="serif-italic copper-text">With No Surprises</span>
          </h2>
          <p className="text-warm-gray/60 text-base max-w-xl">
            You will know what is being built, when it ships, and what it costs at every step. No scope creep. No six-month black box.
          </p>
        </div>

        {/* Steps */}
        <div ref={steps$.ref} className="space-y-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group relative grid md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-10 border-b border-warm-gray/10 last:border-b-0 transition-colors duration-300 hover:bg-obsidian/20 reveal-up ${steps$.isVisible ? 'visible' : ''} stagger-${index + 1}`}
            >
              {/* Number and subtitle */}
              <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-2">
                <span className="serif-display text-copper/40 text-2xl md:text-3xl group-hover:text-copper/70 transition-colors">
                  {step.number}
                </span>
                <span className="text-warm-gray/30 text-xs tracking-[0.15em] uppercase">
                  {step.subtitle}
                </span>
              </div>

              {/* Content */}
              <div>
                <h3 className="serif-display text-cream text-xl lg:text-2xl mb-4 group-hover:text-copper transition-colors">
                  {step.title}
                </h3>
                <p className="text-warm-gray/60 text-sm lg:text-base leading-relaxed max-w-2xl group-hover:text-warm-gray/80 transition-colors">
                  {step.description}
                </p>
              </div>

              {/* Connector dot */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -bottom-[5px] left-[56px] w-2.5 h-2.5 rounded-full border-2 border-warm-gray/15 bg-charcoal group-hover:border-copper/40 transition-colors z-10" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
