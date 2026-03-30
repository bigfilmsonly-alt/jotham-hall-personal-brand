"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { ContactModal } from "@/components/landing/contact-modal";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ventures = [
  {
    name: "Success Upgrade",
    description: "AI-powered life operating system and productivity platform",
    url: "https://www.successupgrade.ai/",
    status: "Active",
  },
  {
    name: "Big Films Only",
    description: "Premium film production and creative content studio",
    url: "#",
    status: "Active",
  },
  {
    name: "Say It Build It",
    description: "Vibe coding platform for AI-assisted app development",
    url: "#",
    status: "Active",
  },
  {
    name: "SaaS Agency",
    description: "Full-service digital agency for SaaS companies",
    url: "#",
    status: "Active",
  },
  {
    name: "Electrohydration",
    description: "Premium alkaline water and health brand",
    url: "#",
    status: "Active",
  },
];

const expertise = [
  "AI Automation Architecture",
  "Revenue System Design",
  "Business Systems Consulting",
  "AI Agent Implementation",
  "Vibe Coding Development",
  "Founder Operating Systems",
  "Startup Automation",
  "Business Transformation",
];

const mediaAppearances = [
  { title: "The Future of AI in Business", type: "Podcast" },
  { title: "Building Systems That Scale", type: "Speaking" },
  { title: "Vibe Coding Revolution", type: "Article" },
  { title: "Multi-Venture Founder Playbook", type: "Interview" },
];

const caseStudies = [
  { title: "AI Revenue System", result: "340% increase in qualified leads" },
  { title: "Automation Implementation", result: "60% reduction in overhead" },
  { title: "Lead Generation System", result: "2.5x conversion improvement" },
  { title: "Multi-Business OS", result: "6 ventures, 1 operating system" },
];

export default function JothamHallPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center justify-center lg:justify-start gap-3 text-sm font-mono text-muted-foreground mb-6">
                <span className="hidden lg:block w-8 h-px bg-foreground/30" />
                Entity Profile
              </span>
              <h1
                className={`text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-8 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Jotham Hall
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Strategic Consultant, Systems Architect, and Multi-Venture Founder. 
                I build AI-powered infrastructure, revenue systems, and operational frameworks 
                that help founders scale without burnout.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Button 
                  size="lg"
                  onClick={() => setIsContactOpen(true)}
                  className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 rounded-none group"
                >
                  Work With Jotham
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
                <Link href="/about">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 rounded-none border-foreground/20"
                  >
                    Full Biography
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 border border-foreground/10 text-center">
                <div className="text-4xl font-display mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Active Ventures</div>
              </div>
              <div className="p-6 border border-foreground/10 text-center">
                <div className="text-4xl font-display mb-2">100s</div>
                <div className="text-sm text-muted-foreground">Clients Served</div>
              </div>
              <div className="p-6 border border-foreground/10 text-center">
                <div className="text-4xl font-display mb-2">7-Fig</div>
                <div className="text-sm text-muted-foreground">Systems Built</div>
              </div>
              <div className="p-6 border border-foreground/10 text-center">
                <div className="text-4xl font-display mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Automated Ops</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left mb-12">
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">Areas of Expertise</h2>
            <p className="text-muted-foreground">Specialized consulting and implementation services</p>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {expertise.map((item) => (
              <span key={item} className="px-4 py-2 border border-foreground/20 text-sm hover:bg-foreground/5 transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left mb-12">
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">Ventures</h2>
            <p className="text-muted-foreground">Companies and brands founded by Jotham Hall</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ventures.map((venture) => (
              <a 
                key={venture.name}
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 border border-foreground/10 hover:border-foreground/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-display">{venture.name}</h3>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">{venture.description}</p>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {venture.status}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left mb-12">
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">Case Studies</h2>
            <p className="text-muted-foreground">Results from consulting engagements</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <div key={study.title} className="p-8 border border-foreground/10">
                <h3 className="text-xl font-display mb-3">{study.title}</h3>
                <p className="text-2xl text-foreground font-display">{study.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10 bg-foreground/[0.02]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center lg:text-left mb-12">
            <h2 className="text-3xl sm:text-4xl font-display tracking-tight mb-4">Media & Speaking</h2>
            <p className="text-muted-foreground">Podcasts, interviews, and speaking engagements</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaAppearances.map((item) => (
              <div key={item.title} className="p-6 border border-foreground/10">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{item.type}</span>
                <h3 className="text-lg font-display mt-2">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-8">
            Work With Jotham Hall
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Ready to build systems that scale? Book a strategy call to discuss your vision.
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
