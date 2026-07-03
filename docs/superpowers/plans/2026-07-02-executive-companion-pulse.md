# Executive Companion Pulse Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `/work/executive-companion-pulse` case study page to dustinhartung.com, with reusable case-study components and natively-rebuilt phone-mockup product screens, matching the approved spec at `docs/superpowers/specs/2026-07-02-executive-companion-pulse-design.md`.

**Architecture:** New `src/components/case-study/` directory holds shared presentational components (PhoneMockup, MetricCard, HealthScoreCard, InsightCard, CapabilitySection, CaseStudyCard, RoadmapCard, PulseLogo) plus a `screens/` subfolder with 10 one-off screen bodies (each owns its own fake data). The route lives at `src/app/work/executive-companion-pulse/page.tsx`, with reusable page copy in a co-located `content.ts`. The homepage's existing "Executive Dashboard" card is updated and linked to the new route.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (no new dependencies).

**Testing note (deviation from standard TDD steps):** This repo has no test framework configured (`package.json` has no `test` script) and this work is static presentational markup with no business logic. Per the approved spec's "Testing / verification" section, each task's verification step is: `npx tsc --noEmit` (typecheck), `npm run lint`, and a visual check via the preview tool instead of `pytest`/`jest`-style red-green steps.

---

### Task 1: Page copy content file

**Files:**
- Create: `src/app/work/executive-companion-pulse/content.ts`

- [ ] **Step 1: Create the content file**

```ts
// src/app/work/executive-companion-pulse/content.ts

export const roleLeadership = [
  "Market research and competitive analysis",
  "Persona definition and use-case mapping",
  "Requirements and acceptance criteria",
  "MVP scope and feature-flag strategy",
  "Future roadmap and investment case",
];

export const roleTechnical = [
  "React Native and TypeScript",
  "GraphQL APIs",
  "Okta authentication",
  "Looker integration",
  "LaunchDarkly feature flags",
  "DataDog telemetry dashboards",
  "Automated test coverage",
];

export const velocityMetrics = [
  { label: "Days", value: "75" },
  { label: "Commits", value: "261" },
  { label: "Test files", value: "63" },
  { label: "Test cases", value: "748" },
  { label: "Lines of code", value: "75,463" },
];

export const caseStudyCards = [
  {
    eyebrow: "The insight",
    title: "Executives don't want another login",
    description:
      "Executives rarely want to log into complex marketing platforms, but they still need confidence that the business, campaigns, customers, and platform are healthy.",
  },
  {
    eyebrow: "The product thesis",
    title: "Compress telemetry into intelligence",
    description:
      "Mobile should not replicate the desktop. It should compress complex telemetry into decision intelligence: what changed, what matters, and what to do next.",
  },
  {
    eyebrow: "The outcome",
    title: "From side project to funded initiative",
    description:
      "After an internal demo, executive excitement helped rally a team around the concept and move it from unofficial innovation effort to product investment.",
  },
];

export const roadmapItems = [
  {
    title: "More actions",
    description:
      "Move from insight to action. Identify a troubled customer segment on mobile and launch a targeted campaign with one tap.",
  },
  {
    title: "AI agent",
    description:
      "A conversational assistant on top of the platform so users can ask questions, receive insights, and get recommendations grounded in their own data.",
  },
  {
    title: "Predictive intelligence",
    description: "Identify emerging risks before they become business impact.",
  },
  {
    title: "Delegation workflows",
    description:
      "Assign recommendations or follow-ups to team members directly from the briefing.",
  },
];
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors related to `content.ts` (unused-export errors are fine — nothing imports it yet).

- [ ] **Step 3: Commit**

```bash
git add src/app/work/executive-companion-pulse/content.ts
git commit -m "Add page copy content for Executive Companion Pulse case study"
```

---

### Task 2: PulseLogo and PhoneMockup

**Files:**
- Create: `src/components/case-study/PulseLogo.tsx`
- Create: `src/components/case-study/PhoneMockup.tsx`

- [ ] **Step 1: Create the logo mark**

```tsx
// src/components/case-study/PulseLogo.tsx

type PulseLogoProps = {
  className?: string;
};

