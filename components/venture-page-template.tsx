"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/landing/contact-modal";

interface VentureProps {
  name: string;
  tagline: string;
  description: string;
  status: string;
  year: string;
  website?: string;
  features?: string[];
  impact?: { metric: string; label: string }[];
  role: string;
}

export function VenturePageTemplate({
  name,
  tagline,
  description,
  status,
  year,
  website,
  features = [],
  impact = [],
  role,
}: VentureProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Ensure arrays are properly initialized
  const safeFeatures = features ?? [];
  const safeImpact = impact ?? [];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-display">Jotham Hall</Link>
            <Link href="/ventures" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              All Ventures
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <div className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider border border-foreground/20">
                  {status}
                </span>
                <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider border border-foreground/20">
                  Est. {year}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-6">
                {name}
              </h1>
              <p className="text-2xl text-muted-foreground mb-8">
                {tagline}
              </p>
              {website && (
                <Button
                  asChild
                  size="lg"
                  className="bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-none group mt-4"
                >
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit {name}
                    <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">About</span>
              </div>
              <div className="lg:col-span-2">
                <p className="text-xl lg:text-2xl leading-relaxed text-foreground/80">
                  {description}
                </p>
                <p className="mt-8 text-muted-foreground">
                  <span className="font-medium text-foreground">My Role:</span> {role}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 bg-foreground/[0.02]">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              <div>
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Key Features</span>
              </div>
              <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                {safeFeatures.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="text-sm font-mono text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-foreground/80">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto">
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider block mb-12 text-center lg:text-left">
              Impact
            </span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {safeImpact.map((item, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-4xl lg:text-5xl font-display mb-2">{item.metric}</div>
                  <p className="text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-display mb-6">Interested in collaborating?</h2>
            <p className="text-lg text-background/70 mb-8 max-w-xl mx-auto">
              I am always open to strategic partnerships, investments, and collaboration opportunities.
            </p>
            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-background hover:bg-background/90 text-foreground px-8 h-14 text-base rounded-none"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
