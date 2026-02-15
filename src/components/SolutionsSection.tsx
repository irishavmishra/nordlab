'use client';

import { useScrollReveal, useStaggerReveal } from '@/hooks/useScrollReveal';

const solutions = [
  {
    title: 'Dealer Ordering Portal',
    description: 'Your dealers log in, see your live catalog with their pricing, and place orders directly. No phone calls. No back-and-forth emails. Orders flow straight into your system, clean and complete, ready to pick and ship.',
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
    title: 'Inventory & Order Dashboard',
    description: 'One screen that shows what is in stock, what is committed, what is incoming, and what is running low. Sales, warehouse, and purchasing all look at the same numbers. No more guessing. No more "let me check and call you back."',
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
    title: 'Internal Operations Tools',
    description: 'Custom-built tools for the things your business actually does every day. Whether that is routing orders by region, managing dealer credit terms, tracking rep commissions, or handling returns. Built around your process, not the other way around.',
    visual: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-1 h-4 bg-copper/60 rounded-full" />
          <span className="text-warm-gray/50">Order routing rules</span>
          <span className="text-copper/50 ml-auto">Active</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-1 h-4 bg-copper/40 rounded-full" />
          <span className="text-warm-gray/50">Commission tracking</span>
          <span className="text-copper/50 ml-auto">Active</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-1 h-4 bg-copper/30 rounded-full" />
          <span className="text-warm-gray/50">Return processing</span>
          <span className="text-copper/50 ml-auto">Active</span>
        </div>
      </div>
    ),
  },
];

