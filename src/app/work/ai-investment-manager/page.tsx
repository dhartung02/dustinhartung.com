// src/app/work/ai-investment-manager/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/invest/sections/Hero";
import CommandCenterSection from "@/components/invest/sections/CommandCenterSection";
import CaseStudyOverview from "@/components/invest/sections/CaseStudyOverview";
import MyRole from "@/components/invest/sections/MyRole";
import Outcome from "@/components/invest/sections/Outcome";
import Closing from "@/components/invest/sections/Closing";

export const metadata: Metadata = {
  title: "AI Investment Manager — Dustin Hartung",
  description:
    "A product case study: a real, actively-developed research platform that earns the right to use AI one capability gate at a time.",
};

export default function AiInvestmentManagerPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <CommandCenterSection />
      <CaseStudyOverview />
      <MyRole />
      <Outcome />
      <Closing />
    </main>
  );
}
