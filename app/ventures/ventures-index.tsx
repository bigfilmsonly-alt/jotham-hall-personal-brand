"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactModal } from "@/components/landing/contact-modal";
import { ventureGroups, ventures } from "@/lib/ventures";

// Phone width at every screen size (see globals.css), so no lg: layouts here.

// Success Upgrade opens inside this site like every venture. LinkedIn and
// Instagram refuse to be framed by anyone, so those two open in a new tab.
const elsewhere = [
  { name: "Success Upgrade", href: "/ventures/success-upgrade/site" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jotham-hall-b6b9491b2" },
  { name: "Instagram", href: "https://www.instagram.com/successupgrade_" },
];

export function VenturesIndex() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-background pb-36">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-[#3D3A35]/60">
          <div className="px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-display text-sm tracking-[0.12em] uppercase">
              Jotham Hall
            </Link>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-4 py-2 bg-[#D4A853] text-[#0D0D0D] text-xs font-medium tracking-wide hover:bg-[#E8C97A] transition-colors active:scale-[0.97]"
            >
              Book a Call
            </button>
          </div>
        </nav>

        <header className="px-6 pt-28 pb-12 text-center">
          <p className="text-[11px] tracking-[0.15em] uppercase text-[#D4A853] mb-4">The Portfolio</p>
          <h1 className="font-display text-4xl tracking-[0.12em] uppercase mb-5">Ventures</h1>
          <p className="text-[#B8B0A8] leading-relaxed max-w-[320px] mx-auto">
            Companies I founded, and products I built with partners.
          </p>
        </header>

        {ventureGroups.map((group) => {
          const members = ventures.filter((venture) => venture.group === group);
          if (members.length === 0) return null;
          return (
            <section key={group} className="px-6 pb-10">
              <h2 className="flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-[#8A837B] mb-4">
                {group}
                <span className="flex-1 h-px bg-[#3D3A35]/60" />
              </h2>
              <ul className="space-y-2.5">
                {members.map((venture) => (
                  <li key={venture.slug}>
                    <Link
                      href={`/ventures/${venture.slug}`}
                      className="group block p-5 bg-[#1A1A1A] border border-[#3D3A35] hover:border-[#D4A853]/40 transition-colors active:scale-[0.98]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-display text-[0.95rem] tracking-[0.12em] uppercase text-[#FAF8F5]">
                            {venture.name}
                          </h3>
                          <p className="text-sm text-[#B8B0A8] leading-relaxed mt-1.5">{venture.tagline}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 shrink-0 mt-1 text-[#5C5750] group-hover:text-[#D4A853] group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <span className="px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-[#D4A853]/40 text-[#D4A853]">
                          {venture.status}
                        </span>
                        <span className="text-[10px] tracking-[0.15em] uppercase text-[#5C5750]">{venture.category}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="px-6 pb-10">
          <h2 className="flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-[#8A837B] mb-4">
            Elsewhere
            <span className="flex-1 h-px bg-[#3D3A35]/60" />
          </h2>
          <div className="space-y-2">
            {elsewhere.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between px-5 py-3.5 border border-[#3D3A35] text-sm text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors active:scale-[0.98]"
                >
                  {link.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3.5 border border-[#3D3A35] text-sm text-[#B8B0A8] hover:border-[#D4A853]/40 hover:text-[#FAF8F5] transition-colors active:scale-[0.98]"
                >
                  {link.name}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )
            )}
          </div>
        </section>

        <section className="mx-6 px-6 py-10 bg-[#1A1A1A] border border-[#3D3A35] text-center">
          <h2 className="font-display text-lg tracking-[0.12em] uppercase mb-3">Interested in Partnering?</h2>
          <p className="text-sm text-[#B8B0A8] leading-relaxed mb-7 max-w-[280px] mx-auto">
            Always open to strategic partnerships, investment, and collaboration.
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
