# Landing Page Implementation Guide: Product Transformation

This document specifies exactly what to change, remove, and add for each component.

---

## Component-by-Component Changes

### 1. HeroSection.tsx

**File:** `src/components/HeroSection.tsx`

#### REMOVE:
- Eyebrow text: "Sales & Operations Systems for Distributors"
- Headline part: "We Fix That."
- Subtext about "We build custom quoting portals..."
- Both CTAs (book call, see how it works)

#### CHANGE:
| Current | New |
|---------|-----|
| "Sales & Operations Systems for Distributors" | "The Ordering & Inventory Platform for Product Distributors" |
| "Your Dealers Still Order by Email and Phone. We Fix That." | "Your Dealers Still Order by Email and Phone." |
| "We build custom quoting portals, dealer ordering systems, and inventory dashboards for product distributors. No more chasing pricing in spreadsheets or fielding the same order status calls every morning." | "Give your dealers a modern ordering experience. They browse your catalog, see their pricing, and place orders — without a phone call. Your team stops chasing status updates and starts growing." |
| "Book a Strategy Call" | "Start Free Trial" |
| "See How It Works" | "Watch 2-Min Demo" |

#### ADD:
- Social proof bar below subtext: "Trusted by 50+ distributors • Processing $2M+ in monthly orders"
- Remove Cal.com integration from primary CTA (make it self-serve link)

---

### 2. Header.tsx

**File:** `src/components/Header.tsx`

#### CHANGE:
| Current | New |
|---------|-----|
| Navigation items (if any) | Products, Pricing, Customers, Resources |
| "Book a Call" CTA | "Start Free Trial" CTA |

#### ADD:
- "Login" link for existing customers

---

### 3. WhoWeWorkWith.tsx

**File:** `src/components/WhoWeWorkWith.tsx`

#### REMOVE:
- Entire component (or repurpose as social proof)

#### REPLACE WITH:
- New "SocialProofSection" showing customer logos
- Headline: "Trusted by Distributors Worldwide"
- Show 6-8 placeholder customer logos

---

### 4. ProblemsSection.tsx

**File:** `src/components/ProblemsSection.tsx`

#### KEEP:
- All 4 problems are good
- The descriptions are strong
- Keep the section header "Sound Familiar?"

#### MINOR CHANGES:
- Section header: "Sound Familiar?" → KEEP
- Subheader: Keep as-is
- No major changes needed - this section works

---

### 5. SolutionsSection.tsx

**File:** `src/components/SolutionsSection.tsx`

#### REMOVE:
- "Digital Storefront" foundation card (this is agency positioning)
- "What We Build" section header

#### CHANGE:
| Current | New |
|---------|-----|
| Section header: "What We Build" | "The NordLab Platform" |
| Subheader about "Every system we build connects..." | "One platform, four core modules. Everything your distribution business needs to run modern operations." |
| "Internal Operations Tools" | "Operations Dashboard" |

#### ADD:
- Each solution becomes a "Platform Module"
- Add feature bullets under each module
- Add "Available on all plans" badge

---

### 6. DashboardShowcase.tsx

**File:** `src/components/DashboardShowcase.tsx`

#### KEEP:
- All dashboard mockups are excellent
- Tab functionality is good
- Captions are good

#### CHANGE:
- Move this section UP in App.tsx (before pricing)
- No code changes needed, just reordering

---

### 7. ProcessSection.tsx

**File:** `src/components/ProcessSection.tsx`

#### REMOVE:
- Entire current process (Map → Design → Build → Improve)
- "How It Works" header (reuse for new section)

#### REPLACE WITH:
New 3-step onboarding process:
```
1. CONNECT YOUR DATA (Day 1)
   Upload your product catalog and dealer list. 
   We handle CSV, Excel, or direct ERP integration.

2. SET YOUR PRICING (Day 2)
   Define dealer tiers and discount levels.
   The system applies them automatically.

3. INVITE YOUR DEALERS (Day 3)
   Send login links. They start ordering immediately.
```

