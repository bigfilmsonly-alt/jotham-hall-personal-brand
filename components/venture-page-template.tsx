"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactModal } from "@/components/landing/contact-modal";
import type { Venture } from "@/lib/ventures";

/*
  Laid out for the 430px column that globals.css puts the whole site in from
  768px up. Nothing here keys off viewport breakpoints: an lg: grid fires on a
  desktop screen while the page is still phone width, which is what crushed the
  old three column layout into overlapping text.
*/

export function VenturePageTemplate({ venture }: { venture: Venture }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-background pb-36">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-[#3D3A35]/60">
          <div className="px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-display text-sm tracking-[0.12em] uppercase">
              Jotham Hall
            </Link>
            <Link
              href="/ventures"
              className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase text-[#8A837B] hover:text-[#FAF8F5] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Ventures
            </Link>
          </div>
        </nav>

        <header className="px-6 pt-28 pb-12 text-center">
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-4">{venture.category}</p>
          <h1 className="font-display text-[1.75rem] leading-tight tracking-[0.12em] uppercase mb-4">
            {venture.name}
          </h1>
          <p className="text-[#B8B0A8] leading-relaxed max-w-[320px] mx-auto">{venture.tagline}</p>
          <div className="flex justify-center gap-2 mt-6">
            <span className="px-3 py-1 text-[10px] tracking-[0.15em] uppercase border border-[#D4A853]/40 text-[#D4A853]">
              {venture.status}
            </span>
            {venture.year && (
              <span className="px-3 py-1 text-[10px] tracking-[0.15em] uppercase border border-[#3D3A35] text-[#8A837B]">
                Since {venture.year}
              </span>
            )}
          </div>
          {venture.links.length > 0 && (
            <div className={`grid gap-2.5 mt-8 ${venture.links.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
              {venture.links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-3.5 px-3 text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-colors active:scale-[0.97] ${
                    i === 0
                      ? "bg-[#D4A853] text-[#0D0D0D] hover:bg-[#E8C97A]"
                      : "border border-[#3D3A35] text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5]"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </a>
              ))}
            </div>
          )}
        </header>

        <section className="px-6 py-12 border-t border-[#3D3A35]/60">
          <h2 className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-5">About</h2>
          <p className="text-[1.0625rem] leading-relaxed text-[#FAF8F5]/85">{venture.description}</p>
          <p className="mt-6 text-sm text-[#8A837B]">
            <span className="text-[#FAF8F5]">My role:</span> {venture.role}
          </p>
        </section>

        {venture.features.length > 0 && (
          <section className="px-6 py-12 border-t border-[#3D3A35]/60">
            <h2 className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-6">What It Does</h2>
            <ol className="space-y-5">
              {venture.features.map((feature, i) => (
                <li key={feature} className="flex gap-4">
                  <span className="font-mono text-xs text-[#D4A853]/70 pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-[#B8B0A8] leading-relaxed">{feature}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="mx-6 mt-4 px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center">
          <h2 className="font-display text-lg tracking-[0.12em] uppercase mb-3">Build With Me</h2>
          <p className="text-sm text-[#B8B0A8] leading-relaxed mb-7 max-w-[280px] mx-auto">
            Always open to partnerships, investment, and collaboration.
          </p>
          <button
            onClick={() => setIsContactOpen(true)}
            className="w-full py-3.5 bg-[#D4A853] text-[#0D0D0D] text-sm font-medium tracking-wide hover:bg-[#E8C97A] transition-colors flex items-center justify-center gap-2 active:scale-[0.97]"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </main>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
