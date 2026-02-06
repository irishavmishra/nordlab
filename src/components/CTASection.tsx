import { useState, useRef, useEffect } from 'react';

const ORDER_METHODS = [
  'Phone calls',
  'Email',
  'WhatsApp or text',
  'In-person visits',
  'Fax',
  'Existing portal or software',
];

const DEALER_RANGES = [
  '1 - 20',
  '20 - 50',
  '50 - 150',
  '150 - 500',
  '500+',
];

const HEADACHES = [
  'Quoting takes too long',
  'Dealers keep calling for order status',
  'No clear view of inventory',
  'Too much manual data entry',
  'Pricing errors and inconsistencies',
  'Hard to onboard new dealers',
  'Other',
];

export function CTASection() {
  const [formOpen, setFormOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const formContentRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState(0);

  const [formData, setFormData] = useState({
    product: '',
    dealerRange: '',
    orderMethods: [] as string[],
    headaches: [] as string[],
    otherHeadache: '',
    email: '',
    name: '',
    company: '',
  });

  useEffect(() => {
    if (formContentRef.current) {
      setFormHeight(formContentRef.current.scrollHeight);
    }
  }, [formOpen, formData.headaches]);

  useEffect(() => {
    if (formOpen && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [formOpen]);

  const toggleOrderMethod = (method: string) => {
    setFormData(prev => ({
      ...prev,
      orderMethods: prev.orderMethods.includes(method)
        ? prev.orderMethods.filter(m => m !== method)
        : [...prev.orderMethods, method],
    }));
  };

  const toggleHeadache = (h: string) => {
    setFormData(prev => ({
      ...prev,
      headaches: prev.headaches.includes(h)
        ? prev.headaches.filter(x => x !== h)
        : [...prev.headaches, h],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const isValid = formData.product.trim() && formData.dealerRange && formData.email.trim();

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-obsidian overflow-hidden">
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-copper/20" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-copper/20" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <span className="text-copper text-sm tracking-[0.25em] uppercase font-medium">
          Let's Talk
        </span>

        <h2 className="serif-display text-cream text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-6 mb-6">
          Your Competitors Are Not <br className="hidden sm:block" />
          <span className="serif-italic copper-text">Waiting for You to Catch Up</span>
        </h2>

        <p className="text-warm-gray/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          Every week you run on spreadsheets and email orders is a week your dealers get used to
          someone else being easier to work with. A 30-minute call is enough for us to show you
          where the biggest wins are.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-copper text-obsidian px-10 py-4 text-base font-medium tracking-wide inline-flex items-center justify-center gap-3"
          >
            Schedule a Strategy Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <button
            onClick={() => setFormOpen(!formOpen)}
            className={`btn-ghost px-10 py-4 text-base font-medium tracking-wide inline-flex items-center justify-center gap-3 transition-all duration-300 ${
              formOpen
                ? 'text-copper border-copper/60'
                : 'text-cream'
            }`}
          >
            {formOpen ? (
              <>
                Close Form
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </>
            ) : (
              <>
                Tell Us About Your Setup
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Trust notes */}
        {!formOpen && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-warm-gray/30 text-xs tracking-wide">
            <span>No commitment required</span>
            <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
            <span>30 minutes</span>
            <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
            <span>We will map your biggest bottleneck live</span>
          </div>
        )}
      </div>

      {/* Inline Expanding Form */}
      <div
        ref={formRef}
        className="relative z-10 overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: formOpen ? `${formHeight + 80}px` : '0px',
          opacity: formOpen ? 1 : 0,
        }}
      >
        <div ref={formContentRef} className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-4">

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-warm-gray/10" />
            <span className="text-warm-gray/30 text-xs tracking-[0.2em] uppercase">2-Minute Assessment</span>
            <div className="flex-1 h-px bg-warm-gray/10" />
          </div>

          {formSubmitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-copper/10 border border-copper/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-copper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="serif-display text-cream text-2xl sm:text-3xl mb-4">
                Got it. We will be in touch.
              </h3>
              <p className="text-warm-gray/50 text-base max-w-md mx-auto leading-relaxed">
                We will review your setup and reply within 24 hours with specific ideas
                for your business. No generic template - actual recommendations based on what you told us.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Question 1 */}
              <div className="text-left">
                <label htmlFor="q-product" className="flex items-baseline gap-3 mb-3">
                  <span className="text-copper/40 text-xs font-mono tracking-wider">01</span>
                  <span className="text-cream text-base font-medium tracking-wide">
                    What does your company distribute?
                  </span>
                </label>
                <input
                  id="q-product"
                  type="text"
                  placeholder="e.g. Kitchen cabinets, marble slabs, plumbing fixtures"
                  value={formData.product}
                  onChange={e => setFormData(prev => ({ ...prev, product: e.target.value }))}
                  className="w-full bg-charcoal/50 border border-warm-gray/10 rounded px-4 py-3.5 text-cream text-sm placeholder:text-warm-gray/25 focus:outline-none focus:border-copper/40 focus:bg-charcoal/70 transition-all duration-200 tracking-wide"
                />
              </div>

              {/* Question 2 */}
              <div className="text-left" role="radiogroup" aria-labelledby="q-dealers-label">
                <div id="q-dealers-label" className="flex items-baseline gap-3 mb-3">
                  <span className="text-copper/40 text-xs font-mono tracking-wider">02</span>
                  <span className="text-cream text-base font-medium tracking-wide">
                    How many dealers or contractors do you sell to?
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {DEALER_RANGES.map(range => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, dealerRange: range }))}
                      className={`px-3 py-2.5 text-sm rounded border transition-all duration-200 tracking-wide ${
                        formData.dealerRange === range
                          ? 'bg-copper/15 border-copper/50 text-copper'
                          : 'bg-charcoal/30 border-warm-gray/10 text-warm-gray/40 hover:border-warm-gray/25 hover:text-warm-gray/60'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="text-left" role="group" aria-labelledby="q-methods-label">
                <div id="q-methods-label" className="flex items-baseline gap-3 mb-3">
                  <span className="text-copper/40 text-xs font-mono tracking-wider">03</span>
                  <span className="text-cream text-base font-medium tracking-wide">
                    How do dealers currently place orders?
                  </span>
                </div>
                <p className="text-warm-gray/30 text-xs mb-3 ml-7 tracking-wide">Select all that apply</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ORDER_METHODS.map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => toggleOrderMethod(method)}
                      className={`px-3 py-2.5 text-sm rounded border transition-all duration-200 text-left tracking-wide ${
                        formData.orderMethods.includes(method)
                          ? 'bg-copper/15 border-copper/50 text-copper'
                          : 'bg-charcoal/30 border-warm-gray/10 text-warm-gray/40 hover:border-warm-gray/25 hover:text-warm-gray/60'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div className="text-left" role="group" aria-labelledby="q-headaches-label">
                <div id="q-headaches-label" className="flex items-baseline gap-3 mb-3">
                  <span className="text-copper/40 text-xs font-mono tracking-wider">04</span>
                  <span className="text-cream text-base font-medium tracking-wide">
                    What is your biggest operational headache right now?
                  </span>
                </div>
                <p className="text-warm-gray/30 text-xs mb-3 ml-7 tracking-wide">Select all that apply</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {HEADACHES.map(h => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => toggleHeadache(h)}
                      className={`px-3 py-2.5 text-sm rounded border transition-all duration-200 text-left tracking-wide ${
                        formData.headaches.includes(h)
                          ? 'bg-copper/15 border-copper/50 text-copper'
                          : 'bg-charcoal/30 border-warm-gray/10 text-warm-gray/40 hover:border-warm-gray/25 hover:text-warm-gray/60'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
                {formData.headaches.includes('Other') && (
                  <input
                    type="text"
                    placeholder="Tell us what's keeping you up at night"
                    value={formData.otherHeadache}
                    onChange={e => setFormData(prev => ({ ...prev, otherHeadache: e.target.value }))}
                    className="w-full mt-3 bg-charcoal/50 border border-warm-gray/10 rounded px-4 py-3.5 text-cream text-sm placeholder:text-warm-gray/25 focus:outline-none focus:border-copper/40 focus:bg-charcoal/70 transition-all duration-200 tracking-wide"
                  />
                )}
              </div>

              {/* Contact Info */}
              <div className="text-left">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-warm-gray/10" />
                  <span className="text-warm-gray/30 text-xs tracking-[0.2em] uppercase">Your Details</span>
                  <div className="flex-1 h-px bg-warm-gray/10" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-warm-gray/40 text-xs tracking-wide mb-1.5 block">Your name</label>
                    <input
                      type="text"
                      placeholder="John Mitchell"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-charcoal/50 border border-warm-gray/10 rounded px-4 py-3.5 text-cream text-sm placeholder:text-warm-gray/25 focus:outline-none focus:border-copper/40 focus:bg-charcoal/70 transition-all duration-200 tracking-wide"
                    />
                  </div>
                  <div>
                    <label className="text-warm-gray/40 text-xs tracking-wide mb-1.5 block">Company name</label>
                    <input
                      type="text"
                      placeholder="Midwest Cabinet Supply"
                      value={formData.company}
                      onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full bg-charcoal/50 border border-warm-gray/10 rounded px-4 py-3.5 text-cream text-sm placeholder:text-warm-gray/25 focus:outline-none focus:border-copper/40 focus:bg-charcoal/70 transition-all duration-200 tracking-wide"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-warm-gray/40 text-xs tracking-wide mb-1.5 block">
                    Email address <span className="text-copper/40">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@midwestcabinets.com"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-charcoal/50 border border-warm-gray/10 rounded px-4 py-3.5 text-cream text-sm placeholder:text-warm-gray/25 focus:outline-none focus:border-copper/40 focus:bg-charcoal/70 transition-all duration-200 tracking-wide"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full py-4 rounded text-base font-medium tracking-wide transition-all duration-300 ${
                    isValid
                      ? 'btn-copper text-obsidian cursor-pointer'
                      : 'bg-charcoal/50 text-warm-gray/20 border border-warm-gray/10 cursor-not-allowed'
                  }`}
                >
                  Send My Assessment
                </button>
                <p className="text-warm-gray/25 text-xs mt-4 text-center tracking-wide">
                  We reply within 24 hours with specific ideas for your business. Not a sales pitch - actual recommendations.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
