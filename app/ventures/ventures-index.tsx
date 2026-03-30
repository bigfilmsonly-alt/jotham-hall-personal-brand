"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/landing/contact-modal";

const ventures = [
  {
    slug: "success-upgrade",
    name: "Success Upgrade",
    tagline: "AI-powered life operating system",
    status: "Active",
    website: "https://www.successupgrade.ai/",
  },
  {
    slug: "big-films-only",
    name: "Big Films Only",
    tagline: "Film production and creative studio",
    status: "Active",
    website: null,
  },
  {
    slug: "say-it-build-it",
    name: "Say It Build It",
    tagline: "AI development and vibe coding agency",
    status: "Active",
    website: null,
  },
  {
    slug: "saas-agency",
    name: "SaaS Agency",
    tagline: "Full-service digital agency",
    status: "Active",
    website: null,
  },
  {
    slug: "alkaline-water",
    name: "Alkaline Water Brand",
    tagline: "Premium health and wellness",
    status: "Active",
    website: null,
  },
];

export function VenturesIndex() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-display">Jotham Hall</Link>
            <Button
              size="sm"
              onClick={() => setIsContactOpen(true)}
              className="bg-foreground hover:bg-foreground/90 text-background rounded-none"
            >
              Book a Call
            </Button>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto text-center lg:text-left">
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider block mb-6">
              The Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-6">
              Ventures
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              A portfolio of companies built on the same principles I teach: systems thinking, automation, and scalable infrastructure.
            </p>
          </div>
        </section>

        {/* Ventures Grid */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid gap-px bg-foreground/10">
              {ventures.map((venture) => (
                <Link
                  key={venture.slug}
                  href={`/ventures/${venture.slug}`}
                  className="group bg-background p-8 lg:p-12 hover:bg-foreground/[0.02] transition-colors"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4">
                      <h2 className="text-2xl lg:text-3xl font-display group-hover:text-muted-foreground transition-colors">
                        {venture.name}
                      </h2>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-muted-foreground">{venture.tagline}</p>
                    </div>
                    <div className="lg:col-span-2">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        {venture.status}
                      </span>
                    </div>
                    <div className="lg:col-span-1 flex justify-end">
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* External Links */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 bg-foreground/[0.02]">
          <div className="max-w-[1400px] mx-auto text-center">
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider block mb-8">
              Learn More
            </span>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://www.successupgrade.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 hover:border-foreground/40 transition-colors"
              >
                Success Upgrade
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/jotham-hall-b6b9491b2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 hover:border-foreground/40 transition-colors"
              >
                LinkedIn
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/successupgrade_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 hover:border-foreground/40 transition-colors"
              >
                Instagram
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-display mb-6">Interested in partnering?</h2>
            <p className="text-lg text-background/70 mb-8 max-w-xl mx-auto">
              Always open to strategic partnerships, investments, and collaboration opportunities.
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