export default function PulseLogo({ className = "h-6 w-6" }: PulseLogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 16h4l2.5-7 4 14 2.5-7H26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Create the phone frame with shared header/bottom nav**

```tsx
// src/components/case-study/PhoneMockup.tsx
import { ReactNode } from "react";
import PulseLogo from "./PulseLogo";

const NAV_ITEMS = [
  { key: "home", label: "Home" },
  { key: "pulse", label: "Pulse" },
  { key: "customers", label: "Customers" },
  { key: "commerce", label: "Commerce" },
  { key: "signals", label: "Signals" },
  { key: "action", label: "Action" },
  { key: "brief", label: "Brief" },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]["key"];

type PhoneMockupProps = {
  activeTab: NavKey;
  dateLabel?: string;
  children: ReactNode;
};

export default function PhoneMockup({
  activeTab,
  dateLabel = "Tuesday, June 24",
  children,
}: PhoneMockupProps) {
  return (
    <div className="mx-auto w-full max-w-[300px]">
      <div className="relative aspect-[9/19.5] w-full rounded-[2.5rem] border-[6px] border-neutral-800 bg-neutral-800 shadow-2xl shadow-black/40">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-24 -translate-x-1/2 rounded-full bg-neutral-900" />
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[2rem] bg-[#F6F8FB]">
          <header className="flex items-center justify-between gap-2 border-b border-[#DCE4EF] bg-white px-4 pb-2 pt-6">
            <PulseLogo className="h-5 w-5 text-[#13B8D9]" />
            <div className="text-right leading-tight">
              <p className="text-[10px] font-medium text-[#123B5D]">Good evening</p>
              <p className="text-[9px] text-neutral-500">{dateLabel}</p>
            </div>
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5 text-[#123B5D]"
              >
                <path d="M12 2a6 6 0 0 0-6 6v3.586l-1.707 1.707A1 1 0 0 0 5 15h14a1 1 0 0 0 .707-1.707L18 11.586V8a6 6 0 0 0-6-6Z" />
                <path d="M9 18a3 3 0 0 0 6 0" strokeLinecap="round" />
              </svg>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#123B5D] text-[9px] font-semibold text-white">
                EC
              </span>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-3 py-3">{children}</div>

          <nav className="grid grid-cols-7 gap-0.5 border-t border-[#DCE4EF] bg-white px-1 py-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.key} className="flex flex-col items-center gap-0.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    item.key === activeTab ? "bg-[#13B8D9]" : "bg-neutral-300"
                  }`}
                />
                <span
                  className={`text-center text-[6.5px] font-medium leading-none ${
                    item.key === activeTab ? "text-[#13B8D9]" : "text-neutral-400"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/case-study/PulseLogo.tsx src/components/case-study/PhoneMockup.tsx
git commit -m "Add PulseLogo and PhoneMockup case-study components"
```

---

### Task 3: Primitive screen components (MetricCard, HealthScoreCard, InsightCard)

**Files:**
- Create: `src/components/case-study/MetricCard.tsx`
- Create: `src/components/case-study/HealthScoreCard.tsx`
- Create: `src/components/case-study/InsightCard.tsx`

- [ ] **Step 1: Create MetricCard (supports in-device and on-page variants)**

```tsx
// src/components/case-study/MetricCard.tsx

type Trend = "up" | "down" | "flat";

type MetricCardProps = {
  label: string;
  value: string;
  delta?: string;
  trend?: Trend;
  variant?: "device" | "page";
};

const TREND_COLOR: Record<Trend, string> = {
  up: "text-[#10B981]",
  down: "text-[#EF4444]",
  flat: "text-neutral-400",
};

export default function MetricCard({
  label,
  value,
  delta,
  trend = "flat",
  variant = "device",
}: MetricCardProps) {
  if (variant === "page") {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          {label}
        </p>
        <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        {delta && <p className={`mt-1 text-xs font-medium ${TREND_COLOR[trend]}`}>{delta}</p>}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#DCE4EF] bg-white p-3">
      <p className="text-[9px] font-medium uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 text-base font-semibold text-[#123B5D]">{value}</p>
      {delta && <p className={`mt-0.5 text-[9px] font-medium ${TREND_COLOR[trend]}`}>{delta}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Create HealthScoreCard**

```tsx
// src/components/case-study/HealthScoreCard.tsx

type Status = "healthy" | "watch" | "risk";

type HealthScoreCardProps = {
  label: string;
  status: Status;
  score: string;
  description: string;
};

const STATUS_STYLES: Record<Status, { dot: string; text: string }> = {
  healthy: { dot: "bg-[#10B981]", text: "text-[#10B981]" },
  watch: { dot: "bg-[#F59E0B]", text: "text-[#F59E0B]" },
  risk: { dot: "bg-[#EF4444]", text: "text-[#EF4444]" },
};

export default function HealthScoreCard({
  label,
  status,
  score,
  description,
}: HealthScoreCardProps) {
  const styles = STATUS_STYLES[status];
  return (
    <div className="rounded-xl border border-[#DCE4EF] bg-white p-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-[#123B5D]">{label}</p>
        <span className={`flex items-center gap-1 text-[9px] font-semibold ${styles.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
          {score}
        </span>
      </div>
      <p className="mt-1 text-[9px] leading-snug text-neutral-500">{description}</p>
    </div>
  );
}
```

- [ ] **Step 3: Create InsightCard**

```tsx
// src/components/case-study/InsightCard.tsx

type InsightKind = "change" | "watch" | "working" | "action";

type InsightCardProps = {
  kind: InsightKind;
  title: string;
  description: string;
};

const KIND_STYLES: Record<InsightKind, { label: string; badge: string }> = {
  change: { label: "What changed", badge: "bg-[#13B8D9]/10 text-[#13B8D9]" },
  watch: { label: "What to watch", badge: "bg-[#F59E0B]/10 text-[#F59E0B]" },
  working: { label: "What's working", badge: "bg-[#10B981]/10 text-[#10B981]" },
  action: { label: "Recommended action", badge: "bg-[#123B5D]/10 text-[#123B5D]" },
};

export default function InsightCard({ kind, title, description }: InsightCardProps) {
  const styles = KIND_STYLES[kind];
  return (
    <div className="rounded-xl border border-[#DCE4EF] bg-white p-3">
      <span
        className={`inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide ${styles.badge}`}
      >
        {styles.label}
      </span>
      <p className="mt-1.5 text-[10px] font-semibold text-[#123B5D]">{title}</p>
      <p className="mt-0.5 text-[9px] leading-snug text-neutral-500">{description}</p>
    </div>
  );
}
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/case-study/MetricCard.tsx src/components/case-study/HealthScoreCard.tsx src/components/case-study/InsightCard.tsx
git commit -m "Add MetricCard, HealthScoreCard, InsightCard primitives"
```

---

### Task 4: Screen components — Executive Feed, Pulse Metrics, Customer Intelligence

**Files:**
- Create: `src/components/case-study/screens/ExecutiveFeedScreen.tsx`
- Create: `src/components/case-study/screens/PulseMetricsScreen.tsx`
- Create: `src/components/case-study/screens/CustomerIntelligenceScreen.tsx`

- [ ] **Step 1: Create ExecutiveFeedScreen**

```tsx
// src/components/case-study/screens/ExecutiveFeedScreen.tsx
import HealthScoreCard from "../HealthScoreCard";
import InsightCard from "../InsightCard";

const HEALTH_SCORES = [
  {
    label: "Business",
    status: "healthy" as const,
    score: "92",
    description: "Revenue and margin trending ahead of plan.",
  },
  {
    label: "Campaigns",
    status: "watch" as const,
    score: "74",
    description: "Two campaigns underperforming on CTR this week.",
  },
  {
    label: "Customers",
    status: "healthy" as const,
    score: "88",
    description: "Retention steady, engagement up 6% WoW.",
  },
  {
    label: "Platform",
    status: "healthy" as const,
    score: "99",
    description: "All systems nominal, no active incidents.",
  },
];

const SNAPSHOT = [
  {
    kind: "change" as const,
    title: "Cart abandonment up 4.2%",
    description: "Mobile checkout flow flagged as the likely driver.",
  },
  {
    kind: "action" as const,
    title: "Re-engage lapsed VIP segment",
    description: "312 high-value customers inactive for 21+ days.",
  },
];

export default function ExecutiveFeedScreen() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          Health scores
        </p>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          {HEALTH_SCORES.map((item) => (
            <HealthScoreCard key={item.label} {...item} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          Intelligence snapshot
        </p>
        <div className="mt-1.5 space-y-1.5">
          {SNAPSHOT.map((item) => (
            <InsightCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create PulseMetricsScreen**

```tsx
// src/components/case-study/screens/PulseMetricsScreen.tsx
import MetricCard from "../MetricCard";

const METRICS = [
  { label: "Revenue", value: "$4.82M", delta: "+6.1% WoW", trend: "up" as const },
  { label: "Orders", value: "38,204", delta: "+2.4% WoW", trend: "up" as const },
  { label: "Product views", value: "1.9M", delta: "+11% WoW", trend: "up" as const },
  { label: "Cart abandon", value: "68.3%", delta: "+4.2 pts", trend: "down" as const },
  { label: "Customers", value: "612K", delta: "+0.8% WoW", trend: "up" as const },
  { label: "Signals", value: "247", delta: "18 new today", trend: "flat" as const },
];

export default function PulseMetricsScreen() {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
        This week
      </p>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        {METRICS.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create CustomerIntelligenceScreen**

```tsx
// src/components/case-study/screens/CustomerIntelligenceScreen.tsx
import MetricCard from "../MetricCard";

const LIFECYCLE = [
  { label: "New", value: "18%" },
  { label: "Active", value: "54%" },
  { label: "At risk", value: "19%" },
  { label: "Lapsed", value: "9%" },
];

export default function CustomerIntelligenceScreen() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-[#DCE4EF] bg-white p-3">
        <p className="text-[9px] font-medium uppercase tracking-wide text-neutral-500">
          Total customers
        </p>
        <p className="mt-1 text-lg font-semibold text-[#123B5D]">612,048</p>
        <p className="mt-0.5 text-[9px] font-medium text-[#10B981]">+0.8% week over week</p>
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          Customer lifecycle
        </p>
        <div className="mt-1.5 grid grid-cols-4 gap-1">
          {LIFECYCLE.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-[#DCE4EF] bg-white p-2 text-center"
            >
              <p className="text-[11px] font-semibold text-[#123B5D]">{item.value}</p>
              <p className="text-[7px] font-medium uppercase text-neutral-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <MetricCard label="Customer engagement" value="71.4" delta="+3.1 pts" trend="up" />
        <MetricCard label="Customer value map" value="A-tier: 12%" delta="↑ from 10%" trend="up" />
      </div>

      <div className="rounded-xl border border-[#DCE4EF] bg-white p-3">
        <p className="text-[10px] font-semibold text-[#123B5D]">Customer Explorer</p>
        <p className="mt-0.5 text-[9px] leading-snug text-neutral-500">
          Segment, filter, and drill into any customer cohort by lifecycle stage, value tier, or
          engagement signal.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/case-study/screens/ExecutiveFeedScreen.tsx src/components/case-study/screens/PulseMetricsScreen.tsx src/components/case-study/screens/CustomerIntelligenceScreen.tsx
git commit -m "Add Executive Feed, Pulse Metrics, Customer Intelligence screens"
```

---

### Task 5: Screen components — Commerce Insights, Behavior Signals, AI Briefing

**Files:**
- Create: `src/components/case-study/screens/CommerceInsightsScreen.tsx`
- Create: `src/components/case-study/screens/BehaviorSignalsScreen.tsx`
- Create: `src/components/case-study/screens/AiBriefingScreen.tsx`

- [ ] **Step 1: Create CommerceInsightsScreen**

```tsx
// src/components/case-study/screens/CommerceInsightsScreen.tsx
import MetricCard from "../MetricCard";

const MOMENTUM = [
  { name: "Outerwear", change: "+18%", trend: "up" as const },
  { name: "Footwear", change: "+9%", trend: "up" as const },
  { name: "Accessories", change: "-4%", trend: "down" as const },
];

export default function CommerceInsightsScreen() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-1.5">
        <MetricCard label="Revenue" value="$4.82M" delta="+6.1% WoW" trend="up" />
        <MetricCard label="Conversion" value="3.4%" delta="+0.2 pts" trend="up" />
      </div>
      <div className="rounded-xl border border-[#DCE4EF] bg-white p-3">
        <p className="text-[9px] font-medium uppercase tracking-wide text-neutral-500">
          Catalog overview
        </p>
        <p className="mt-1 text-[10px] leading-snug text-neutral-600">
          14,208 active SKUs across 22 categories, 96.1% in stock.
        </p>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          Category momentum
        </p>
        <div className="mt-1.5 space-y-1">
          {MOMENTUM.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border border-[#DCE4EF] bg-white px-2.5 py-1.5"
            >
              <span className="text-[9px] font-medium text-[#123B5D]">{item.name}</span>
              <span
                className={`text-[9px] font-semibold ${
                  item.trend === "up" ? "text-[#10B981]" : "text-[#EF4444]"
                }`}
              >
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create BehaviorSignalsScreen**

```tsx
// src/components/case-study/screens/BehaviorSignalsScreen.tsx

const FUNNEL = [
  { stage: "Visit", value: "100%" },
  { stage: "Product view", value: "61%" },
  { stage: "Add to cart", value: "24%" },
  { stage: "Checkout", value: "11%" },
  { stage: "Purchase", value: "7%" },
];

export default function BehaviorSignalsScreen() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          Funnel movement
        </p>
        <div className="mt-1.5 space-y-1">
          {FUNNEL.map((step) => (
            <div key={step.stage} className="flex items-center gap-2">
              <span className="w-16 text-[9px] font-medium text-[#123B5D]">{step.stage}</span>
              <div className="h-1.5 flex-1 rounded-full bg-[#DCE4EF]">
                <div className="h-1.5 rounded-full bg-[#13B8D9]" style={{ width: step.value }} />
              </div>
              <span className="w-8 text-right text-[9px] text-neutral-500">{step.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#DCE4EF] bg-white p-3">
        <p className="text-[9px] font-medium uppercase tracking-wide text-neutral-500">
          Top intent signals
        </p>
        <ul className="mt-1 space-y-1 text-[9px] text-neutral-600">
          <li>&quot;free returns&quot; — 2,140 searches, +22% WoW</li>
          <li>&quot;waterproof jacket&quot; — 1,388 searches, +14% WoW</li>
          <li>&quot;gift card balance&quot; — 902 searches, +61% WoW</li>
        </ul>
      </div>

      <div className="rounded-xl border border-[#DCE4EF] bg-white p-3">
        <p className="text-[9px] font-medium uppercase tracking-wide text-neutral-500">
          Abandonment
        </p>
        <p className="mt-1 text-[10px] text-neutral-600">
          Checkout step 2 (shipping) shows the steepest drop-off at 31%.
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create AiBriefingScreen**

```tsx
// src/components/case-study/screens/AiBriefingScreen.tsx
import InsightCard from "../InsightCard";

const BRIEFING = [
  {
    kind: "change" as const,
    title: "Mobile conversion dipped 1.8%",
    description: "Coincides with iOS checkout update shipped Tuesday.",
  },
  {
    kind: "watch" as const,
    title: "Northeast region cooling",
    description: "Order volume down 3 days running after a strong Q2.",
  },
  {
    kind: "working" as const,
    title: "Loyalty campaign outperforming",
    description: "27% lift in repeat purchase rate vs. control group.",
  },
  {
    kind: "action" as const,
    title: "Pause underperforming ad set",
    description: "Spend efficiency down 40%; reallocate to top-performing creative.",
  },
];

export default function AiBriefingScreen() {
  return (
    <div className="space-y-1.5">
      {BRIEFING.map((item) => (
        <InsightCard key={item.title} {...item} />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/case-study/screens/CommerceInsightsScreen.tsx src/components/case-study/screens/BehaviorSignalsScreen.tsx src/components/case-study/screens/AiBriefingScreen.tsx
git commit -m "Add Commerce Insights, Behavior Signals, AI Briefing screens"
```

---

### Task 6: Screen components — Action Center, Signal Export, Job Monitor, Settings

**Files:**
- Create: `src/components/case-study/screens/ActionCenterScreen.tsx`
- Create: `src/components/case-study/screens/SignalExportScreen.tsx`
- Create: `src/components/case-study/screens/JobMonitorScreen.tsx`
- Create: `src/components/case-study/screens/SettingsScreen.tsx`

- [ ] **Step 1: Create ActionCenterScreen**

```tsx
// src/components/case-study/screens/ActionCenterScreen.tsx

const ALERTS = [
  {
    severity: "risk" as const,
    title: "Checkout error rate spiking",
    meta: "Started 14 min ago · 3 owners notified",
  },
  {
    severity: "watch" as const,
    title: "Campaign budget 80% spent",
    meta: "Ends in 2 days · pacing ahead",
  },
  {
    severity: "healthy" as const,
    title: "Weekly report generated",
    meta: "Delivered to 6 subscribers",
  },
];

const SEVERITY_DOT: Record<string, string> = {
  risk: "bg-[#EF4444]",
  watch: "bg-[#F59E0B]",
  healthy: "bg-[#10B981]",
};

export default function ActionCenterScreen() {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
        Action center
      </p>
      {ALERTS.map((alert) => (
        <div key={alert.title} className="rounded-xl border border-[#DCE4EF] bg-white p-3">
          <div className="flex items-start gap-2">
            <span
              className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${SEVERITY_DOT[alert.severity]}`}
            />
            <div>
              <p className="text-[10px] font-semibold text-[#123B5D]">{alert.title}</p>
              <p className="mt-0.5 text-[8.5px] text-neutral-500">{alert.meta}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create SignalExportScreen**

```tsx
// src/components/case-study/screens/SignalExportScreen.tsx

const EXPORTS = [
  { name: "Weekly executive digest", format: "PDF", schedule: "Every Monday, 7:00 AM" },
  { name: "Customer lifecycle CSV", format: "CSV", schedule: "Daily" },
  { name: "Commerce momentum feed", format: "API", schedule: "Real-time" },
];

export default function SignalExportScreen() {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
        Signal export
      </p>
      {EXPORTS.map((item) => (
        <div key={item.name} className="rounded-xl border border-[#DCE4EF] bg-white p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold text-[#123B5D]">{item.name}</p>
            <span className="rounded-full bg-[#13B8D9]/10 px-1.5 py-0.5 text-[7px] font-semibold uppercase text-[#13B8D9]">
              {item.format}
            </span>
          </div>
          <p className="mt-0.5 text-[8.5px] text-neutral-500">{item.schedule}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create JobMonitorScreen**

```tsx
// src/components/case-study/screens/JobMonitorScreen.tsx

const JOBS = [
  { name: "Nightly telemetry sync", status: "healthy" as const, meta: "Completed in 4m 12s" },
  { name: "Customer scoring model", status: "healthy" as const, meta: "Completed in 11m 03s" },
  { name: "Catalog refresh", status: "watch" as const, meta: "Running · 2x slower than avg" },
];

const STATUS_STYLES: Record<string, { dot: string; text: string; label: string }> = {
  healthy: { dot: "bg-[#10B981]", text: "text-[#10B981]", label: "Healthy" },
  watch: { dot: "bg-[#F59E0B]", text: "text-[#F59E0B]", label: "Watching" },
};

export default function JobMonitorScreen() {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
        Job monitor
      </p>
      {JOBS.map((job) => {
        const styles = STATUS_STYLES[job.status];
        return (
          <div key={job.name} className="rounded-xl border border-[#DCE4EF] bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-[#123B5D]">{job.name}</p>
              <span className={`flex items-center gap-1 text-[8.5px] font-semibold ${styles.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                {styles.label}
              </span>
            </div>
            <p className="mt-0.5 text-[8.5px] text-neutral-500">{job.meta}</p>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 4: Create SettingsScreen**

```tsx
// src/components/case-study/screens/SettingsScreen.tsx

const SETTINGS_GROUPS = [
  { label: "Account", items: ["Profile", "Notification preferences", "Connected teams"] },
  {
    label: "Data & access",
    items: ["SSO configuration", "Data refresh schedule", "Export permissions"],
  },
  { label: "Platform", items: ["Feature previews", "Integrations", "Help & support"] },
];

export default function SettingsScreen() {
  return (
    <div className="space-y-3">
      {SETTINGS_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
            {group.label}
          </p>
          <div className="mt-1.5 divide-y divide-[#DCE4EF] rounded-xl border border-[#DCE4EF] bg-white">
            {group.items.map((item) => (
              <div key={item} className="px-3 py-2 text-[9.5px] font-medium text-[#123B5D]">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/case-study/screens/ActionCenterScreen.tsx src/components/case-study/screens/SignalExportScreen.tsx src/components/case-study/screens/JobMonitorScreen.tsx src/components/case-study/screens/SettingsScreen.tsx
git commit -m "Add Action Center, Signal Export, Job Monitor, Settings screens"
```

---

### Task 7: Layout components (CapabilitySection, CaseStudyCard, RoadmapCard)

**Files:**
- Create: `src/components/case-study/CapabilitySection.tsx`
- Create: `src/components/case-study/CaseStudyCard.tsx`
- Create: `src/components/case-study/RoadmapCard.tsx`

- [ ] **Step 1: Create CapabilitySection**

```tsx
// src/components/case-study/CapabilitySection.tsx
import { ReactNode } from "react";

type CapabilitySectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  reverse?: boolean;
  children: ReactNode;
};

export default function CapabilitySection({
  eyebrow,
  title,
  description,
  bullets,
  reverse = false,
  children,
}: CapabilitySectionProps) {
  return (
    <div
      className={`flex flex-col items-center gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:gap-14 md:p-10 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="w-full shrink-0 md:w-auto">{children}</div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{title}</h3>
        <p className="mt-4 leading-7 text-neutral-400">{description}</p>
        <ul className="mt-5 space-y-2">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-sm text-neutral-300">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create CaseStudyCard**

```tsx
// src/components/case-study/CaseStudyCard.tsx

type CaseStudyCardProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function CaseStudyCard({ eyebrow, title, description }: CaseStudyCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-4 leading-7 text-neutral-400">{description}</p>
    </div>
  );
}
```

- [ ] **Step 3: Create RoadmapCard**

```tsx
// src/components/case-study/RoadmapCard.tsx

type RoadmapCardProps = {
  index: number;
  title: string;
  description: string;
};

export default function RoadmapCard({ index, title, description }: RoadmapCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300/10 text-sm font-semibold text-cyan-300">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 leading-7 text-neutral-400">{description}</p>
    </div>
  );
}
```

- [ ] **Step 4: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/case-study/CapabilitySection.tsx src/components/case-study/CaseStudyCard.tsx src/components/case-study/RoadmapCard.tsx
git commit -m "Add CapabilitySection, CaseStudyCard, RoadmapCard layout components"
```

---

### Task 8: Case study page composition

**Files:**
- Create: `src/app/work/executive-companion-pulse/page.tsx`

- [ ] **Step 1: Compose the full page from the components built in Tasks 1–7**

```tsx
// src/app/work/executive-companion-pulse/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import PhoneMockup from "@/components/case-study/PhoneMockup";
import CapabilitySection from "@/components/case-study/CapabilitySection";
import CaseStudyCard from "@/components/case-study/CaseStudyCard";
import RoadmapCard from "@/components/case-study/RoadmapCard";
import MetricCard from "@/components/case-study/MetricCard";
import ExecutiveFeedScreen from "@/components/case-study/screens/ExecutiveFeedScreen";
import PulseMetricsScreen from "@/components/case-study/screens/PulseMetricsScreen";
import CustomerIntelligenceScreen from "@/components/case-study/screens/CustomerIntelligenceScreen";
import CommerceInsightsScreen from "@/components/case-study/screens/CommerceInsightsScreen";
import BehaviorSignalsScreen from "@/components/case-study/screens/BehaviorSignalsScreen";
import AiBriefingScreen from "@/components/case-study/screens/AiBriefingScreen";
import ActionCenterScreen from "@/components/case-study/screens/ActionCenterScreen";
import SignalExportScreen from "@/components/case-study/screens/SignalExportScreen";
import JobMonitorScreen from "@/components/case-study/screens/JobMonitorScreen";
import SettingsScreen from "@/components/case-study/screens/SettingsScreen";
import {
  roleLeadership,
  roleTechnical,
  velocityMetrics,
  caseStudyCards,
  roadmapItems,
} from "./content";

export const metadata: Metadata = {
  title: "Executive Companion Pulse — Dustin Hartung",
  description:
    "AI-powered mobile decision support for marketing leaders. A case study in product strategy, from side project to executive-sponsored initiative.",
};

export default function ExecutiveCompanionPulse() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
        <Link href="/" className="text-sm font-medium text-neutral-400 transition hover:text-white">
          ← Back home
        </Link>

        <div className="mt-10 grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
              Case Study
            </p>
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
              Executive Companion Pulse
            </h1>
            <p className="mt-6 text-2xl text-neutral-300 md:text-3xl">
              AI-powered mobile decision support for marketing leaders.
            </p>
            <p className="mt-6 max-w-xl leading-8 text-neutral-400">
              I identified an underserved executive persona, defined the product strategy, and
              built a mobile companion experience that transformed complex marketing telemetry
              into decision-ready intelligence.
            </p>
          </div>
          <PhoneMockup activeTab="home">
            <ExecutiveFeedScreen />
          </PhoneMockup>
        </div>

        <p className="mt-10 text-xs text-neutral-500">
          Representative demo screens. Branding and data modified for portfolio use.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">Overview</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold md:text-4xl">
          From side project to executive-sponsored product initiative.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {caseStudyCards.map((card) => (
            <CaseStudyCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">My role</p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
          Product strategy and technical direction, end to end.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
              Product leadership
            </h3>
            <ul className="mt-4 space-y-2">
              {roleLeadership.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
              Technical direction
            </h3>
            <ul className="mt-4 space-y-2">
              {roleTechnical.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {velocityMetrics.map((metric) => (
            <MetricCard key={metric.label} variant="page" {...metric} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
          Product philosophy
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold md:text-4xl">
          Built around decision domains, not feature tabs.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
          Instead of mirroring the desktop&apos;s menu structure, the app is organized around the
          questions leaders and marketers actually need answered quickly — what&apos;s healthy,
          what changed, and what to do next.
        </p>

        <div className="mt-10 space-y-6">
          <CapabilitySection
            eyebrow="Executive Feed"
            title="One glance, full confidence"
            description="Health scores, active risks, and an intelligence snapshot surface the state of the business the moment the app opens."
            bullets={[
              "Business, campaign, customer, and platform health scores",
              "Active risks ranked by impact",
              "Daily intelligence snapshot",
            ]}
          >
            <PhoneMockup activeTab="home">
              <ExecutiveFeedScreen />
            </PhoneMockup>
          </CapabilitySection>

          <CapabilitySection
            eyebrow="Pulse Metrics"
            title="The numbers that matter, at a glance"
            description="Revenue, orders, product views, cart abandonment, customer count, and signal count — the core pulse of the business in one screen."
            bullets={[
              "Real-time revenue and order tracking",
              "Product view and cart abandonment trends",
              "Live signal count across the business",
            ]}
            reverse
          >
            <PhoneMockup activeTab="pulse">
              <PulseMetricsScreen />
            </PhoneMockup>
          </CapabilitySection>

          <CapabilitySection
            eyebrow="Customer Intelligence"
            title="Understand the customer, not just the audience"
            description="Customer Explorer, lifecycle stages, engagement, and value mapping give leaders a living picture of who their customers are and where they're headed."
            bullets={[
              "Total customers and lifecycle distribution",
              "Customer engagement scoring",
              "Customer value map by tier",
            ]}
          >
            <PhoneMockup activeTab="customers">
              <CustomerIntelligenceScreen />
            </PhoneMockup>
          </CapabilitySection>

          <CapabilitySection
            eyebrow="Commerce Insights"
            title="Catalog and revenue performance, unified"
            description="Catalog overview, revenue, conversion, and product and category momentum, so commerce leaders can spot what's accelerating and what's not."
            bullets={[
              "Live catalog health and stock coverage",
              "Conversion and revenue tracking",
              "Category momentum ranking",
            ]}
            reverse
          >
            <PhoneMockup activeTab="commerce">
              <CommerceInsightsScreen />
            </PhoneMockup>
          </CapabilitySection>

          <CapabilitySection
            eyebrow="Behavior Signals"
            title="See intent before it becomes revenue"
            description="Funnel movement, intent signals, top searches, and abandonment points reveal where customers are hesitating and why."
            bullets={[
              "Full funnel movement by stage",
              "Top rising search and intent signals",
              "Abandonment hotspot detection",
            ]}
          >
            <PhoneMockup activeTab="signals">
              <BehaviorSignalsScreen />
            </PhoneMockup>
          </CapabilitySection>

          <CapabilitySection
            eyebrow="AI Briefing"
            title="A daily briefing, not a dashboard"
            description="What changed, what to watch, what's working, and recommended actions — synthesized automatically so leaders start from insight, not raw data."
            bullets={[
              "Automated daily summary of key shifts",
              "Early warning on emerging risks",
              "Recommended next actions",
            ]}
            reverse
          >
            <PhoneMockup activeTab="brief">
              <AiBriefingScreen />
            </PhoneMockup>
          </CapabilitySection>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
          Enterprise operations
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold md:text-4xl">
          Built for operational workflows, not just observation.
        </h2>
        <p className="mt-4 max-w-2xl leading-7 text-neutral-400">
          Beyond insight, the app supports the operational backbone enterprise teams expect:
          alerting, data export, job health, and administrative control.
        </p>

        <div className="mt-10 space-y-6">
          <CapabilitySection
            eyebrow="Action Center"
            title="Alerts that route to the right owner"
            description="Every risk surfaced in the feed becomes a trackable alert, routed and acknowledged without leaving the app."
            bullets={["Severity-ranked alert queue", "Owner notification on trigger", "Resolution tracking"]}
          >
            <PhoneMockup activeTab="action">
              <ActionCenterScreen />
            </PhoneMockup>
          </CapabilitySection>

          <CapabilitySection
            eyebrow="Signal Export"
            title="Data leaves the app as easily as it arrives"
            description="Scheduled and on-demand exports keep other systems and stakeholders in sync with the same signals leaders see."
            bullets={[
              "Scheduled PDF, CSV, and API exports",
              "Configurable cadence per audience",
              "Enterprise-grade delivery reliability",
            ]}
            reverse
          >
            <PhoneMockup activeTab="action">
              <SignalExportScreen />
            </PhoneMockup>
          </CapabilitySection>

          <CapabilitySection
            eyebrow="Job Monitor"
            title="Confidence in the data pipeline itself"
            description="A live view of the jobs feeding every metric in the app, so leaders trust the numbers as much as the recommendations."
            bullets={[
              "Real-time job health and duration",
              "Automatic anomaly flagging",
              "Historical run comparison",
            ]}
          >
            <PhoneMockup activeTab="action">
              <JobMonitorScreen />
            </PhoneMockup>
          </CapabilitySection>

          <CapabilitySection
            eyebrow="Settings"
            title="Enterprise controls, without enterprise friction"
            description="SSO, data refresh cadence, export permissions, and team management — configurable without a support ticket."
            bullets={[
              "SSO and access configuration",
              "Data refresh scheduling",
              "Feature preview management",
            ]}
            reverse
          >
            <PhoneMockup activeTab="action">
              <SettingsScreen />
            </PhoneMockup>
          </CapabilitySection>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
          Strategic roadmap
        </p>
        <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Where I would take it next.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {roadmapItems.map((item, index) => (
            <RoadmapCard key={item.title} index={index + 1} {...item} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 text-center md:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            Why this matters
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-2xl font-semibold leading-tight md:text-3xl">
            The future of enterprise software is not more dashboards. It is reducing the distance
            between insight and action.
          </p>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/work/executive-companion-pulse/page.tsx
git commit -m "Compose Executive Companion Pulse case study page"
```

---

### Task 9: Homepage card update

**Files:**
- Modify: `src/app/page.tsx:1-27` (the `work` array) and `:86-97` (the render map)

- [ ] **Step 1: Add the `Link` import, an explicit `WorkItem` type, and update the `work` array's first entry**

`href` will only be set on one of the five entries. Without an explicit shared type, TypeScript infers a union of mismatched object shapes from the array literal, and accessing `item.href` in Step 2 fails to typecheck. Declare the type explicitly so `href` is a consistent optional field.

In `src/app/page.tsx`, add the import at the top:

```tsx
import Link from "next/link";
```

Add this type above the `work` array declaration:

```tsx
type WorkItem = {
  title: string;
  tag: string;
  text: string;
  href?: string;
};
```

Change `const work = [` to `const work: WorkItem[] = [`.

Replace the first entry of the `work` array (currently `title: "Executive Dashboard"`, mentioning "Acoustic's first executive mobile app") with:

```tsx
  {
    title: "Executive Companion Pulse",
    tag: "0→1 production mobile app",
    text: "0→1 executive mobile companion app that turned complex enterprise marketing telemetry into decision-ready insights, AI briefings, and action workflows.",
    href: "/work/executive-companion-pulse",
  },
```

Leave the other four `work` entries unchanged (they get no `href`).

- [ ] **Step 2: Make the card conditionally link out**

Replace the render block:

```tsx
        <div className="grid gap-5 md:grid-cols-2">
          {work.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm font-semibold text-cyan-300">{item.tag}</p>
              <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-neutral-400">{item.text}</p>
            </article>
          ))}
        </div>
```

with:

```tsx
        <div className="grid gap-5 md:grid-cols-2">
          {work.map((item) => {
            const content = (
              <>
                <p className="text-sm font-semibold text-cyan-300">{item.tag}</p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 leading-7 text-neutral-400">{item.text}</p>
              </>
            );

            if (item.href) {
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
                >
                  {content}
                </Link>
              );
            }

            return (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                {content}
              </article>
            );
          })}
        </div>
```

- [ ] **Step 3: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. Confirm no remaining occurrences of "Acoustic" in the file: `grep -i acoustic src/app/page.tsx` should return nothing.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Rename homepage card to Executive Companion Pulse and link to case study"
```

---

### Task 10: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build succeeds with no type or lint errors, and the route table includes `/work/executive-companion-pulse`.

- [ ] **Step 2: Visual check via preview tool — desktop**

Start the dev server with the preview tool, navigate to `/work/executive-companion-pulse` at desktop width (≥1280px). Confirm:
- All 7 sections render in order (hero → overview → role → philosophy → ops → roadmap → closing).
- Phone mockups render inside cards, no overflow, no clipped content.
- No "Acoustic" or former-employer references anywhere on the page (`grep` the rendered DOM text or source is fine as a proxy).
- Bottom nav in every phone mockup reads exactly: Home, Pulse, Customers, Commerce, Signals, Action, Brief.
- No console errors (`preview_console_logs`).

- [ ] **Step 3: Visual check via preview tool — mobile**

Resize the preview to mobile width (375px). Confirm:
- Sections stack single-column.
- Phone mockups scale down and never cause horizontal overflow (check `document.documentElement.scrollWidth` equals viewport width via `preview_eval`).
- `CapabilitySection` reverse/non-reverse layouts both look correct stacked.

- [ ] **Step 4: Homepage check**

Navigate to `/`. Confirm the "Executive Companion Pulse" card is present, links to `/work/executive-companion-pulse` (click it and confirm navigation), and no other card text changed.

- [ ] **Step 5: Final commit (if any fixes were needed)**

If Steps 2–4 required source fixes, stage and commit them with a message describing the fix, e.g.:

```bash
git add -A
git commit -m "Fix overflow/console issues found in case study page verification"
```
