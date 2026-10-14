"use client";

import { useState } from "react";
import Link from "next/link";
import { saveRecord } from "@/lib/supabase";

/*
  The close of /about, /credits, /contact, /services (and its four pages) and
  /speaking. One centered column at every width: globals.css holds the site to
  a 430px column from 768px up, so viewport breakpoints (md:, lg:) would switch
  on multi column layouts inside a phone width column. None are used here, and
  every link group fills even rows.

  The pages end with their own closing call to action right above this, so the
  footer carries no booking button of its own. Links point only at live routes:
  /insights redirects to /about (next.config.mjs), so it is not listed.

  data-site-footer lets the floating "Book a Call" step aside once the closing
  block and the footer reach the screen (components/floating-cta.tsx).
*/

const contactLines = [
  { label: "Call", value: "(510) 680-9100", href: "tel:+15106809100" },
  { label: "Text", value: "(510) 693-4083", href: "sms:+15106934083" },
  { label: "Email", value: "bigfilmsonly@gmail.com", href: "mailto:bigfilmsonly@gmail.com" },
];

// Six: three even rows of two.
const exploreLinks = [
  { name: "About", href: "/about" },
  { name: "TV Credits", href: "/credits" },
  { name: "Services", href: "/services" },
  { name: "Ventures", href: "/ventures" },
  { name: "Speaking", href: "/speaking" },
  { name: "Contact", href: "/contact" },
];

// Four: two even rows of two.
const serviceLinks = [
  { name: "AI Automation", href: "/services/ai-automation" },
  { name: "Revenue Systems", href: "/services/revenue-systems" },
  { name: "Strategic Consulting", href: "/services/strategic-consulting" },
  { name: "Systems Architecture", href: "/services/systems-architecture" },
];

// Four: one even row.
const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jotham-hall-b6b9491b2" },
  { name: "Instagram", href: "https://www.instagram.com/successupgrade_" },
  { name: "TikTok", href: "https://www.tiktok.com/@successupgrade_" },
  { name: "Facebook", href: "https://www.facebook.com/share/1DuisNbTVK/?mibextid=wwXIfr" },
];

function SectionLabel({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-4 text-[11px] tracking-[0.15em] uppercase text-[#8A837B]">
      <span aria-hidden="true" className="h-px flex-1 bg-[#3D3A35]/60" />
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-[#3D3A35]/60" />
    </h2>
  );
}

function FooterEmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const saved = await saveRecord("email_captures", { email, source: "footer_newsletter" });
    void saved;

    setEmail("");
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "email_capture", data: { email, source: "footer_newsletter" } }),
    }).catch(() => {});
    setStatus("done");
  };

  if (status === "done") {
    return <p className="py-3 text-center text-[15px] text-[#FAF8F5]">You&apos;re subscribed. Welcome.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Email address"
        autoComplete="email"
        className="h-12 min-w-0 flex-1 border border-[#3D3A35] bg-[#1A1A1A] px-4 text-base text-[#FAF8F5] placeholder:text-[#8A837B] transition-colors focus:border-[#D4A853]/60 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="h-12 shrink-0 border border-[#D4A853]/50 px-5 text-[11px] font-medium tracking-[0.15em] uppercase text-[#D4A853] transition-colors hover:bg-[#D4A853] hover:text-[#0D0D0D] disabled:opacity-50"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}

export function FooterSection() {
  return (
    <footer data-site-footer className="border-t border-[#3D3A35]/60 text-center">
      {/* Sign-off */}
      <div className="px-6 pt-14">
        <Link
          href="/"
          className="inline-block font-display text-xl tracking-[0.12em] uppercase text-[#FAF8F5] transition-colors hover:text-[#E8C97A]"
        >
          Jotham Hall
        </Link>
        <span aria-hidden="true" className="mx-auto mt-4 block h-px w-8 bg-[#D4A853]/60" />
        <p className="mx-auto mt-4 max-w-[300px] text-[15px] leading-relaxed text-balance text-[#B8B0A8]">
          I build the systems that run and grow your business.
        </p>
        <p className="mt-3 text-[11px] tracking-[0.15em] uppercase text-[#8A837B]">Based in Miami Beach</p>
      </div>

      {/* Direct lines */}
      <section aria-labelledby="footer-contact" className="px-6 pt-12">
        <SectionLabel id="footer-contact">Reach Me Directly</SectionLabel>
        <ul className="mt-4 divide-y divide-[#3D3A35]/60 border-y border-[#3D3A35]/60">
          {contactLines.map((line) => (
            <li key={line.label}>
              <a href={line.href} className="group flex min-h-[52px] items-center justify-between gap-4">
                <span className="text-[11px] tracking-[0.15em] uppercase text-[#8A837B]">{line.label}</span>
                <span className="text-[15px] text-[#FAF8F5] transition-colors group-hover:text-[#E8C97A]">
                  {line.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Site links */}
      <nav aria-label="Footer" className="px-6 pt-12">
        <SectionLabel>Explore</SectionLabel>
        <ul className="mt-3 grid grid-cols-2">
          {exploreLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-[44px] items-center justify-center text-sm text-[#B8B0A8] transition-colors hover:text-[#FAF8F5]"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-8">
          <SectionLabel>Services</SectionLabel>
        </div>
        <ul className="mt-3 grid grid-cols-2">
          {serviceLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-[44px] items-center justify-center text-sm text-[#B8B0A8] transition-colors hover:text-[#FAF8F5]"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Email capture */}
      <section aria-labelledby="footer-insights" className="px-6 pt-12">
        <SectionLabel id="footer-insights">Insights by Email</SectionLabel>
        <p className="mx-auto mt-4 mb-5 max-w-[300px] text-[15px] leading-relaxed text-balance text-[#B8B0A8]">
          Notes on AI systems and business from a producer with 50+ TV credits.
        </p>
        <FooterEmailForm />
      </section>

      {/* Social */}
      <ul className="mt-10 grid grid-cols-4 px-6">
        {socialLinks.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center text-[13px] text-[#B8B0A8] transition-colors hover:text-[#D4A853]"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      {/* Credit */}
      <div className="mx-6 mt-6 space-y-2 border-t border-[#3D3A35]/60 pt-8">
        {/* JothamHall.com is this site, so it stays plain text. On the
            narrowest phones the line breaks at the dot, never mid phrase. */}
        <p className="text-xs text-[#8A837B]">
          <span className="whitespace-nowrap">Built by JothamHall.com &middot;</span>{" "}
          <span className="whitespace-nowrap">
            Developed by{" "}
            <a
              href="https://successupgrade.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B8B0A8] transition-colors hover:text-[#D4A853]"
            >
              SuccessUpgrade.ai
            </a>
          </span>
        </p>
        <p className="text-[11px] tracking-[0.15em] uppercase text-[#5C5750]">
          &copy; {new Date().getFullYear()} Jotham Hall
        </p>
      </div>

      {/*
        Clearance for the fixed tab bar (h-20 plus the safe area) with room to
        spare, the same 9rem the pages use (pb-36). Without it the last line
        sat under the bar and could not be scrolled into view.
      */}
      <div aria-hidden="true" style={{ height: "calc(9rem + env(safe-area-inset-bottom, 0px))" }} />
    </footer>
  );
}
