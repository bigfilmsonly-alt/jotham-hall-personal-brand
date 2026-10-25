import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { BookCallButton } from "@/components/book-call-button";

// The root layout's template appends "| Jotham Hall".
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

/*
  A missing page in the site's own frame: the top bar, the tab bar, and the two
  ways forward a lost visitor needs, home or a call.
*/
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#0D0D0D] px-6 pt-28 pb-36 text-center md:px-10 md:pt-40">
        <p className="text-xs tracking-[0.15em] uppercase text-[#D4A853]">404</p>
        <h1 className="mt-4 font-display text-[2.25rem] leading-tight tracking-[0.12em] uppercase text-balance text-[#FAF8F5] md:mt-6 md:text-5xl lg:text-6xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-5 max-w-[320px] text-[15px] leading-relaxed text-[#B8B0A8] text-pretty md:mt-7 md:max-w-xl md:text-lg">
          This page has moved or no longer exists. Everything else is one tap away.
        </p>
        <div className="mx-auto mt-10 grid max-w-[342px] gap-2.5 md:mt-12 md:max-w-xl md:grid-cols-2">
          <BookCallButton />
          <Link
            href="/"
            className="flex items-center justify-center border border-[#3D3A35] py-3.5 text-sm tracking-wide text-[#B8B0A8] transition-colors hover:border-[#D4A853]/40 hover:text-[#FAF8F5] pointer-coarse:active:scale-[0.97]"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
