"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/landing/contact-modal";

const caseStudies = [
  {
    slug: "saas-revenue-transformation",
    title: "3x Revenue in 6 Months",
    client: "B2B SaaS Company",
    industry: "Technology",
    result: "300% Revenue Growth",
    description: "Implemented automated sales systems and pricing optimization for a growing SaaS platform.",
  },
  {
    slug: "agency-systems-overhaul",
    title: "From Chaos to Clarity",
    client: "Digital Marketing Agency",
    industry: "Marketing",
    result: "40 Hours/Week Saved",
    description: "Built operational infrastructure that eliminated founder bottleneck and enabled scale.",
  },
  {
    slug: "ecommerce-automation",
    title: "Fully Automated Fulfillment",
    client: "E-commerce Brand",
    industry: "Retail",
    result: "95% Automation Rate",
    description: "Designed end-to-end automation for order processing, inventory, and customer service.",
  },
  {
    slug: "personal-brand-launch",
    title: "0 to 100K Followers",
    client: "Executive Turned Creator",
    industry: "Personal Brand",
    result: "100K Audience Built",
    description: "Launched and scaled a personal brand from scratch with content strategy and positioning.",
  },
  {
    slug: "startup-advisory",
    title: "Series A Ready",
    client: "Fintech Startup",
    industry: "Finance",
    result: "$5M Raised",
    description: "Strategic advisory through fundraising process, from pitch deck to term sheet.",
  },
];

export function CaseStudiesIndex() {
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
              Proven Results
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display tracking-tight mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Real transformations from real clients. Every engagement is designed to deliver measurable, lasting results.
            </p>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid gap-px bg-foreground/10">
              {caseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/case-studies/${study.slug}`}
                  className="group bg-background p-8 lg:p-12 hover:bg-foreground/[0.02] transition-colors"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-2">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        {study.industry}
                      </span>
                    </div>
                    <div className="lg:col-span-6">
                      <h2 className="text-2xl lg:text-3xl font-display mb-2 group-hover:text-muted-foreground transition-colors">
                        {study.title}
                      </h2>
                      <p className="text-muted-foreground">{study.description}</p>
                    </div>
                    <div className="lg:col-span-3">
                      <span className="text-2xl font-display">{study.result}</span>
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

        {/* CTA */}
        <section className="py-20 lg:py-32 px-6 lg:px-12 bg-foreground text-background">
          <div className="max-w-[1400px] mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-display mb-6">Ready to be the next success story?</h2>
            <p className="text-lg text-background/70 mb-8 max-w-xl mx-auto">
              Let's discuss how I can help transform your business with the same systematic approach.
            </p>
            <Button
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-background hover:bg-background/90 text-foreground px-8 h-14 text-base rounded-none"
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
