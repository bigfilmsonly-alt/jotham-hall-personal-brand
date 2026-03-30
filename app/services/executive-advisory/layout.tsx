import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Executive Advisory | Jotham Hall",
  description: "Ongoing strategic guidance for leaders with Jotham Hall. Get a trusted advisor and thinking partner to help navigate growth, challenges, and opportunities.",
  openGraph: {
    title: "Executive Advisory | Jotham Hall",
    description: "Ongoing strategic guidance for leaders with Jotham Hall.",
    url: "https://jothamhall.com/services/executive-advisory",
  },
  alternates: {
    canonical: "https://jothamhall.com/services/executive-advisory",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
