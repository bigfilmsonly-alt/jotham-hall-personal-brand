"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { Button } from "@/components/ui/button";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface Feature {
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedService {
  title: string;
  href: string;
}

interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  benefits?: string[];
  process?: ProcessStep[];
  features?: Feature[];
  idealFor?: string[];
  investment?: string;
  faqs?: FAQ[];
  relatedServices?: RelatedService[];
  ctaText?: string;
  ctaHref?: string;
}

export function ServicePageTemplate({
  title,
  subtitle,
  description,
  benefits,
  process,
  features,
  idealFor,
  investment,
  faqs,
  relatedServices,
  ctaText = "Start a Conversation",
  ctaHref = "/contact",
}: ServicePageTemplateProps) {
  const [isVisible] = useState(true);

  // Safely handle all arrays - ensure they are arrays before mapping
  const safeBenefits = Array.isArray(benefits) ? benefits : [];
  const safeProcess = Array.isArray(process) ? process : [];
  const safeFeatures = Array.isArray(features) ? features : [];
  const safeIdealFor = Array.isArray(idealFor) ? idealFor : [];
  const safeFaqs = Array.isArray(faqs) ? faqs : [];
  const safeRelatedServices = Array.isArray(relatedServices) ? relatedServices : [];

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            className={`max-w-4xl transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              All Services
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-display mb-6">
              {subtitle}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {safeBenefits.length > 0 && (
        <section className="py-20 lg:py-32 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center lg:text-left mb-16">
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">Key Benefits</h2>
              <p className="text-muted-foreground">Tangible outcomes from this engagement</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safeBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-6 border border-foreground/10">
                  <Check className="w-5 h-5 text-foreground shrink-0 mt-1" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      {safeProcess.length > 0 && (
        <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center lg:text-left mb-16">
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">The Process</h2>
              <p className="text-background/60">How we work together</p>
            </div>
            <div className="space-y-8">
              {safeProcess.map((item, index) => (
                <div key={index} className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12 py-8 border-b border-background/10">
                  <span className="font-display text-4xl text-background/30">{item.step}</span>
                  <div>
                    <h3 className="text-2xl font-display mb-3">{item.title}</h3>
                    <p className="text-background/70 leading-relaxed max-w-2xl">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {safeFeatures.length > 0 && (
        <section className="py-20 lg:py-32 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center lg:text-left mb-16">
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">What is Included</h2>
              <p className="text-muted-foreground">Comprehensive service deliverables</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {safeFeatures.map((feature, index) => (
                <div key={index} className="p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
                  <h3 className="text-xl font-display mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {safeFaqs.length > 0 && (
        <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center lg:text-left mb-16">
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Common questions about this service</p>
            </div>
            <div className="max-w-3xl space-y-8">
              {safeFaqs.map((faq, index) => (
                <div key={index} className="border-b border-foreground/10 pb-8">
                  <h3 className="text-xl font-display mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ideal For Section */}
      {safeIdealFor.length > 0 && (
        <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center lg:text-left mb-16">
              <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">Ideal For</h2>
              <p className="text-muted-foreground">This service is perfect for</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {safeIdealFor.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 border border-foreground/10">
                  <Check className="w-5 h-5 text-foreground shrink-0 mt-1" />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
            {investment && (
              <div className="mt-12 p-8 border border-foreground/20 text-center">
                <span className="text-muted-foreground">Investment</span>
                <p className="text-2xl font-display mt-2">{investment}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Services */}
      {safeRelatedServices.length > 0 && (
        <section className="py-20 lg:py-32 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="text-center lg:text-left mb-12">
              <h2 className="text-2xl font-display tracking-tight mb-4">Related Services</h2>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {safeRelatedServices.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="px-6 py-3 border border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5 transition-all"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Ready to get started?
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-foreground hover:bg-foreground/90 text-background px-12 h-14 text-base rounded-none"
          >
            <Link href={ctaHref}>{ctaText}</Link>
          </Button>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
