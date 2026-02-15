import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProblemsSection } from "@/components/ProblemsSection";
import { DashboardShowcase } from "@/components/DashboardShowcase";
import { SolutionsSection } from "@/components/SolutionsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { PricingSection } from "@/components/PricingSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-obsidian text-cream relative">
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Decorative top border */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-copper to-transparent z-50" aria-hidden="true" />

      <Header />
      <main>
        <HeroSection />
        <ProblemsSection />
        <DashboardShowcase />
        <SolutionsSection />
        <ProcessSection />
        <PricingSection />
        <UseCasesSection />
        <WhyUsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}