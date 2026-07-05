// src/app/work/executive-companion-pulse/page.tsx
import type { Metadata } from "next";
import Hero from "@/components/pulse/sections/Hero";
import CaseStudyOverview from "@/components/pulse/sections/CaseStudyOverview";
import MyRole from "@/components/pulse/sections/MyRole";
import NarrativeSection from "@/components/pulse/sections/NarrativeSection";
import AIBriefingSection from "@/components/pulse/sections/AIBriefingSection";
import Outcome from "@/components/pulse/sections/Outcome";
import Closing from "@/components/pulse/sections/Closing";
import PhoneApp from "@/components/pulse/PhoneApp";

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
        eyebrow="Customer & Account Activity"
        title="Account activity, without digging through reports"
        bullets={[
          "Rather than asking executives to dig through account reports or wait for team summaries, the mobile view surfaced account activity and status indicators in a compact format for quick review.",
          "High-level activity and adoption indicators helped highlight where executive attention might be needed — not churn prediction or account intelligence modeling.",
          "Kept scoped to accounts and engagement — product-level signals get their own dedicated view, described next.",
        ]}
      >
        <PhoneApp initialTabId="customers" />
      </NarrativeSection>

      <NarrativeSection
        eyebrow="Adoption & Usage Metrics"
        title="Usage and behavior signals, read at a glance"
        reverse
        bullets={[
          "The goal was to make internal product and platform telemetry readable at an executive level — not to recreate an analyst workspace on a phone.",
          "Usage broken out by functional area, plus the most common paths users took through the app, helped surface where the product was working and where it wasn't.",
          "Trend indicators and freshness timestamps kept the view grounded in current data, not static reports.",
        ]}
      >
        <PhoneApp initialTabId="usage" />
      </NarrativeSection>

      <NarrativeSection
        eyebrow="Product Intelligence"
        title="Catalog signals, without leaving the app"
        bullets={[
          "Built on the same product catalog capability from a separate 0→1 initiative — surfaced here as an executive-level view of what's moving.",
          "Top-performing categories and the product funnel (views, cart adds, purchases, abandonment) gave a fast read on where interest was and wasn't converting.",
          "A drill-in, not a full commerce dashboard — enough for an executive to spot a trend, not run a merchandising review.",
        ]}
      >
        <PhoneApp initialTabId="product" />
      </NarrativeSection>

      <AIBriefingSection />

      <Outcome />
      <Closing />
    </main>
  );
}
