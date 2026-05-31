"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Phone, MessageSquare, Mail } from "lucide-react";
import { ContactModal } from "@/components/landing/contact-modal";
import { cities, services } from "@/lib/city-data";
import type { CityData } from "@/lib/city-data";

interface Props {
  city: CityData;
  service: (typeof services)[number];
}

export function ServicePageContent({ city, service }: Props) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <nav className="text-xs font-mono text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${city.slug}`} className="hover:text-foreground transition-colors">{city.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{service.name}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-display tracking-tight mb-6">
            {service.name} in {city.name}
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mb-8">{service.longDescription}</p>
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-8 py-4 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-12">What You Get</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            {service.benefits.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-foreground mt-0.5 shrink-0" />
                <span className="text-sm">{b}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm font-mono text-muted-foreground">Investment: {service.priceRange}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-12">{service.name} FAQ &mdash; {city.name}</h2>
          <div className="max-w-3xl space-y-8">
            <div>
              <h3 className="font-medium mb-2">How much does {service.name} cost in {city.name}?</h3>
              <p className="text-sm text-muted-foreground">Pricing starts at {service.priceRange}. Every engagement is custom scoped. Book a free 60-minute strategy call to get a tailored proposal for your {city.name} business.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How long does implementation take?</h3>
              <p className="text-sm text-muted-foreground">Typical implementations take 2 to 8 weeks depending on scope and complexity. You will see initial results within the first 2 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-4xl font-display tracking-tight mb-8">Get {service.name} in {city.name}</h2>
          <div className="max-w-md space-y-3 mb-8">
            <a href="tel:+15106809100" className="flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 transition-all">
              <Phone className="w-5 h-5 text-muted-foreground" /><div><span className="block text-sm font-medium">Call</span><span className="text-xs text-muted-foreground">(510) 680-9100</span></div>
            </a>
            <a href="sms:+15106934083" className="flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 transition-all">
              <MessageSquare className="w-5 h-5 text-muted-foreground" /><div><span className="block text-sm font-medium">Text</span><span className="text-xs text-muted-foreground">(510) 693-4083</span></div>
            </a>
            <a href="mailto:jothamjhall@gmail.com" className="flex items-center gap-4 p-4 border border-foreground/10 hover:border-foreground/30 transition-all">
              <Mail className="w-5 h-5 text-muted-foreground" /><div><span className="block text-sm font-medium">Email</span><span className="text-xs text-muted-foreground">jothamjhall@gmail.com</span></div>
            </a>
          </div>
        </div>
      </section>

      {/* Other services in this city */}
      <section className="py-16 lg:py-24 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-lg font-display tracking-tight mb-6">Other Services in {city.name}</h2>
          <div className="flex flex-wrap gap-3">
            {services.filter((s) => s.slug !== service.slug).map((s) => (
              <Link key={s.slug} href={`/${city.slug}/${s.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {s.name}
              </Link>
            ))}
          </div>
          <h2 className="text-lg font-display tracking-tight mb-4 mt-10">{service.name} in Other Cities</h2>
          <div className="flex flex-wrap gap-3">
            {cities.filter((c) => c.slug !== city.slug).map((c) => (
              <Link key={c.slug} href={`/${c.slug}/${service.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-[4.5rem]" />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
