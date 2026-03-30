import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Jotham Hall | Book a Strategy Call",
  description: "Contact Jotham Hall for strategic consulting, AI automation, and business systems architecture. Call, text, or email to book a strategy session.",
  keywords: ["contact Jotham Hall", "Jotham Hall phone", "Jotham Hall email", "book strategy call", "hire Jotham Hall", "Jotham Hall consulting"],
  openGraph: {
    title: "Contact Jotham Hall | Book a Strategy Call",
    description: "Contact Jotham Hall for strategic consulting, AI automation, and business systems architecture.",
    url: "https://jothamhall.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Jotham Hall | Book a Strategy Call",
    description: "Contact Jotham Hall for strategic consulting and AI automation.",
  },
  alternates: {
    canonical: "https://jothamhall.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
