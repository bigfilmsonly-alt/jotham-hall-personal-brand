"use client";

import { useState, useEffect, useRef } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactModal } from "@/components/landing/contact-modal";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const credentials = [
  "Strategic Consultant",
  "Systems Architect", 
  "AI Automation Expert",
  "Revenue Engineer",
  "Multi-Venture Founder",
];

const philosophy = [
  {
    title: "Systems Over Schedules",
    description: "I do not sell motivation or mindset. I build machines. Automated systems that run without you, scale without limits, and compound over time."
  },
  {
    title: "Execution Over Theory",
    description: "Every framework I teach comes from building real businesses. Not case studies from MBA programs. Real revenue. Real operations. Real results."
  },
  {
    title: "Infrastructure Over Hustle",
    description: "The goal is not to work harder. The goal is to build infrastructure so good that growth becomes inevitable and burnout becomes impossible."
  },
];

const timeline = [
  { year: "2019", event: "Started first digital agency" },
  { year: "2020", event: "Built first automated revenue system" },
  { year: "2021", event: "Scaled to multiple six figures" },
  { year: "2022", event: "Launched Success Upgrade ecosystem" },
  { year: "2023", event: "Pioneered vibe coding methodology" },
  { year: "2024", event: "Built AI-first business infrastructure" },
  { year: "2025", event: "Consulting for 7-figure founders" },
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={sectionRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              About
            </span>
            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-8 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Jotham Hall
              <br />
              <span className="text-muted-foreground">Systems Architect.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-8">
              I help founders escape the chaos of scaling by building AI-powered systems, 
              automated revenue engines, and operational infrastructure that runs without them.
            </p>
            
            {/* Credentials */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-12">
              {credentials.map((cred) => (
                <span key={cred} className="px-4 py-2 border border-foreground/20 text-sm font-mono">
                  {cred}
                </span>
              ))}
            </div>

            <Button 
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-none group"
            >
              Work With Me
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left mb-16">
            <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight">
              How I Think About Building
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.map((item, index) => (
              <div key={index} className="p-8 border border-foreground/10 hover:border-foreground/20 transition-colors">
                <h3 className="text-xl font-display mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left mb-16">
            <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="hidden lg:block w-8 h-px bg-foreground/30" />
              Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight">
              The Path to Here
            </h2>
          </div>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center gap-6 py-4 border-b border-foreground/10">
                <span className="font-mono text-2xl text-muted-foreground w-20">{item.year}</span>
                <span className="text-lg">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Ready to Build Your System?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Let us architect the infrastructure that lets you scale without the chaos.
          </p>
          <Button 
            size="lg"
            onClick={() => setIsContactOpen(true)}
            className="bg-foreground hover:bg-foreground/90 text-background px-12 h-16 text-lg rounded-none group"
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
