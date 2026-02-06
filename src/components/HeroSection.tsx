export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-obsidian to-obsidian" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-warm-gray) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-warm-gray) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-8 lg:left-12 w-px h-32 bg-gradient-to-b from-transparent via-copper to-transparent opacity-40 anim-fade-in anim-delay-7 hidden md:block" />
      <div className="absolute bottom-1/4 right-8 lg:right-12 w-px h-32 bg-gradient-to-b from-transparent via-copper to-transparent opacity-40 anim-fade-in anim-delay-8 hidden md:block" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-32 text-center">
        {/* Eyebrow */}
        <div className="anim-fade-up">
          <span className="inline-block text-copper text-sm tracking-[0.3em] uppercase mb-8 font-medium">
            Sales & Operations Systems for Distributors
          </span>
        </div>

        {/* Main headline */}
        <h1 className="anim-fade-up anim-delay-1">
          <span className="serif-display text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl block mb-2 md:mb-4">
            Your Dealers Still Order
          </span>
          <span className="serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl block">
            by <span className="serif-italic copper-text">Email and Phone.</span>
          </span>
          <span className="serif-display text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl block mt-2 md:mt-4">
            We Fix That.
          </span>
        </h1>

        {/* Divider */}
        <div className="my-8 md:my-12 anim-fade-in anim-delay-3">
          <div className="editorial-rule max-w-md mx-auto" />
        </div>

        {/* Subtext */}
        <p className="text-warm-gray text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed anim-fade-up anim-delay-4">
          We build custom quoting portals, dealer ordering systems, and inventory dashboards
          for product distributors. No more chasing pricing in spreadsheets or fielding
          the same order status calls every morning.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-10 md:mt-14 anim-fade-up anim-delay-5">
          <button
            data-cal-namespace="30min"
            data-cal-link="nordlab/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
            className="btn-copper text-obsidian px-8 sm:px-10 py-4 text-base font-medium tracking-wide inline-flex items-center justify-center gap-3 cursor-pointer"
          >
            Book a Strategy Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <a
            href="#process"
            className="btn-ghost text-cream px-8 sm:px-10 py-4 text-base font-medium tracking-wide inline-flex items-center justify-center gap-3"
          >
            See How It Works
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 anim-fade-in anim-delay-7 hidden md:flex">
        <div className="flex flex-col items-center gap-3 text-warm-gray">
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-warm-gray to-transparent" />
        </div>
      </div>
    </section>
  );
}
