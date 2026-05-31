// Cache bust: v4 - Streamlined funnel
import { HeroSection } from "@/components/landing/hero-section";
import { NetworkLogosSection } from "@/components/landing/network-logos-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { QuizSection } from "@/components/landing/quiz-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
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
      <FeaturesSection />
      <QuizSection />
      <MetricsSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
      <FooterSection />
      {/* Spacer for tab bar */}
      <div className="h-[4.5rem]" />
    </main>
  );
}
