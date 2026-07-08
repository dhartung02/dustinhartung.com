// src/app/work/reqon/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/reqon/sections/Hero";
import DashboardSection from "@/components/reqon/sections/DashboardSection";
import CaseStudyOverview from "@/components/reqon/sections/CaseStudyOverview";
import MyRole from "@/components/reqon/sections/MyRole";
import SupportingSurfaces from "@/components/reqon/sections/SupportingSurfaces";
import Outcome from "@/components/reqon/sections/Outcome";
import Closing from "@/components/reqon/sections/Closing";

export const metadata: Metadata = {
  title: "Reqon — Dustin Hartung",
  description:
    "A product case study: a self-hosted, AI-assisted job-search CRM spanning web, iOS/iPadOS, and Chrome, solo-built and production-shipped.",
};

export default function ReqonPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <DashboardSection />
      <CaseStudyOverview />
      <MyRole />
      <SupportingSurfaces />
      <Outcome />
      <Closing />
    </main>
  );
}
