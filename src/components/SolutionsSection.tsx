'use client';

import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const modules = [
  {
    title: 'Dealer Portal',
    description: 'Your dealers log in, see your live catalog with their pricing, and place orders directly. No phone calls. No back-and-forth emails. Orders flow straight into your system, clean and complete, ready to pick and ship.',
    features: ['Self-service ordering', 'Dealer-specific pricing', 'Order history & tracking', 'Mobile-friendly'],
    visual: (
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-warm-gray/50">Orders via portal</span>
          <span className="text-copper font-medium">78%</span>
        </div>
        <div className="h-1.5 bg-obsidian rounded-full overflow-hidden">
          <div className="h-full bg-copper/60 rounded-full" style={{ width: '78%' }} />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-warm-gray/50">Orders via email/phone</span>
          <span className="text-warm-gray/40 font-medium">22%</span>
        </div>
        <div className="h-1.5 bg-obsidian rounded-full overflow-hidden">
          <div className="h-full bg-warm-gray/20 rounded-full" style={{ width: '22%' }} />
        </div>
      </div>
    ),
  },
  {
    title: 'Quoting System',
    description: 'Your reps select products, the system pulls current pricing and applies dealer-specific discounts automatically. A branded quote goes out in minutes. Your dealers get faster answers, and your reps handle three times the volume without working late.',
    features: ['Auto-apply dealer discounts', 'PDF quotes with your branding', 'Quote-to-order conversion', 'Expiration tracking'],
    visual: (
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-xs">
          <div className="w-2 h-2 rounded-full bg-copper/60" />
          <span className="text-warm-gray/50">Quote sent</span>
          <span className="text-warm-gray/30 ml-auto">2 min ago</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="text-warm-gray/50">Quote accepted</span>
          <span className="text-warm-gray/30 ml-auto">Just now</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="w-2 h-2 rounded-full bg-warm-gray/20" />
          <span className="text-warm-gray/30">Order created automatically</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Inventory Dashboard',
    description: 'One screen that shows what is in stock, what is committed, what is incoming, and what is running low. Sales, warehouse, and purchasing all look at the same numbers. No more guessing. No more "let me check and call you back."',
    features: ['Live stock levels', 'Low stock alerts', 'Incoming inventory tracking', 'Commitment visibility'],
    visual: (
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-obsidian p-2.5 rounded text-center">
          <div className="text-copper text-lg font-semibold">1,247</div>
          <div className="text-warm-gray/40 text-[10px] uppercase tracking-wide">In Stock</div>
        </div>
        <div className="bg-obsidian p-2.5 rounded text-center">
          <div className="text-cream text-lg font-semibold">384</div>
          <div className="text-warm-gray/40 text-[10px] uppercase tracking-wide">Committed</div>
        </div>
        <div className="bg-obsidian p-2.5 rounded text-center">
          <div className="text-warm-gray/60 text-lg font-semibold">520</div>
          <div className="text-warm-gray/40 text-[10px] uppercase tracking-wide">Incoming</div>
        </div>
        <div className="bg-obsidian p-2.5 rounded text-center">
          <div className="text-red-400/80 text-lg font-semibold">12</div>
          <div className="text-warm-gray/40 text-[10px] uppercase tracking-wide">Low Stock</div>
        </div>
      </div>
    ),
  },
  {
    title: 'Operations Dashboard',
    description: 'Track rep performance, quote pipeline, dealer activity, and revenue from one screen. See what is working and what needs attention. Make decisions with real data instead of gut feel.',
    features: ['Sales rep metrics', 'Quote pipeline tracking', 'Dealer activity feed', 'Revenue analytics'],
    visual: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-1 h-4 bg-copper/60 rounded-full" />
          <span className="text-warm-gray/50">Rep performance</span>
          <span className="text-copper/50 ml-auto">Live</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-1 h-4 bg-copper/40 rounded-full" />
          <span className="text-warm-gray/50">Pipeline tracking</span>
          <span className="text-copper/50 ml-auto">Live</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-1 h-4 bg-copper/30 rounded-full" />
          <span className="text-warm-gray/50">Revenue analytics</span>
          <span className="text-copper/50 ml-auto">Live</span>
        </div>
      </div>
    ),
  },
];

export function SolutionsSection() {
  const header = useScrollReveal<HTMLDivElement>();
  const cards = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="platform" className="relative py-24 md:py-32 bg-obsidian">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={header.ref} className={`max-w-3xl mx-auto text-center mb-16 reveal-up ${header.isVisible ? 'visible' : ''}`}>
          <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
            The NordLab Platform
          </span>
          <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-4">
            One Platform, <span className="serif-italic copper-text">Four Core Modules</span>
          </h2>
          <p className="text-warm-gray/60 text-base max-w-xl mx-auto">
            Everything your distribution business needs to run modern operations. 
            Give your dealers a better experience and your team better tools.
          </p>
        </div>

        {/* Module cards */}
        <div ref={cards.ref} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {modules.map((module, i) => (
            <div
              key={module.title}
              className={`group bg-charcoal/50 border border-warm-gray/5 p-8 lg:p-10 transition-all duration-300 hover:border-copper/15 reveal-up ${cards.isVisible ? 'visible' : ''} stagger-${i + 1}`}
            >
              <h3 className="serif-display text-cream text-xl lg:text-2xl mb-4 group-hover:text-copper transition-colors">
                {module.title}
              </h3>
              
              <p className="text-warm-gray/60 text-sm lg:text-base leading-relaxed mb-6 group-hover:text-warm-gray/80 transition-colors">
                {module.description}
              </p>

              {/* Features */}
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {module.features.map((feature, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-warm-gray/50 text-xs">
                    <svg className="w-3 h-3 text-copper/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Mini data visual */}
              <div className="pt-6 border-t border-warm-gray/10">
                {module.visual}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <p className="text-warm-gray/40 text-sm">
            All modules included in Growth and Pro plans. <a href="#pricing" className="text-copper/70 hover:text-copper transition-colors">See pricing →</a>
          </p>
        </div>
      </div>
    </section>
  );
}