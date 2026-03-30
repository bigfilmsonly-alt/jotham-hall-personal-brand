import type { Metadata } from "next";
import { VenturesIndex } from "./ventures-index";

export const metadata: Metadata = {
  title: "Ventures | Jotham Hall",
  description: "Explore the portfolio of ventures founded and operated by Jotham Hall, including Success Upgrade, Big Films Only, Say It Build It, and more.",
  openGraph: {
    title: "Ventures | Jotham Hall",
    description: "Portfolio of ventures founded and operated by Jotham Hall.",
    url: "https://jothamhall.com/ventures",
  },
  alternates: {
    canonical: "https://jothamhall.com/ventures",
  },
};

export default function VenturesPage() {
  return <VenturesIndex />;
}
