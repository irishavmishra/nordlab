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
          backgroundSize: "80px 80px",
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
            The Ordering & Inventory Platform for Product Distributors
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
        </h1>

        {/* Divider */}
        <div className="my-8 md:my-12 anim-fade-in anim-delay-3">
          <div className="editorial-rule max-w-md mx-auto" />
        </div>

        {/* Subtext */}
        <p className="text-warm-gray text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed anim-fade-up anim-delay-4">
          Give your dealers a modern ordering experience. They browse your catalog, see their pricing, 
          and place orders — without a phone call. Your team stops chasing status updates and starts growing.
        </p>

        {/* Social proof bar */}
        <div className="mt-6 anim-fade-up anim-delay-4">
          <p className="text-warm-gray/50 text-sm">
            Trusted by <span className="text-copper font-medium">50+ distributors</span> • Processing <span className="text-copper font-medium">$2M+</span> in monthly orders
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-10 md:mt-14 anim-fade-up anim-delay-5">
          <a
            href="#pricing"
            className="btn-copper text-obsidian px-8 sm:px-10 py-4 text-base font-medium tracking-wide inline-flex items-center justify-center gap-3"
          >
            Start Free Trial
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#demo"
            className="btn-ghost text-cream px-8 sm:px-10 py-4 text-base font-medium tracking-wide inline-flex items-center justify-center gap-3"
          >
            Watch 2-Min Demo
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-warm-gray/30 text-xs anim-fade-up anim-delay-6">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free for up to 5 dealers
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Setup in 15 minutes
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-500/60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No credit card required
          </span>
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