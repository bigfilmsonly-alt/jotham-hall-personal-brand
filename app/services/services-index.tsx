"use client";

import { Navigation } from "@/components/landing/navigation";
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
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
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
      <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Not Sure Where to Start?
          </h2>
          <p className="text-xl text-background/70 mb-12 max-w-2xl mx-auto">
            Book a complimentary strategy call to discuss your challenges 
            and discover which services can help you achieve your goals.
          </p>
          <Button 
            size="lg"
            onClick={() => setIsContactOpen(true)}
            className="bg-background hover:bg-background/90 text-foreground px-12 h-16 text-lg rounded-none group"
          >
            Book a Strategy Call
            <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      <FooterSection />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
