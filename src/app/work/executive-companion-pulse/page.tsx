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
import InternalTelemetryPhone from "@/components/pulse/InternalTelemetryPhone";

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
        eyebrow="Web Behavioral Signals"
        title="Where visitors come from, and what they do next"
        reverse
        bullets={[
          "Real customer-facing behavioral telemetry — page views, product views, cart adds, search, and abandonment — read at an executive level, not an analyst workspace.",
          "A traffic-source-to-signal flow showed where activity originated (direct, search, social, email) and what it turned into, alongside a straightforward view→product→cart→order funnel.",
          "Trend indicators and freshness timestamps kept the view grounded in current data, not static reports.",
        ]}
      >
        <PhoneApp initialTabId="signals" />
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

      <NarrativeSection
        eyebrow="Internal Telemetry"
        title="A separate lens, for a separate audience"
        reverse
        bullets={[
          "Reached from a menu, not the main tab bar — an internal-only diagnostic view for the team building the product, kept fully apart from customer-facing signals.",
          "Mobile screen views (via production RUM/observability) and web platform feature-area usage, broken out into their own tabs.",
          "When you're in this view, none of the other tabs apply — it's effectively its own small, separate app.",
        ]}
      >
        <InternalTelemetryPhone />
      </NarrativeSection>

      <AIBriefingSection />

      <Outcome />
      <Closing />
    </main>
  );
}
