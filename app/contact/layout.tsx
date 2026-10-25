import type { Metadata } from "next";
import { SHARE_IMAGE } from "@/lib/seo";

// The root template appends "| Jotham Hall", so the page title leaves the name out.
export const metadata: Metadata = {
  title: "Contact | Book a Strategy Call",
  description: "Book a free strategy call with Jotham Hall, or reach out directly by call, text, or email. Based in Miami Beach, working with clients anywhere.",
  keywords: ["contact Jotham Hall", "Jotham Hall phone", "Jotham Hall email", "book strategy call", "hire Jotham Hall", "Jotham Hall consulting"],
  openGraph: {
    title: "Contact Jotham Hall | Book a Strategy Call",
    description: "Book a free strategy call, or call, text, or email Jotham Hall directly.",
    url: "https://jothamhall.com/contact",
    type: "website",
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Jotham Hall | Book a Strategy Call",
    description: "Book a free strategy call, or call, text, or email Jotham Hall directly.",
    images: [SHARE_IMAGE.url],
  },
  alternates: {
    canonical: "https://jothamhall.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
