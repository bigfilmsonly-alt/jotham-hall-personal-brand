import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal Branding | Jotham Hall",
  description: "Build an audience and authority in your niche with Jotham Hall. Craft compelling narratives and position yourself as the go-to authority in your space.",
  openGraph: {
    title: "Personal Branding | Jotham Hall",
    description: "Build an audience and authority in your niche with Jotham Hall.",
    url: "https://jothamhall.com/services/personal-branding",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/personal-branding",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
