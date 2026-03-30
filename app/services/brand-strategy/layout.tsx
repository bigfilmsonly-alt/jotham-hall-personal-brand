import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Strategy | Jotham Hall",
  description: "Build a brand that commands premium pricing. Positioning, messaging, and visual identity designed to attract high-value clients who pay without negotiating.",
  keywords: ["brand strategy", "brand positioning", "personal branding", "content strategy", "Jotham Hall branding", "premium brand"],
  openGraph: {
    title: "Brand Strategy | Jotham Hall",
    description: "Build a brand that commands premium pricing. Positioning, messaging, and visual identity.",
    type: "website",
    url: "https://jothamhall.com/services/brand-strategy",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/brand-strategy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
