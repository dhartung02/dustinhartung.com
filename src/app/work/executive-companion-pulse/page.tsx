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
import BehaviorIntelligenceScreen from "@/components/pulse/screens/BehaviorIntelligenceScreen";

export const metadata: Metadata = {
  title: "Executive Companion Pulse — Dustin Hartung",
  description:
    "A product case study: a 0→1 executive mobile companion that turned platform telemetry into a fast, trusted operating view, rebuilt as an original portfolio demonstration.",
};

export default function ExecutiveCompanionPulsePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <CaseStudyOverview />
      <MyRole />

      <NarrativeSection
        eyebrow="Executive Overview"
        title="A fast, trusted view between meetings"
        phoneLabel="Executive Overview"
        reverse
        bullets={[
          "Executives needed a glanceable, configurable view of platform and business health — not another dashboard login.",
          "Metric cards could be configured around whatever mattered most: platform health, product adoption, customer activity, or operational status.",
          "A secure mobile check-in replaced waiting for a desktop session or a status email.",
        ]}
      >
        <ExecutiveFeedScreen />
      </NarrativeSection>

      <NarrativeSection
        eyebrow="Customer & Account Activity"
        title="Account activity, without digging through reports"
        phoneLabel="Customer & Account Activity"
        bullets={[
          "Rather than asking executives to dig through account reports or wait for team summaries, the mobile view surfaced account activity and status indicators in a compact format for quick review.",
          "High-level activity and adoption indicators helped highlight where executive attention might be needed — not churn prediction or account intelligence modeling.",
          "Designed for a fast read, not a full analyst workspace on a phone.",
        ]}
      >
        <CustomerIntelligenceScreen />
      </NarrativeSection>

      <NarrativeSection
        eyebrow="Product & Usage Signals"
        title="Usage and behavior signals, read at a glance"
        phoneLabel="Product & Usage Signals"
        reverse
        bullets={[
          "The goal was to make product and behavioral telemetry readable at an executive level — not to recreate an analyst workspace on a phone.",
          "Trend indicators and freshness timestamps kept the view grounded in current data, not static reports.",
          "Designed to reduce reliance on scattered dashboards and manual usage summaries.",
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
