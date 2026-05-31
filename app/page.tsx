// Cache bust: v3 - Force full rebuild
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { InsightsSection } from "@/components/landing/insights-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { NetworkLogosSection } from "@/components/landing/network-logos-section";
import { VideoSection } from "@/components/landing/video-section";
import { LeadMagnetSection } from "@/components/landing/lead-magnet-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ExitIntentPopup } from "@/components/exit-intent-popup";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <ScrollToTop />
      <ExitIntentPopup />
      <HeroSection />
      <NetworkLogosSection />
      <VideoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <MetricsSection />
      <IntegrationsSection />
      <SecuritySection />
      <DevelopersSection />
      <InsightsSection />
      <TestimonialsSection />
      <LeadMagnetSection />
      <PricingSection />
      <CtaSection />
      <FooterSection />
      {/* Spacer for tab bar */}
      <div className="h-[4.5rem]" />
    </main>
  );
}
