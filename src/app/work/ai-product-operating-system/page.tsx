// src/app/work/ai-product-operating-system/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/opsystem/sections/Hero";
import WorkflowSection from "@/components/opsystem/sections/WorkflowSection";
import CaseStudyOverview from "@/components/opsystem/sections/CaseStudyOverview";
import MyRole from "@/components/opsystem/sections/MyRole";
import Outcome from "@/components/opsystem/sections/Outcome";
import Closing from "@/components/opsystem/sections/Closing";

export const metadata: Metadata = {
  title: "AI Product Operating System — Dustin Hartung",
  description:
    "A product case study: a system of Claude Skills that automated the PM workflow from feature idea to shipped release, cutting PRD authoring time from weeks to days.",
};

export default function AiProductOperatingSystemPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <WorkflowSection />
      <CaseStudyOverview />
      <MyRole />
      <Outcome />
      <Closing />
    </main>
  );
}