#### CHANGE:
- Section header: "How It Works" → KEEP
- Subheader: "You will know what is being built..." → "From signup to live in 72 hours. No calls required."

---

### 8. PricingSection.tsx

**File:** `src/components/PricingSection.tsx`

#### REMOVE:
- All current tier definitions
- Project-based pricing ($5K - $50K)
- Timeline references (2-3 weeks, 4-8 weeks)
- "Free 30-Minute Process Review" section at bottom
- All Cal.com booking buttons

#### REPLACE WITH:
New SaaS pricing tiers:

```
STARTER (FREE)
- Up to 5 dealers
- Basic dealer portal
- 100 SKUs
- Email support
- [Start Free]

GROWTH ($299/mo or $249/mo annual)
- Up to 25 dealers
- Full dealer portal
- Quoting system
- Inventory dashboard
- Priority email support
- [Start Free Trial]

PRO ($799/mo or $649/mo annual)
- Up to 100 dealers
- Everything in Growth
- Operations dashboard
- API access
- Phone support
- [Start Free Trial]

ENTERPRISE (Custom)
- Unlimited dealers
- Everything in Pro
- Dedicated success team
- Custom integrations
- SLA guarantee
- [Contact Sales]
```

#### ADD:
- "Most Popular" badge on Growth tier
- Annual discount callout (save 17%)
- "No credit card required" for free tier
- FAQ accordion below pricing

---

### 9. UseCasesSection.tsx

**File:** `src/components/UseCasesSection.tsx`

#### KEEP:
- All use cases are good
- Before/after format works well

#### MINOR CHANGES:
- Section header: "Real Scenarios" → "Customer Success Stories"
- Add company names/logos if possible (even placeholder)

---

### 10. WhyUsSection.tsx

**File:** `src/components/WhyUsSection.tsx`

#### REMOVE:
- "We Are Not a Generic Dev Shop" positioning
- "We only build business operations systems"
- "We build around your process, not ours"
- "You see working software in weeks, not months"
- "We stay with you as your operations grow"

#### REPLACE WITH:
New product-focused reasons:
```
WHY DISTRIBUTORS CHOOSE NORDLAB

✓ Purpose-Built for Distribution
  We only serve product distributors. Every feature exists
  because a distributor like you asked for it.

✓ 3 Days to Live, Not 6 Months
  No discovery calls. No custom development. Upload your
  catalog, set pricing, invite dealers. Done.

✓ Improves Automatically
  New features ship weekly. Every distributor benefits.
  Your platform gets better without you paying more.

✓ You Own Your Data
  Export everything anytime. Your catalog, orders, and
  dealers belong to you, not locked in our system.
```

#### CHANGE:
- Section header: "Why Work With Us" → "Why Distributors Choose NordLab"
- Subheader: "We Are Not a Generic Dev Shop" → "Built for Distributors, Not Developers"

---

### 11. TeamSection.tsx

**File:** `src/components/TeamSection.tsx`

#### REMOVE:
- Entire section from App.tsx

#### REASON:
Product companies sell the product, not the team. This section is agency positioning.

#### OPTIONAL:
Move to a separate "/about" page if needed, but remove from landing page.

---

### 12. CTASection.tsx

**File:** `src/components/CTASection.tsx`

