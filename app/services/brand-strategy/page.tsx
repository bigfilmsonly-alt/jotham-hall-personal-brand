"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Sparkles, Megaphone, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/landing/contact-modal";
import Link from "next/link";

const features = [
  {
    icon: Sparkles,
    title: "Brand Positioning",
    description: "Define your unique market position. Craft messaging that resonates with high-value clients and differentiates you from competitors."
  },
  {
    icon: Megaphone,
    title: "Content Strategy",
    description: "Build authority through strategic content. Thought leadership, social presence, and content systems that attract your ideal audience."
  },
  {
    icon: Palette,
    title: "Visual Identity",
    description: "Premium visual systems that communicate trust and expertise. From websites to pitch decks to social assets."
  },
  {
    icon: Globe,
    title: "Digital Presence",
    description: "Omnichannel brand presence that builds credibility. Website, social, email, and community working together."
  }
];

const results = [
  { metric: "500%", label: "Increase in inbound leads" },
  { metric: "3x", label: "Higher perceived value" },
  { metric: "80%", label: "Reduction in sales objections" },
  { metric: "$50K+", label: "Average deal size increase" }
];

export default function BrandStrategyPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Button onClick={() => setIsContactOpen(true)} className="rounded-full">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto text-center lg:text-left">
          <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="hidden lg:block w-8 h-px bg-foreground/30" />
            Service
          </span>
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Brand
            <br />
            <span className="text-muted-foreground">Strategy</span>
          </h1>
          <p className={`text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-12 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Build a brand that commands premium pricing. Positioning, messaging, and visual identity designed to attract high-value clients who pay without negotiating.
          </p>
          <div className={`flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <Button size="lg" onClick={() => setIsContactOpen(true)} className="bg-foreground text-background rounded-full px-8 h-14 text-base group">
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {results.map((item, index) => (
              <div key={index} className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-display mb-2">{item.metric}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-16 text-center lg:text-left">
            What I Build
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(features ?? []).map((feature, index) => (
              <div key={index} className="p-8 border border-foreground/10 hover:border-foreground/20 transition-colors text-center lg:text-left">
                <feature.icon className="w-8 h-8 mb-6 mx-auto lg:mx-0" />
                <h3 className="text-xl font-display mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-8">
            Ready to elevate your brand?
          </h2>
          <p className="text-xl text-background/70 mb-12 max-w-xl mx-auto">
            Let us build a brand that attracts clients who value what you do.
          </p>
          <Button size="lg" onClick={() => setIsContactOpen(true)} variant="outline" className="rounded-full px-8 h-14 text-base border-background/20 text-background hover:bg-background/10 group">
            Start the Conversation
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