export function SolutionsSection() {
  const header = useScrollReveal<HTMLDivElement>();
  const foundation = useScrollReveal<HTMLDivElement>();
  const cards = useStaggerReveal<HTMLDivElement>();

  return (
    <section id="solutions" className="relative py-24 md:py-32 bg-obsidian">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={header.ref} className={`max-w-3xl mb-16 reveal-up ${header.isVisible ? 'visible' : ''}`}>
          <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
            What We Build
          </span>
          <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl mt-4 mb-4">
            Systems That Replace the <span className="serif-italic copper-text">Spreadsheets and Guesswork</span>
          </h2>
          <p className="text-warm-gray/60 text-base max-w-xl">
            Every system we build connects to how your business already runs. We do not ask you to change your process to fit our software.
          </p>
        </div>

        {/* Digital Storefront - Foundation Card */}
        <div ref={foundation.ref} className={`mb-6 lg:mb-8 reveal-scale ${foundation.isVisible ? 'visible' : ''}`}>
          <div className="group relative bg-charcoal/50 border border-warm-gray/5 overflow-hidden transition-all duration-300 hover:border-copper/15">
            {/* Foundation label */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-copper/60 via-copper/30 to-transparent" />
            
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left - Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className="text-copper/60 text-[10px] tracking-[0.3em] uppercase font-medium mb-4 block">
                  The Foundation
                </span>
                <h3 className="serif-display text-cream text-xl lg:text-2xl mb-4 group-hover:text-copper transition-colors">
                  Your Digital Storefront
                </h3>
                <p className="text-warm-gray/60 text-sm lg:text-base leading-relaxed group-hover:text-warm-gray/80 transition-colors">
                  Before portals and dashboards, your business needs a front door that matches your reputation. A professional digital presence where dealers find your catalog, new partners evaluate your brand, and every system we build connects back to. Not a template. A foundation built for how distributors actually operate.
                </p>
              </div>

              {/* Right - Mini website mockup */}
              <div className="p-8 lg:p-10 border-t md:border-t-0 md:border-l border-warm-gray/5">
                <div className="bg-obsidian/80 rounded-sm overflow-hidden border border-warm-gray/5">
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-warm-gray/5">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-warm-gray/15" />
                      <div className="w-2 h-2 rounded-full bg-warm-gray/15" />
                      <div className="w-2 h-2 rounded-full bg-warm-gray/15" />
                    </div>
                    <div className="flex-1 mx-2">
                      <div className="bg-charcoal/60 rounded-sm px-3 py-1 text-[9px] text-warm-gray/30 font-mono">
                        www.your-company.com
                      </div>
                    </div>
                  </div>
                  
                  {/* Mini website content */}
                  <div className="p-4 space-y-3">
                    {/* Nav */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-sm bg-copper/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-sm bg-copper/50" />
                        </div>
                        <div className="h-1.5 w-14 bg-warm-gray/15 rounded-sm" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-1 w-8 bg-warm-gray/10 rounded-sm" />
                        <div className="h-1 w-8 bg-warm-gray/10 rounded-sm" />
                        <div className="h-1 w-8 bg-warm-gray/10 rounded-sm" />
                        <div className="px-2 py-0.5 bg-copper/20 rounded-sm">
                          <span className="text-[7px] text-copper/70">Dealer Login</span>
                        </div>
                      </div>
                    </div>

                    {/* Hero area */}
                    <div className="bg-charcoal/30 rounded-sm p-3 space-y-2">
                      <div className="h-1.5 w-3/4 bg-warm-gray/12 rounded-sm" />
                      <div className="h-1.5 w-1/2 bg-warm-gray/8 rounded-sm" />
                      <div className="flex gap-2 mt-2">
                        <div className="px-2 py-1 bg-copper/25 rounded-sm">
                          <span className="text-[7px] text-copper/80">View Catalog</span>
                        </div>
                        <div className="px-2 py-1 bg-warm-gray/8 rounded-sm">
                          <span className="text-[7px] text-warm-gray/40">Request Quote</span>
                        </div>
                      </div>
                    </div>

                    {/* Product grid */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {['Vanities', 'Wall Cabinets', 'Countertops'].map((name) => (
                        <div key={name} className="bg-charcoal/20 rounded-sm p-2 text-center space-y-1.5">
                          <div className="w-full h-6 bg-warm-gray/5 rounded-sm" />
                          <div className="text-[7px] text-warm-gray/40">{name}</div>
                          <div className="text-[7px] text-copper/40">48 SKUs</div>
                        </div>
                      ))}
                    </div>

                    {/* Trust bar */}
                    <div className="flex items-center justify-center gap-4 pt-1">
                      <div className="text-[6px] text-warm-gray/20 uppercase tracking-wider">200+ Dealers</div>
                      <div className="w-px h-2 bg-warm-gray/10" />
                      <div className="text-[6px] text-warm-gray/20 uppercase tracking-wider">Since 1994</div>
                      <div className="w-px h-2 bg-warm-gray/10" />
                      <div className="text-[6px] text-warm-gray/20 uppercase tracking-wider">3,000+ SKUs</div>
                    </div>
                  </div>
                </div>

                {/* Connection lines to other systems */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <div className="flex items-center gap-1.5 text-[9px] text-warm-gray/25">
                    <svg className="w-3 h-3 text-copper/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Connects to Portal
                  </div>
                  <div className="w-px h-3 bg-warm-gray/10" />
                  <div className="flex items-center gap-1.5 text-[9px] text-warm-gray/25">
                    <svg className="w-3 h-3 text-copper/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Feeds Quoting
                  </div>
                  <div className="w-px h-3 bg-warm-gray/10" />
                  <div className="flex items-center gap-1.5 text-[9px] text-warm-gray/25">
                    <svg className="w-3 h-3 text-copper/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Syncs Inventory
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Solution cards - existing grid */}
        <div ref={cards.ref} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, i) => (
            <div
              key={solution.title}
              className={`group bg-charcoal/50 border border-warm-gray/5 p-8 lg:p-10 transition-all duration-300 hover:border-copper/15 reveal-up ${cards.isVisible ? 'visible' : ''} stagger-${i + 1}`}
            >
              <h3 className="serif-display text-cream text-xl lg:text-2xl mb-4 group-hover:text-copper transition-colors">
                {solution.title}
              </h3>
              
              <p className="text-warm-gray/60 text-sm lg:text-base leading-relaxed mb-8 group-hover:text-warm-gray/80 transition-colors">
                {solution.description}
              </p>

              {/* Mini data visual */}
              <div className="pt-6 border-t border-warm-gray/10">
                {solution.visual}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
