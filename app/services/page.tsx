import { Metadata } from "next";
import { ServicesIndex } from "./services-index";

export const metadata: Metadata = {
  title: "Services | Jotham Hall",
  description: "Strategic consulting services including AI automation, systems architecture, personal branding, executive advisory, and fractional COO services. Transform your business with Jotham Hall.",
  keywords: ["consulting services", "AI automation", "systems architecture", "personal branding", "executive advisory", "fractional COO", "Jotham Hall services"],
  openGraph: {
    title: "Services | Jotham Hall",
    description: "Strategic consulting services to transform your business.",
    url: "https://jothamhall.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesIndex />;
}
