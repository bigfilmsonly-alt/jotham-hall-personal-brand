"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare, Mail } from "lucide-react";
import { ContactModal } from "@/components/landing/contact-modal";
import type { CityData } from "@/lib/city-data";

interface Props {
  city: CityData;
  services: { slug: string; name: string; description: string; benefits: string[]; priceRange: string }[];
}

export function CityPageContent({ city, services }: Props) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="text-xs font-mono text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{city.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display tracking-tight mb-6">
            AI Automation &<br />Business Systems in {city.name}
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mb-8">
            {city.localAngle} 50+ TV credits. 500+ founders scaled. 3x average revenue growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2"
            >
              Book Free Strategy Call <ArrowRight className="w-4 h-4" />
            </button>
            <a href="tel:+15106809100" className="px-8 py-4 border border-foreground/20 text-sm font-medium hover:bg-foreground/5 transition-colors inline-flex items-center gap-2">
              Call (510) 680-9100
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-12">Services in {city.name}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/${city.slug}/${service.slug}`}
                className="group p-6 border border-foreground/10 hover:border-foreground/30 transition-all"
              >
                <h3 className="font-display text-xl mb-2 group-hover:text-foreground transition-colors">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-1 mb-4">
                  {service.benefits.map((b) => (
                    <li key={b} className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-foreground/30 rounded-full" />{b}
                    </li>
                  ))}
                </ul>
                <span className="text-xs font-mono text-muted-foreground">{service.priceRange}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Jotham */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-12">Why Choose Jotham Hall in {city.name}?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-lg mb-2">50+ TV Credits</h3>
              <p className="text-sm text-muted-foreground">Hallmark, Food Network, VH1, MTV, NBC, USA Network. Real production experience at the highest level.</p>
            </div>
            <div>
              <h3 className="font-display text-lg mb-2">500+ Founders Scaled</h3>
              <p className="text-sm text-muted-foreground">Proven track record across industries. 3x average revenue growth for clients.</p>
            </div>
            <div>
              <h3 className="font-display text-lg mb-2">VibeCoding Pioneer</h3>
              <p className="text-sm text-muted-foreground">Build software without code. v0.dev, Cursor, Claude expert. Ship 10x faster.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-12">FAQ &mdash; {city.name}</h2>
          <div className="max-w-3xl space-y-8">
            <div>
              <h3 className="font-medium mb-2">Who is the best AI automation consultant in {city.name}?</h3>
              <p className="text-sm text-muted-foreground">Jotham Hall is a top AI automation consultant serving {city.name}. With 50+ TV production credits and 500+ entrepreneurs mentored, he specializes in ChatGPT, Claude, GoHighLevel, and no-code automation for {city.name} businesses.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How much does AI automation cost in {city.name}?</h3>
              <p className="text-sm text-muted-foreground">Jotham Hall offers a free 60-minute strategy call. AI automation projects range from $2,500 for starter packages to $15,000+ for enterprise. Revenue systems run $5,000 to $25,000+. Fractional COO services are $5,000 to $15,000/month.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">What services are available in {city.name}?</h3>
              <p className="text-sm text-muted-foreground">AI Automation, Revenue Systems, VibeCoding, and Fractional COO services. Serving businesses across {city.neighborhoods.slice(0, 5).join(", ")}, and throughout {city.state}.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-8">Areas Served in {city.name}</h2>
          <div className="flex flex-wrap gap-2">
            {city.neighborhoods.map((n) => (
              <span key={n} className="px-3 py-1.5 border border-foreground/10 text-sm text-muted-foreground">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-8">Get Started in {city.name}</h2>
          <div className="max-w-md space-y-3">
            <a href="tel:+15106809100" className="flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 transition-all">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div><span className="block text-sm font-medium">Call</span><span className="text-xs text-muted-foreground">(510) 680-9100</span></div>
            </a>
            <a href="sms:+15106934083" className="flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 transition-all">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <div><span className="block text-sm font-medium">Text</span><span className="text-xs text-muted-foreground">(510) 693-4083</span></div>
            </a>
            <a href="mailto:jothamjhall@gmail.com" className="flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 transition-all">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div><span className="block text-sm font-medium">Email</span><span className="text-xs text-muted-foreground">jothamjhall@gmail.com</span></div>
            </a>
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-lg font-display tracking-tight mb-6">Also Serving</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { slug: "new-york", name: "New York" }, { slug: "san-francisco", name: "San Francisco" },
              { slug: "los-angeles", name: "Los Angeles" }, { slug: "miami", name: "Miami" },
              { slug: "atlanta", name: "Atlanta" }, { slug: "austin", name: "Austin" },
              { slug: "chicago", name: "Chicago" }, { slug: "dallas", name: "Dallas" },
              { slug: "houston", name: "Houston" }, { slug: "boston", name: "Boston" },
            ].filter((c) => c.slug !== city.slug).map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tab bar spacer */}
      <div className="h-[4.5rem]" />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
