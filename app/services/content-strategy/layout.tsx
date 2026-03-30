import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Strategy | Jotham Hall",
  description: "Create content that converts and builds authority with Jotham Hall. Develop content ecosystems that attract ideal clients and drive measurable business results.",
  openGraph: {
    title: "Content Strategy | Jotham Hall",
    description: "Create content that converts and builds authority with Jotham Hall.",
    url: "https://jothamhall.com/services/content-strategy",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/content-strategy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
