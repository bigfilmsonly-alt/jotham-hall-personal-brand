import type { ReactNode } from "react";
import type { Metadata } from "next";
import { serviceMetadata } from "../services-data";

// Title, description and canonical come from services-data.ts with the page copy.
export const metadata: Metadata = serviceMetadata("ai-automation");

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