#### REMOVE:
- Form with questions (product companies don't need this on landing page)
- Cal.com integration
- "Schedule a Strategy Call" CTA
- "Tell Us About Your Setup" button

#### REPLACE WITH:
Simple, product-focused CTA:
```
"Your Competitors Are Not Waiting for You to Catch Up"

Every week you run on spreadsheets and email orders is a week 
your dealers get used to someone else being easier to work with.

[Start Free Trial] [Watch Demo]

✓ Free for up to 5 dealers
✓ Setup in 15 minutes
✓ No credit card required
```

---

### 13. Footer.tsx

**File:** `src/components/Footer.tsx`

#### ADD:
- Product links: Features, Pricing, Integrations, API
- Company links: About, Blog, Careers
- Legal links: Privacy, Terms, Security
- Remove agency-focused language

---

### 14. App.tsx - Section Order

**File:** `src/App.tsx`

#### CHANGE ORDER:
```
CURRENT ORDER:                    NEW ORDER:
─────────────                     ──────────
1. Header                         1. Header
2. HeroSection                    2. HeroSection
3. WhoWeWorkWith                  3. SocialProofSection (new)
4. ProblemsSection                4. ProblemsSection
5. SolutionsSection               5. DashboardShowcase (moved up)
6. DashboardShowcase              6. SolutionsSection
7. ProcessSection                 7. ProcessSection (new onboarding)
8. PricingSection                 8. PricingSection (new SaaS)
9. UseCasesSection                9. UseCasesSection
10. WhyUsSection                  10. WhyUsSection (new copy)
11. TeamSection                   11. CTASection (new copy)
12. CTASection                    (TeamSection removed)
13. Footer                        12. Footer
```

---

## Summary: Files to Modify

| File | Action | Priority |
|------|--------|----------|
| `HeroSection.tsx` | Rewrite copy | HIGH |
| `PricingSection.tsx` | Complete rewrite | HIGH |
| `ProcessSection.tsx` | Complete rewrite | HIGH |
| `SolutionsSection.tsx` | Rewrite header + positioning | HIGH |
| `CTASection.tsx` | Simplify | HIGH |
| `WhyUsSection.tsx` | Rewrite reasons | MEDIUM |
| `WhoWeWorkWith.tsx` | Replace or remove | MEDIUM |
| `App.tsx` | Reorder sections | MEDIUM |
| `TeamSection.tsx` | Remove from App.tsx | LOW |
| `Footer.tsx` | Update links | LOW |
| `Header.tsx` | Minor updates | LOW |

---

## What NOT to Change

These sections work well and only need minor tweaks:
- `ProblemsSection.tsx` - Keep mostly as-is
- `UseCasesSection.tsx` - Keep as-is, maybe new header
- `DashboardShowcase.tsx` - Keep as-is, just reorder in App.tsx

---

## CTAs: Before vs After

| Location | Before | After |
|----------|--------|-------|
| Hero Primary | "Book a Strategy Call" | "Start Free Trial" |
| Hero Secondary | "See How It Works" | "Watch 2-Min Demo" |
| Pricing Bottom | "Book Your Free Review" | "Start Free Trial" |
| CTA Section | "Schedule a Strategy Call" | "Start Free Trial" |
| Header | (check current) | "Start Free Trial" |

---

## Self-Serve Flow

The new flow should be:

```
Visitor lands on page
    ↓
Reads product positioning
    ↓
Clicks "Start Free Trial"
    ↓
Signup page (email + company)
    ↓
Upload catalog (CSV/Excel)
    ↓
Add dealers (invite links)
    ↓
Platform is live
```

No sales calls. No "book a demo" as primary CTA.

---

## Implementation Checklist

### Phase 1 - Critical (Do First)
- [ ] HeroSection.tsx - New headline, subtext, CTAs
- [ ] PricingSection.tsx - SaaS pricing table
- [ ] ProcessSection.tsx - 3-step onboarding

### Phase 2 - Important
- [ ] SolutionsSection.tsx - Product positioning
- [ ] CTASection.tsx - Simplify, remove form
- [ ] App.tsx - Reorder sections, remove Team

### Phase 3 - Polish
- [ ] WhyUsSection.tsx - New reasons
- [ ] WhoWeWorkWith.tsx - Social proof or remove
- [ ] Header.tsx - Update navigation
- [ ] Footer.tsx - Update links

---

## Testing Checklist

After implementation, verify:
- [ ] All CTAs point to signup (not Cal.com)
- [ ] No "we build" language anywhere
- [ ] No project-based pricing visible
- [ ] No team section on landing page
- [ ] Pricing shows monthly/annual toggle
- [ ] Mobile responsive on all sections
- [ ] No broken links