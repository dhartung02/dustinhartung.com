// src/app/work/executive-companion-pulse/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/pulse/sections/Hero";
import CaseStudyOverview from "@/components/pulse/sections/CaseStudyOverview";
import MyRole from "@/components/pulse/sections/MyRole";
import NarrativeSection from "@/components/pulse/sections/NarrativeSection";
import AIBriefingSection from "@/components/pulse/sections/AIBriefingSection";
import Outcome from "@/components/pulse/sections/Outcome";
import Closing from "@/components/pulse/sections/Closing";
import ExecutiveFeedScreen from "@/components/pulse/screens/ExecutiveFeedScreen";
import CustomerIntelligenceScreen from "@/components/pulse/screens/CustomerIntelligenceScreen";
import CommerceIntelligenceScreen from "@/components/pulse/screens/CommerceIntelligenceScreen";
import BehaviorIntelligenceScreen from "@/components/pulse/screens/BehaviorIntelligenceScreen";

export const metadata: Metadata = {
  title: "Executive Companion Pulse — Dustin Hartung",
  description:
    "A product case study: a 0→1 executive mobile intelligence platform, rebuilt as an original portfolio demonstration.",
};

export default function ExecutiveCompanionPulsePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <CaseStudyOverview />
      <MyRole />

      <NarrativeSection
        eyebrow="Executive Feed"
        title="A single, trustworthy read on business health"
        phoneLabel="Executive Feed"
        reverse
        bullets={[
          "Executives needed one glanceable score, not six dashboards spread across desktop tools.",
          "Desktop dashboards assumed a desk and free time — executives had neither between meetings.",
          "Mobile changed the equation: a 30-second check-in replaced a 20-minute dashboard review.",
        ]}
      >
        <ExecutiveFeedScreen />
      </NarrativeSection>

      <NarrativeSection
        eyebrow="Customer Intelligence"
        title="From raw accounts to a value map"
        phoneLabel="Customer Intelligence"
        bullets={[
          "Lifecycle stage, engagement, and spend combine into one Customer Value Matrix.",
          "Segmentation replaces spreadsheets — executives see who's growing and who's at risk.",
          "Health scores roll up from account-level signals, not lagging quarterly reports.",
        ]}
      >
        <CustomerIntelligenceScreen />
      </NarrativeSection>

      <NarrativeSection
        eyebrow="Commerce Intelligence"
        title="Catalog performance, without the spreadsheet"
        phoneLabel="Commerce Intelligence"
        reverse
        bullets={[
          "Revenue, category health, and inventory status roll up into one overview.",
          "Top movers surface automatically — no manual pivot tables required.",
          "Conversion and category performance are visible side by side, not in separate tools.",
        ]}
      >
        <CommerceIntelligenceScreen />
      </NarrativeSection>

      <NarrativeSection
        eyebrow="Behavior Intelligence"
        title="Turning raw signals into prioritized action"
        phoneLabel="Behavior Intelligence"
        bullets={[
          "Behavioral signals are scored, mixed, and funneled down to what's worth acting on.",
          "A lightweight heat map shows where engagement is concentrating in real time.",
          "Freshness is visible — executives know exactly how current the read is.",
        ]}
      >
        <BehaviorIntelligenceScreen />
      </NarrativeSection>

      <AIBriefingSection />

      <Outcome />
      <Closing />
    </main>
  );
}
