import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { WhoWeWorkWith } from "./components/WhoWeWorkWith";
import { ProblemsSection } from "./components/ProblemsSection";
import { SolutionsSection } from "./components/SolutionsSection";
import { DashboardShowcase } from "./components/DashboardShowcase";
import { ProcessSection } from "./components/ProcessSection";
import { PricingSection } from "./components/PricingSection";
import { UseCasesSection } from "./components/UseCasesSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { TeamSection } from "./components/TeamSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { CalComIntegration } from "./components/CalComIntegration";

export function App() {
  return (
    <div className="min-h-screen bg-obsidian text-cream relative">
      <CalComIntegration />
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Decorative top border */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-copper to-transparent z-50" aria-hidden="true" />

      <Header />
      <main>
        <HeroSection />
        <WhoWeWorkWith />
        <ProblemsSection />
        <SolutionsSection />
        <DashboardShowcase />
        <ProcessSection />
        <PricingSection />
        <UseCasesSection />
        <WhyUsSection />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
