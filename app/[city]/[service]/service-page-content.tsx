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
      <section className="pt-10 pb-12 lg:pt-16 lg:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <nav className="text-xs font-mono text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/${city.slug}`} className="hover:text-foreground transition-colors">{city.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{service.name}</span>
          </nav>

          {/* Urgency */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-yellow-500/20 bg-yellow-500/5 mb-6">
            <span className="animate-pulse w-2 h-2 bg-yellow-500 rounded-full" />
            <span className="text-xs font-mono text-yellow-500/80">Limited spots for {city.name} {service.name}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight mb-4">
            {service.name} in {city.name}
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base max-w-2xl mb-6">{service.longDescription}</p>

          {/* Price anchor */}
          <div className="mb-6">
            <span className="text-xs text-muted-foreground line-through">$500 Strategy Call</span>
            <span className="ml-2 text-sm font-medium text-green-400">FREE</span>
          </div>

          <button
            onClick={() => setIsContactOpen(true)}
            className="px-6 py-3.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2 active:scale-[0.97]"
          >
            Apply for {service.name} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-8">What You Get</h2>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {service.benefits.map((b) => (
              <div key={b} className="flex items-start gap-3 p-4 border border-foreground/10">
                <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 border border-foreground/10 max-w-sm">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-1">Investment</span>
            <span className="text-sm font-medium">{service.priceRange}</span>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-3">
            Ready for {service.name}?
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Book a free strategy call. I will audit your current setup and show you exactly where the opportunities are.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3.5 bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center justify-center gap-2 active:scale-[0.97]"
            >
              Check Availability <ArrowRight className="w-4 h-4" />
            </button>
            <a href="tel:+15106809100" className="px-6 py-3.5 border border-foreground/20 text-sm font-medium hover:bg-foreground/5 transition-colors inline-flex items-center justify-center gap-2 active:scale-[0.97]">
              Call (510) 680-9100
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-8">{service.name} FAQ</h2>
          <div className="max-w-3xl space-y-6">
            <div>
              <h3 className="font-medium text-sm mb-1">How much does {service.name} cost in {city.name}?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{service.priceRange}. Every engagement is custom scoped. Book a free strategy call for a tailored proposal.</p>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">How long does implementation take?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">2 to 8 weeks depending on scope. You will see initial results within the first 2 weeks.</p>
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">Do I need to be in {city.name} for this?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">No. Everything is done remotely. I serve {city.name} clients virtually with the same results as in-person engagements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-2xl lg:text-3xl font-display tracking-tight mb-6">Reach Me Directly</h2>
          <div className="max-w-md space-y-2">
            <a href="tel:+15106809100" className="flex items-center gap-3 p-3.5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1"><span className="text-sm font-medium">Call</span> <span className="text-xs text-muted-foreground">(510) 680-9100</span></div>
            </a>
            <a href="sms:+15106934083" className="flex items-center gap-3 p-3.5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]">
              <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1"><span className="text-sm font-medium">Text</span> <span className="text-xs text-muted-foreground">(510) 693-4083</span></div>
            </a>
            <a href="mailto:bigfilmsonly@gmail.com" className="flex items-center gap-3 p-3.5 border border-foreground/10 hover:border-foreground/30 transition-all active:scale-[0.98]">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1"><span className="text-sm font-medium">Email</span> <span className="text-xs text-muted-foreground">bigfilmsonly@gmail.com</span></div>
            </a>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 lg:py-20 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-lg font-display tracking-tight mb-4">Other Services in {city.name}</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {services.filter((s) => s.slug !== service.slug).map((s) => (
              <Link key={s.slug} href={`/${city.slug}/${s.slug}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{s.name}</Link>
            ))}
          </div>
          <h2 className="text-lg font-display tracking-tight mb-4">{service.name} in Other Cities</h2>
          <div className="flex flex-wrap gap-3">
            {cities.filter((c) => c.slug !== city.slug).map((c) => (
              <Link key={c.slug} href={`/${c.slug}/${service.slug}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-[4.5rem]" />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}
