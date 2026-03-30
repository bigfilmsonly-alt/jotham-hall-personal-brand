"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/landing/contact-modal";

interface CaseStudyProps {
  title: string;
  client: string;
  industry: string;
  duration: string;
  challenge: string;
  solution?: string[];
  results?: { metric: string; description: string }[];
  testimonial?: { quote: string; name: string; role: string };
  services?: string[];
}

export function CaseStudyTemplate({
  title,
  client,
  industry,
  duration,
  challenge,
  solution = [],
  results = [],
  testimonial,
  services = [],
}: CaseStudyProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Ensure arrays are properly initialized
  const safeSolution = solution ?? [];
  const safeResults = results ?? [];
  const safeServices = services ?? [];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-display">Jotham Hall</Link>
            <Link href="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              All Case Studies
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-4xl mx-auto text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider border border-foreground/20">
                  {industry}
                </span>
                <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider border border-foreground/20">
                  {duration}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-6">
                {title}
              </h1>
              <p className="text-xl text-muted-foreground">
                Client: {client}
              </p>
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">The Challenge</span>
              </div>
              <div className="lg:col-span-2">
                <p className="text-2xl lg:text-3xl font-display leading-relaxed">
                  {challenge}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 bg-foreground/[0.02]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">The Solution</span>
              </div>
              <div className="lg:col-span-2 space-y-6">
                {safeSolution.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-sm font-mono text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-lg text-foreground/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto">
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider block mb-12 text-center lg:text-left">
              The Results
            </span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {safeResults.map((result, index) => (
                <div key={index} className="p-8 border border-foreground/10 text-center lg:text-left">
                  <div className="text-4xl lg:text-5xl font-display mb-3">{result.metric}</div>
                  <p className="text-muted-foreground">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {testimonial && (
          <section className="py-20 lg:py-32 px-6 lg:px-12 bg-foreground text-background">
            <div className="max-w-[1400px] mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <Quote className="w-12 h-12 mx-auto mb-8 opacity-30" />
                <blockquote className="text-2xl lg:text-4xl font-display leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-background/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Services Used */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Services Provided</span>
              </div>
              <div className="lg:col-span-2 flex flex-wrap gap-3">
                {safeServices.map((service, index) => (
                  <span key={index} className="px-4 py-2 border border-foreground/20 text-sm">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 bg-foreground/[0.02]">
          <div className="max-w-[1400px] mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-display mb-6">Ready for similar results?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss how I can help transform your business with the same systematic approach.
            </p>
            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-none"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
