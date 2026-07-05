// src/app/work/product-catalog/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/catalog/sections/Hero";
import CaseStudyOverview from "@/components/catalog/sections/CaseStudyOverview";
import MyRole from "@/components/catalog/sections/MyRole";
import CatalogAppSection from "@/components/catalog/sections/CatalogAppSection";
import Outcome from "@/components/catalog/sections/Outcome";
import Closing from "@/components/catalog/sections/Closing";

export const metadata: Metadata = {
  title: "Product Catalog — Dustin Hartung",
  description:
    "A product case study: a 0→1 retail product-intelligence capability that became a competitive differentiator and influenced $1.1M+ in ARR, rebuilt as an original portfolio demonstration.",
};

export default function ProductCatalogPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <CatalogAppSection />
      <CaseStudyOverview />
      <MyRole />
      <Outcome />
      <Closing />
    </main>
  );
}
