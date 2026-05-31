"use client";

import { FooterSection } from "@/components/landing/footer-section";
import { ContactModal } from "@/components/landing/contact-modal";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const services = [
  {
    title: "Strategic Consulting",
    description: "High-level strategic guidance to identify growth opportunities and navigate complex business challenges.",
    href: "/services/strategic-consulting",
    category: "Advisory",
  },
  {
    title: "Systems Architecture",
    description: "Design and implementation of scalable business systems that eliminate bottlenecks and enable growth.",
    href: "/services/systems-architecture",
    category: "Systems",
  },
  {
    title: "AI Automation",
    description: "Leverage AI to automate repetitive tasks, enhance decision-making, and scale operations efficiently.",
    href: "/services/ai-automation",
    category: "Technology",
  },
  {
    title: "Automation",
    description: "Streamline workflows and eliminate manual processes to free up time for high-value activities.",
    href: "/services/automation",
    category: "Technology",
  },
  {
    title: "Personal Branding",
    description: "Build a powerful personal brand that attracts opportunities, clients, and partnerships.",
    href: "/services/personal-branding",
    category: "Brand",
  },
  {
    title: "Content Strategy",
    description: "Develop a content ecosystem that establishes thought leadership and drives organic growth.",
    href: "/services/content-strategy",
    category: "Brand",
  },
  {
    title: "Business Development",
    description: "Strategic partnerships, revenue optimization, and market expansion strategies.",
    href: "/services/business-development",
    category: "Growth",
  },
  {
    title: "Revenue Systems",
    description: "Build predictable revenue engines with optimized sales funnels and conversion systems.",
    href: "/services/revenue-systems",
    category: "Growth",
  },
  {
    title: "Brand Strategy",
    description: "Define your market position, messaging, and visual identity to stand out from competitors.",
    href: "/services/brand-strategy",
    category: "Brand",
  },
  {
    title: "Executive Advisory",
    description: "C-suite level guidance for critical decisions, board presentations, and strategic pivots.",
    href: "/services/executive-advisory",
    category: "Advisory",
  },
  {
    title: "Fractional COO",
    description: "Part-time operational leadership to build teams, processes, and infrastructure for scale.",
    href: "/services/fractional-coo",
    category: "Advisory",
  },
  {
    title: "Speaking",
    description: "Keynote speaking on AI, systems thinking, entrepreneurship, and personal development.",
    href: "/services/speaking",
    category: "Speaking",
  },
];

export function ServicesIndex() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl text-center lg:text-left mx-auto lg:mx-0">
            <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Transform Your
              <br />
              <span className="text-muted-foreground">Business</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              Strategic consulting services designed to help founders and businesses 
              build systems, automate operations, and scale with confidence.
            </p>
            
            <Button 
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-none group"
            >
              Book a Strategy Call
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group p-8 border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/[0.02] transition-all duration-300"
              >
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {service.category}
                </span>
                <h3 className="text-xl font-display mt-3 mb-3 group-hover:text-foreground transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="text-xs font-mono text-yellow-500/80 uppercase tracking-widest mb-3">Limited Availability</p>
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-3">Ready to work together?</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">Book a free strategy call. No pitch. No pressure. Just clarity on what your business needs.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
            <a href="/contact" className="flex-1 py-3.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2">Book Free Strategy Call</a>
            <a href="tel:+15106809100" className="flex-1 py-3.5 border border-foreground/20 text-sm font-medium hover:bg-foreground/5 transition-colors flex items-center justify-center">Call (510) 680-9100</a>
          </div>
        </div>
      </section>
      {/* Tab bar spacer */}
      <div className="h-[4.5rem]" />

      <FooterSection />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
