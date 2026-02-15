export function CTASection() {
  return (
    <section id="get-started" className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-copper/20" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-copper/20" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
          Get Started Today
        </span>

        <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 mb-6">
          Your Competitors Are Not <br className="hidden sm:block" />
          <span className="serif-italic copper-text">Waiting for You to Catch Up</span>
        </h2>

        <p className="text-warm-gray/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          Every week you run on spreadsheets and email orders is a week your dealers get used to
          someone else being easier to work with. Start your free trial today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <a
            href="#pricing"
            className="btn-copper text-obsidian px-10 py-4 text-base font-medium tracking-wide inline-flex items-center justify-center gap-3"
          >
            Start Free Trial
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#demo"
            className="btn-ghost px-10 py-4 text-base font-medium tracking-wide inline-flex items-center justify-center gap-3"
          >
            Watch 2-Min Demo
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-warm-gray/30 text-sm">
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
    </section>
  );
}