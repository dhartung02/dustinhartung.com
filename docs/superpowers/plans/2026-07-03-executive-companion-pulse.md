# Executive Companion Pulse Case Study — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new portfolio case study page at `/work/executive-companion-pulse` — a narrative-scroll product page recreating (never screenshotting) a 0→1 executive mobile app, using only original HTML/CSS/React components, synthetic demo data, and no employer references — then link it from the homepage.

**Architecture:** A typed `content.ts` config feeds presentational section/screen components under `src/components/pulse/`. Hand-rolled SVG chart primitives (no charting library) render inside a reusable `PhoneFrame`. Framer Motion drives subtle, reduced-motion-safe reveal animations via one shared helper. The page itself (`src/app/work/executive-companion-pulse/page.tsx`) is a Server Component composing client section components.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion (new dependency), lucide-react (new dependency).

**Verification approach:** This repo has no test framework (`package.json` has no test script). Per-task verification is `npx tsc --noEmit` + `npm run lint`, plus a manual browser check via `npm run dev` for any visual task. There is a dedicated full QA task (Task 21) and a pre-merge deliverables task (Task 22) at the end.

**Source of truth:** `docs/superpowers/specs/2026-07-03-executive-companion-pulse-design.md`. This plan merges that spec with compatible structural/copy ideas from a concurrent session's work (Case Study Overview cards, My Role section, velocity metrics grid, Closing pull-quote, PulseLogo) — see that spec's "Implementation note" for exactly what was and wasn't adopted.

---

### Task 1: Add dependencies

**Files:**
- Modify: `package.json`, `package-lock.json` (via npm)

- [ ] **Step 1: Install framer-motion and lucide-react**

Run: `npm install framer-motion lucide-react`
Expected: both packages added to `dependencies` in `package.json`, `package-lock.json` updated, exit code 0.

- [ ] **Step 2: Verify install**

Run: `npm ls framer-motion lucide-react`
Expected: both listed with resolved version numbers, no `UNMET DEPENDENCY` errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add framer-motion and lucide-react for Pulse case study"
```

---

### Task 2: Content config

**Files:**
- Create: `src/components/pulse/content.ts`

- [ ] **Step 1: Create the content file**

```ts
// src/components/pulse/content.ts

export type Status = "excellent" | "good" | "watch" | "risk";

export const statusColor: Record<Status, string> = {
  excellent: "#10b981",
  good: "#22d3ee",
  watch: "#f59e0b",
  risk: "#f43f5e",
};

export type FactBadge = { label: string; value: string };

export const heroFacts: FactBadge[] = [
  { label: "Product type", value: "0→1 mobile app" },
  { label: "Build time", value: "~75 days" },
  { label: "Stack", value: "React Native + TypeScript" },
  { label: "Shipped", value: "Apple App Store approved" },
];

export const disclaimerLabel = "Representative Product Demonstration";
export const disclaimerBody =
  "This page recreates the product experience using original HTML/CSS components and synthetic data. It illustrates the product concepts, UX, and technical implementation while avoiding reproduction of proprietary interfaces.";

export const caseStudyOverview = [
  {
    eyebrow: "The Insight",
    title: "Executives don't want another login",
    description:
      "Executives rarely want to log into another complex marketing platform, but they still need confidence that revenue, customers, campaigns, and the platform itself are healthy.",
  },
  {
    eyebrow: "The Product Thesis",
    title: "Compress telemetry into intelligence",
    description:
      "Mobile shouldn't replicate the desktop. It should compress complex telemetry into decision intelligence — what changed, what matters, and what to do next.",
  },
  {
    eyebrow: "The Outcome",
    title: "From side project to executive-sponsored initiative",
    description:
      "After an internal demo, executive interest helped rally a team around the concept and move it from an unofficial innovation effort into a funded product initiative.",
  },
];

export const roleLeadership = [
  "Market research and competitive analysis",
  "Persona definition and use-case mapping",
  "Requirements and acceptance criteria",
  "MVP scope and phased rollout strategy",
  "Roadmap and investment case",
];

export const roleTechnical = [
  "React Native and TypeScript",
  "GraphQL API integration",
  "Enterprise SSO authentication",
  "Feature-flagged rollout strategy",
  "Production telemetry and observability",
  "Automated test coverage",
];

export const velocityMetrics: FactBadge[] = [
  { label: "Days", value: "~75" },
  { label: "Commits", value: "261" },
  { label: "Test Files", value: "63" },
  { label: "Test Cases", value: "748" },
  { label: "Lines of Code", value: "~75,000" },
];

export type HealthCardData = {
  id: string;
  label: string;
  score: number;
  status: Status;
  trend: number[];
};

export const executiveFeed = {
  overallScore: 82,
  overallStatus: "good" as Status,
  cards: [
    { id: "revenue", label: "Revenue Health", score: 88, status: "excellent", trend: [60, 64, 68, 66, 72, 78, 88] },
    { id: "customer", label: "Customer Health", score: 74, status: "good", trend: [70, 71, 69, 73, 72, 75, 74] },
    { id: "campaign", label: "Campaign Performance", score: 61, status: "watch", trend: [70, 68, 65, 63, 62, 60, 61] },
    { id: "platform", label: "Platform Health", score: 91, status: "excellent", trend: [85, 86, 88, 87, 89, 90, 91] },
  ] as HealthCardData[],
  watchList: [
    { id: "w1", label: "Campaign performance down 9% week over week", status: "watch" as Status },
    { id: "w2", label: "3 accounts trending toward churn risk", status: "risk" as Status },
    { id: "w3", label: "Platform uptime steady at 99.98%", status: "excellent" as Status },
  ],
};

export type LifecycleStage = { label: string; value: number; color: string };

export const customerIntelligence = {
  stats: [
    { label: "Active Accounts", value: "1,284" },
    { label: "Avg. Health Score", value: "76" },
    { label: "At-Risk Accounts", value: "42" },
  ],
  lifecycle: [
    { label: "New", value: 18, color: statusColor.good },
    { label: "Growing", value: 34, color: statusColor.excellent },
    { label: "Stable", value: 31, color: statusColor.good },
    { label: "At Risk", value: 17, color: statusColor.risk },
  ] as LifecycleStage[],
  valueMatrix: [
    { id: "a1", x: 82, y: 74, r: 14, label: "Enterprise A" },
    { id: "a2", x: 45, y: 88, r: 10, label: "Growth B" },
    { id: "a3", x: 30, y: 32, r: 8, label: "SMB C" },
    { id: "a4", x: 68, y: 40, r: 12, label: "Mid-Market D" },
    { id: "a5", x: 20, y: 60, r: 7, label: "SMB E" },
    { id: "a6", x: 90, y: 90, r: 16, label: "Enterprise F" },
  ],
};

export const commerceIntelligence = {
  overview: [
    { label: "Revenue", value: "$4.2M" },
    { label: "Products", value: "1,860" },
    { label: "Categories", value: "24" },
    { label: "Conversion", value: "3.4%" },
  ],
  categoryPerformance: [
    { label: "Outdoor", value: 88 },
    { label: "Apparel", value: 72 },
    { label: "Home", value: 64 },
    { label: "Electronics", value: 51 },
    { label: "Beauty", value: 40 },
  ],
  topMovers: [
    { label: "Trail Runner Pro", changePct: 34, trend: [40, 46, 52, 61, 70, 82, 94] },
    { label: "Insulated Bottle", changePct: 21, trend: [50, 53, 58, 60, 63, 68, 72] },
    { label: "Weekend Duffel", changePct: -12, trend: [70, 66, 64, 61, 58, 55, 52] },
  ],
};

export const behaviorIntelligence = {
  signalHealth: 79,
  freshnessMinutesAgo: 6,
  topSignals: [
    { label: "Pricing page revisit", value: 92 },
    { label: "Demo request started", value: 84 },
    { label: "Feature doc deep-read", value: 71 },
    { label: "Competitor comparison", value: 58 },
    { label: "Pricing calculator use", value: 46 },
  ],
  signalMix: [
    { label: "Intent", value: 38, color: statusColor.excellent },
    { label: "Engagement", value: 29, color: statusColor.good },
    { label: "Risk", value: 21, color: statusColor.watch },
    { label: "Firmographic", value: 12, color: "#38bdf8" },
  ],
  funnel: [
    { label: "Signals Captured", value: 4200 },
    { label: "Qualified", value: 1860 },
    { label: "Prioritized", value: 640 },
    { label: "Acted On", value: 210 },
  ],
  heatmap: [
    [0.2, 0.4, 0.3, 0.6, 0.9],
    [0.1, 0.2, 0.5, 0.4, 0.3],
    [0.6, 0.7, 0.8, 0.9, 1.0],
    [0.3, 0.3, 0.2, 0.4, 0.5],
  ],
};

export type Priority = "high" | "medium" | "low";

export type BriefingItem = {
  id: string;
  category: "changed" | "attention" | "opportunity";
  title: string;
  detail: string;
  priority: Priority;
  impact: Priority;
  confidence: number;
  estimatedValue: string;
};

export const aiBriefing: BriefingItem[] = [
  {
    id: "b1",
    category: "changed",
    title: "Campaign performance dipped 9% this week",
    detail: "Click-through rate fell across two active campaigns after a mid-week creative refresh.",
    priority: "high",
    impact: "medium",
    confidence: 88,
    estimatedValue: "~$40K at risk this cycle",
  },
  {
    id: "b2",
    category: "attention",
    title: "3 enterprise accounts trending toward churn",
    detail: "Engagement dropped for three consecutive weeks with no executive touchpoint logged.",
    priority: "high",
    impact: "high",
    confidence: 81,
    estimatedValue: "~$210K in at-risk ARR",
  },
  {
    id: "b3",
    category: "opportunity",
    title: "Outdoor category demand accelerating",
    detail: "Behavioral signals show rising intent two weeks ahead of the seasonal forecast.",
    priority: "medium",
    impact: "high",
    confidence: 74,
    estimatedValue: "~$85K upside if inventory shifts early",
  },
];

export const outcomeStatements = [
  "Grew from an innovation project into an executive-sponsored product initiative.",
  "Reduced the time required for executives to understand platform health.",
  "Consolidated complex enterprise marketing telemetry into decision-ready mobile experiences.",
  "Improved executive visibility into customer, campaign, and platform performance.",
  "Enabled faster identification of risks and opportunities through AI-driven summaries and health indicators.",
];

export const nextUp = [
  "Insight → Action workflows",
  "AI agent over customer/platform data",
  "Predictive risk detection",
  "Delegation and team follow-up workflows",
];

export const closingStatement =
  "Executives don't need more dashboards — they need a trustworthy, glanceable signal they can act on from anywhere. Pulse is what that looks like when product thinking, UX, and hands-on engineering come from the same person.";
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (unused-export warnings don't exist in `tsc`; nothing imports this file yet, which is fine — `isolatedModules` doesn't flag unused exports).

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/content.ts
git commit -m "Add content config for Pulse case study"
```

---

### Task 3: Motion helpers

**Files:**
- Create: `src/components/pulse/usePrefersReducedMotion.ts`
- Create: `src/components/pulse/revealAnimation.ts`

- [ ] **Step 1: Create the reduced-motion hook**

```ts
// src/components/pulse/usePrefersReducedMotion.ts
"use client";

import { useReducedMotion } from "framer-motion";

export function usePrefersReducedMotion(): boolean {
  return useReducedMotion() ?? false;
}
```

- [ ] **Step 2: Create the shared reveal-animation helper**

```ts
// src/components/pulse/revealAnimation.ts
import type { Transition } from "framer-motion";

// Closed set of animatable properties — keeps this file's "transform/opacity only"
// motion rule enforced at compile time. Extend deliberately if a new case is needed.
type MotionTarget = Partial<Record<
  "opacity" | "x" | "y" | "scale" | "scaleX" | "scaleY" | "strokeDashoffset",
  number
>>;

type RevealProps = {
  initial?: MotionTarget;
  animate?: MotionTarget;
  whileInView?: MotionTarget;
  viewport?: { once: boolean; margin?: string };
  transition?: Transition;
};

export function revealAnimation(
  reduceMotion: boolean,
  from: MotionTarget,
  to: MotionTarget,
  transition: Transition = { duration: 0.8, ease: "easeOut" }
): RevealProps {
  if (reduceMotion) {
    return { animate: to };
  }

  return {
    initial: from,
    whileInView: to,
    viewport: { once: true, margin: "-60px" },
    transition,
  };
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/pulse/usePrefersReducedMotion.ts src/components/pulse/revealAnimation.ts
git commit -m "Add reduced-motion-safe reveal animation helper"
```

---

### Task 4: Chart primitive library

**Files:**
- Create: `src/components/pulse/charts/Sparkline.tsx`
- Create: `src/components/pulse/charts/ProgressRing.tsx`
- Create: `src/components/pulse/charts/Gauge.tsx`
- Create: `src/components/pulse/charts/Donut.tsx`
- Create: `src/components/pulse/charts/HorizontalBar.tsx`
- Create: `src/components/pulse/charts/ScatterPlot.tsx`
- Create: `src/components/pulse/charts/MiniFunnel.tsx`
- Create: `src/components/pulse/charts/HeatMap.tsx`

- [ ] **Step 1: Create Sparkline (static, no motion needed)**

```tsx
// src/components/pulse/charts/Sparkline.tsx
type SparklineProps = {
  data: number[];
  color?: string;
  className?: string;
};

export default function Sparkline({ data, color = "#22d3ee", className = "h-8 w-20" }: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
```

- [ ] **Step 2: Create ProgressRing**

```tsx
// src/components/pulse/charts/ProgressRing.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

type ProgressRingProps = {
  value: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export default function ProgressRing({ value, color = "#22d3ee", size = 56, strokeWidth = 6 }: ProgressRingProps) {
  const reduceMotion = usePrefersReducedMotion();
  const clamped = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={center} cy={center} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} fill="none" />
      <motion.circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        transform={`rotate(-90 ${center} ${center})`}
        {...revealAnimation(reduceMotion, { strokeDashoffset: circumference }, { strokeDashoffset: targetOffset })}
      />
      <text x={center} y={center + size * 0.07} textAnchor="middle" fontSize={size * 0.28} fill="white" fontWeight={600}>
        {value}
      </text>
    </svg>
  );
}
```

- [ ] **Step 3: Create Gauge**

```tsx
// src/components/pulse/charts/Gauge.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

type GaugeProps = {
  value: number;
  color?: string;
  size?: number;
};

export default function Gauge({ value, color = "#22d3ee", size = 180 }: GaugeProps) {
  const reduceMotion = usePrefersReducedMotion();
  const strokeWidth = size * 0.09;
  const radius = size / 2 - strokeWidth;
  const center = size / 2;
  const circumference = Math.PI * radius;
  const clamped = Math.min(Math.max(value, 0), 100);
  const targetOffset = circumference - (clamped / 100) * circumference;
  const trackPath = `M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`;

  return (
    <svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`} aria-hidden="true">
      <path d={trackPath} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} strokeLinecap="round" />
      <motion.path
        d={trackPath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        {...revealAnimation(reduceMotion, { strokeDashoffset: circumference }, { strokeDashoffset: targetOffset })}
      />
    </svg>
  );
}
```

- [ ] **Step 4: Create Donut**

```tsx
// src/components/pulse/charts/Donut.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export type DonutSlice = { label: string; value: number; color: string };

type DonutProps = {
  data: DonutSlice[];
  size?: number;
};

export default function Donut({ data, size = 120 }: DonutProps) {
  const reduceMotion = usePrefersReducedMotion();
  const strokeWidth = size * 0.16;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1;

  let offsetAccum = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {data.map((slice) => {
        const fraction = slice.value / total;
        const dash = fraction * circumference;
        const dashOffset = -offsetAccum;
        offsetAccum += dash;

        return (
          <motion.circle
            key={slice.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={slice.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${circumference - dash}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            {...revealAnimation(reduceMotion, { strokeDashoffset: circumference }, { strokeDashoffset: dashOffset })}
          />
        );
      })}
    </svg>
  );
}
```

- [ ] **Step 5: Create HorizontalBar**

```tsx
// src/components/pulse/charts/HorizontalBar.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export type BarItem = { label: string; value: number };

type HorizontalBarProps = {
  data: BarItem[];
  color?: string;
  max?: number;
  valueFormatter?: (value: number) => string;
};

export default function HorizontalBar({
  data,
  color = "#22d3ee",
  max,
  valueFormatter = (value) => `${value}`,
}: HorizontalBarProps) {
  const reduceMotion = usePrefersReducedMotion();
  const scaleMax = max ?? Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="flex flex-col gap-2.5">
      {data.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-24 shrink-0 truncate text-[11px] text-slate-300">{item.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left rounded-full"
              style={{ width: `${(item.value / scaleMax) * 100}%`, backgroundColor: color }}
              {...revealAnimation(reduceMotion, { scaleX: 0 }, { scaleX: 1 })}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-[11px] text-slate-400">{valueFormatter(item.value)}</span>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Create ScatterPlot**

```tsx
// src/components/pulse/charts/ScatterPlot.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export type ScatterPoint = { id: string; x: number; y: number; r: number; label: string; color?: string };

type ScatterPlotProps = {
  data: ScatterPoint[];
  xLabel?: string;
  yLabel?: string;
};

export default function ScatterPlot({ data, xLabel = "Spend", yLabel = "Engagement" }: ScatterPlotProps) {
  const reduceMotion = usePrefersReducedMotion();
  const size = 220;
  const padding = 20;

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <line x1={padding} y1={size - padding} x2={size - padding} y2={size - padding} stroke="rgba(255,255,255,0.15)" />
        <line x1={padding} y1={padding} x2={padding} y2={size - padding} stroke="rgba(255,255,255,0.15)" />
        {data.map((point, index) => {
          const cx = padding + (point.x / 100) * (size - padding * 2);
          const cy = size - padding - (point.y / 100) * (size - padding * 2);

          return (
            <motion.circle
              key={point.id}
              cx={cx}
              cy={cy}
              r={point.r}
              fill={point.color ?? "#22d3ee"}
              fillOpacity={0.7}
              stroke={point.color ?? "#22d3ee"}
              strokeWidth={1.5}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              {...revealAnimation(
                reduceMotion,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1 },
                { duration: 0.5, ease: "easeOut", delay: index * 0.06 }
              )}
            />
          );
        })}
      </svg>
      <div className="mt-1 flex justify-between text-[9px] uppercase tracking-wide text-slate-500">
        <span>{xLabel} →</span>
        <span>↑ {yLabel}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Create MiniFunnel**

```tsx
// src/components/pulse/charts/MiniFunnel.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export type FunnelStage = { label: string; value: number };

type MiniFunnelProps = {
  data: FunnelStage[];
  color?: string;
};

export default function MiniFunnel({ data, color = "#22d3ee" }: MiniFunnelProps) {
  const reduceMotion = usePrefersReducedMotion();
  const max = data[0]?.value || 1;

  return (
    <div className="flex flex-col gap-1.5">
      {data.map((stage, index) => {
        const widthPct = Math.max((stage.value / max) * 100, 16);

        return (
          <motion.div
            key={stage.label}
            className="flex items-center gap-2"
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, x: -8 },
              { opacity: 1, x: 0 },
              { duration: 0.4, delay: index * 0.08 }
            )}
          >
            <div
              className="flex h-6 items-center justify-center rounded-md text-[10px] font-medium text-slate-950"
              style={{ width: `${widthPct}%`, backgroundColor: color, opacity: 1 - index * 0.15 }}
            >
              {stage.value.toLocaleString()}
            </div>
            <span className="w-20 shrink-0 text-[10px] text-slate-400">{stage.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 8: Create HeatMap**

```tsx
// src/components/pulse/charts/HeatMap.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

type HeatMapProps = {
  grid: number[][];
  color?: string;
};

export default function HeatMap({ grid, color = "#22d3ee" }: HeatMapProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-1">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((intensity, colIndex) => {
            const targetOpacity = 0.15 + intensity * 0.75;

            return (
              <motion.div
                key={colIndex}
                className="h-4 flex-1 rounded-sm"
                style={{ backgroundColor: color }}
                {...revealAnimation(
                  reduceMotion,
                  { opacity: 0, scale: 0.6 },
                  { opacity: targetOpacity, scale: 1 },
                  { duration: 0.3, delay: (rowIndex * row.length + colIndex) * 0.02 }
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 9: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors. `MotionTarget` is intentionally a closed union (`opacity`, `x`, `y`, `scale`, `scaleX`, `scaleY`, `strokeDashoffset`) so that animating a layout-affecting property (e.g. `width`) fails to typecheck — this is deliberate, not a bug. If a task legitimately needs a new animatable property not in this list, add it explicitly to the union in `revealAnimation.ts` rather than widening the type back to `Record<string, number | string>`. Confirm the prop is spread onto a `motion.*` element (not a plain DOM element) — framer-motion's target types accept these SVG presentation attributes and transform shorthands on `motion.*` components.

- [ ] **Step 10: Commit**

```bash
git add src/components/pulse/charts
git commit -m "Add hand-rolled SVG chart primitives for Pulse case study"
```

---

### Task 5: PhoneFrame component

**Files:**
- Create: `src/components/pulse/PhoneFrame.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/pulse/PhoneFrame.tsx
import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  label?: string;
  className?: string;
};

export default function PhoneFrame({ children, label, className = "" }: PhoneFrameProps) {
  return (
    <div className={`mx-auto w-full max-w-[300px] ${className}`}>
      <div className="relative aspect-[9/19.5] w-full rounded-[2.75rem] border-[6px] border-neutral-800 bg-neutral-800 shadow-2xl shadow-black/50">
        <div className="absolute left-1/2 top-2.5 z-10 h-4 w-24 -translate-x-1/2 rounded-full bg-neutral-900" />
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[2.25rem] bg-slate-950">
          {label ? (
            <div className="border-b border-white/10 bg-slate-900/80 px-4 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {label}
            </div>
          ) : (
            <div className="h-6" />
          )}
          <div className="flex-1 overflow-y-auto px-3 py-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/PhoneFrame.tsx
git commit -m "Add reusable PhoneFrame component"
```

---

### Task 6: PulseLogo component

**Files:**
- Create: `src/components/pulse/PulseLogo.tsx`

- [ ] **Step 1: Create the logo mark**

```tsx
// src/components/pulse/PulseLogo.tsx
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

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/PulseLogo.tsx
git commit -m "Add original PulseLogo mark"
```

---

### Task 7: Executive Feed screen

**Files:**
- Create: `src/components/pulse/screens/ExecutiveFeedScreen.tsx`

- [ ] **Step 1: Create the screen**

```tsx
// src/components/pulse/screens/ExecutiveFeedScreen.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingDown, ShieldCheck, AlertTriangle } from "lucide-react";
import Gauge from "../charts/Gauge";
import ProgressRing from "../charts/ProgressRing";
import Sparkline from "../charts/Sparkline";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { executiveFeed, statusColor } from "../content";

export default function ExecutiveFeedScreen() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="flex flex-col items-center gap-1 pt-1">
        <Gauge value={executiveFeed.overallScore} color={statusColor[executiveFeed.overallStatus]} size={140} />
        <p className="-mt-6 text-2xl font-semibold">{executiveFeed.overallScore}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Executive Health Score</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {executiveFeed.cards.map((card) => (
          <motion.div
            key={card.id}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-2.5"
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ProgressRing value={card.score} color={statusColor[card.status]} size={48} strokeWidth={5} />
            <p className="text-center text-[10px] font-medium leading-tight text-slate-200">{card.label}</p>
            <Sparkline data={card.trend} color={statusColor[card.status]} className="h-4 w-14" />
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Signals to Watch</p>
        <ul className="flex flex-col gap-2">
          {executiveFeed.watchList.map((item) => {
            const Icon = item.status === "risk" ? AlertTriangle : item.status === "excellent" ? ShieldCheck : TrendingDown;
            return (
              <li key={item.id} className="flex items-start gap-2 text-[11px] text-slate-300">
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: statusColor[item.status] }} />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors, no unused-import warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/screens/ExecutiveFeedScreen.tsx
git commit -m "Add Executive Feed phone screen"
```

---

### Task 8: Customer Intelligence screen

**Files:**
- Create: `src/components/pulse/screens/CustomerIntelligenceScreen.tsx`

- [ ] **Step 1: Create the screen**

```tsx
// src/components/pulse/screens/CustomerIntelligenceScreen.tsx
"use client";

import Donut from "../charts/Donut";
import ScatterPlot from "../charts/ScatterPlot";
import { customerIntelligence } from "../content";

export default function CustomerIntelligenceScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="grid grid-cols-3 gap-2">
        {customerIntelligence.stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center">
            <p className="text-sm font-semibold text-cyan-300">{stat.value}</p>
            <p className="mt-0.5 text-[8.5px] leading-tight text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Customer Value Matrix</p>
        <ScatterPlot data={customerIntelligence.valueMatrix} xLabel="Spend" yLabel="Engagement" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Lifecycle</p>
        <div className="flex items-center gap-3">
          <Donut
            data={customerIntelligence.lifecycle.map((stage) => ({
              label: stage.label,
              value: stage.value,
              color: stage.color,
            }))}
            size={72}
          />
          <ul className="flex flex-1 flex-col gap-1">
            {customerIntelligence.lifecycle.map((stage) => (
              <li key={stage.label} className="flex items-center justify-between text-[10px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.color }} />
                  {stage.label}
                </span>
                <span className="text-slate-400">{stage.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/screens/CustomerIntelligenceScreen.tsx
git commit -m "Add Customer Intelligence phone screen"
```

---

### Task 9: Commerce Intelligence screen

**Files:**
- Create: `src/components/pulse/screens/CommerceIntelligenceScreen.tsx`

- [ ] **Step 1: Create the screen**

```tsx
// src/components/pulse/screens/CommerceIntelligenceScreen.tsx
"use client";

import HorizontalBar from "../charts/HorizontalBar";
import Sparkline from "../charts/Sparkline";
import { commerceIntelligence } from "../content";

export default function CommerceIntelligenceScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="grid grid-cols-2 gap-2">
        {commerceIntelligence.overview.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-center">
            <p className="text-base font-semibold text-cyan-300">{stat.value}</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Category Performance</p>
        <HorizontalBar data={commerceIntelligence.categoryPerformance} color="#34d399" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Top Movers</p>
        <ul className="flex flex-col gap-2">
          {commerceIntelligence.topMovers.map((mover) => (
            <li key={mover.label} className="flex items-center justify-between gap-2">
              <span className="flex-1 truncate text-[10.5px] text-slate-200">{mover.label}</span>
              <Sparkline data={mover.trend} color={mover.changePct >= 0 ? "#34d399" : "#f59e0b"} className="h-4 w-12" />
              <span
                className={`w-10 shrink-0 text-right text-[10px] font-medium ${
                  mover.changePct >= 0 ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {mover.changePct >= 0 ? "+" : ""}
                {mover.changePct}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/screens/CommerceIntelligenceScreen.tsx
git commit -m "Add Commerce Intelligence phone screen"
```

---

### Task 10: Behavior Intelligence screen

**Files:**
- Create: `src/components/pulse/screens/BehaviorIntelligenceScreen.tsx`

- [ ] **Step 1: Create the screen**

```tsx
// src/components/pulse/screens/BehaviorIntelligenceScreen.tsx
"use client";

import Donut from "../charts/Donut";
import MiniFunnel from "../charts/MiniFunnel";
import HeatMap from "../charts/HeatMap";
import HorizontalBar from "../charts/HorizontalBar";
import { behaviorIntelligence } from "../content";

export default function BehaviorIntelligenceScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Signal Health</p>
          <p className="text-xl font-semibold text-cyan-300">{behaviorIntelligence.signalHealth}</p>
        </div>
        <p className="text-[10px] text-slate-400">Updated {behaviorIntelligence.freshnessMinutesAgo}m ago</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Top Behavioral Signals</p>
        <HorizontalBar data={behaviorIntelligence.topSignals} color="#22d3ee" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Signal Mix</p>
        <div className="flex items-center gap-3">
          <Donut data={behaviorIntelligence.signalMix} size={64} />
          <ul className="flex flex-1 flex-col gap-1">
            {behaviorIntelligence.signalMix.map((slice) => (
              <li key={slice.label} className="flex items-center justify-between text-[10px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: slice.color }} />
                  {slice.label}
                </span>
                <span className="text-slate-400">{slice.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Funnel</p>
        <MiniFunnel data={behaviorIntelligence.funnel} color="#22d3ee" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Engagement Heat Map</p>
        <HeatMap grid={behaviorIntelligence.heatmap} color="#22d3ee" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/screens/BehaviorIntelligenceScreen.tsx
git commit -m "Add Behavior Intelligence phone screen"
```

---

### Task 11: AI Briefing screen

**Files:**
- Create: `src/components/pulse/screens/AIBriefingScreen.tsx`

- [ ] **Step 1: Create the screen**

```tsx
// src/components/pulse/screens/AIBriefingScreen.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, AlertCircle, Lightbulb } from "lucide-react";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";
import { aiBriefing, type BriefingItem } from "../content";

const categoryIcon: Record<BriefingItem["category"], typeof Sparkles> = {
  changed: Sparkles,
  attention: AlertCircle,
  opportunity: Lightbulb,
};

const categoryColor: Record<BriefingItem["category"], string> = {
  changed: "#22d3ee",
  attention: "#f59e0b",
  opportunity: "#34d399",
};

export default function AIBriefingScreen() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-3 text-slate-100">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Today&apos;s Executive Summary</p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          Three items need your attention today, prioritized by impact and confidence.
        </p>
      </div>

      {aiBriefing.map((item, index) => {
        const Icon = categoryIcon[item.category];
        const color = categoryColor[item.category];

        return (
          <motion.div
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0 },
              { duration: 0.4, delay: index * 0.12 }
            )}
          >
            <div className="flex items-start gap-2">
              <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color }} />
              <div className="flex-1">
                <p className="text-[11px] font-semibold leading-snug text-slate-100">{item.title}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{item.detail}</p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[9px] uppercase tracking-wide text-slate-400">
                  <span className="rounded-full border border-white/10 px-2 py-0.5">Priority: {item.priority}</span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5">Impact: {item.impact}</span>
                  <span className="rounded-full border border-white/10 px-2 py-0.5">Confidence: {item.confidence}%</span>
                </div>
                <p className="mt-1.5 text-[10px] font-medium text-emerald-400">{item.estimatedValue}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/screens/AIBriefingScreen.tsx
git commit -m "Add AI Briefing phone screen"
```

---

### Task 12: Hero section

**Files:**
- Create: `src/components/pulse/sections/Hero.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/components/pulse/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import PulseLogo from "../PulseLogo";
import ExecutiveFeedScreen from "../screens/ExecutiveFeedScreen";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { heroFacts, disclaimerLabel, disclaimerBody } from "../content";

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-4 flex items-center gap-2 text-cyan-300">
            <PulseLogo className="h-6 w-6" />
            <p className="text-sm font-medium uppercase tracking-[0.35em]">Product Case Study</p>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Executive Companion Pulse</h1>
          <p className="mt-4 text-xl text-slate-300 md:text-2xl">
            An executive mobile intelligence platform — turning dense enterprise telemetry into
            decision-ready insight.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroFacts.map((fact) => (
              <div key={fact.label} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">{fact.label}</p>
                <p className="text-sm font-semibold text-slate-100">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PhoneFrame label="Executive Feed">
            <ExecutiveFeedScreen />
          </PhoneFrame>
        </motion.div>
      </div>

      <div className="mt-12 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
        <p className="text-sm leading-7 text-slate-300">
          <span className="font-semibold text-cyan-300">{disclaimerLabel} — </span>
          {disclaimerBody}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/sections/Hero.tsx
git commit -m "Add Pulse case study Hero section"
```

---

### Task 13: Case Study Overview section

**Files:**
- Create: `src/components/pulse/sections/CaseStudyOverview.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/components/pulse/sections/CaseStudyOverview.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";
import { caseStudyOverview } from "../content";

export default function CaseStudyOverview() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Case Study</p>
      <h2 className="mb-10 text-3xl font-semibold md:text-4xl">
        From side project to executive-sponsored initiative
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {caseStudyOverview.map((card, index) => (
          <motion.div
            key={card.eyebrow}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0 },
              { duration: 0.4, delay: index * 0.1 }
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{card.eyebrow}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-100">{card.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/sections/CaseStudyOverview.tsx
git commit -m "Add Case Study Overview section"
```

---

### Task 14: My Role section

**Files:**
- Create: `src/components/pulse/sections/MyRole.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/components/pulse/sections/MyRole.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";
import { roleLeadership, roleTechnical, velocityMetrics } from "../content";

export default function MyRole() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">My Role</p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">Sole product owner, concept to shipped app</h2>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Product Leadership</p>
          <ul className="flex flex-col gap-2.5">
            {roleLeadership.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Technical Direction</p>
          <ul className="flex flex-col gap-2.5">
            {roleTechnical.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-5">
        {velocityMetrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
            <p className="text-2xl font-semibold text-slate-100">{metric.value}</p>
            <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/sections/MyRole.tsx
git commit -m "Add My Role section"
```

---

### Task 15: NarrativeSection shared layout

**Files:**
- Create: `src/components/pulse/sections/NarrativeSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
// src/components/pulse/sections/NarrativeSection.tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

type NarrativeSectionProps = {
  eyebrow: string;
  title: string;
  bullets: string[];
  phoneLabel: string;
  reverse?: boolean;
  children: ReactNode;
};

export default function NarrativeSection({
  eyebrow,
  title,
  bullets,
  phoneLabel,
  reverse = false,
  children,
}: NarrativeSectionProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          className={reverse ? "lg:order-2" : undefined}
          {...revealAnimation(reduceMotion, { opacity: 0, x: reverse ? 16 : -16 }, { opacity: 1, x: 0 })}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">{eyebrow}</p>
          <h2 className="mb-5 text-3xl font-semibold md:text-4xl">{title}</h2>
          <ul className="flex flex-col gap-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className={reverse ? "lg:order-1" : undefined}
          {...revealAnimation(reduceMotion, { opacity: 0, x: reverse ? -16 : 16 }, { opacity: 1, x: 0 })}
        >
          <PhoneFrame label={phoneLabel}>{children}</PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/sections/NarrativeSection.tsx
git commit -m "Add shared NarrativeSection layout"
```

---

### Task 16: AI Briefing section (centerpiece)

**Files:**
- Create: `src/components/pulse/sections/AIBriefingSection.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/components/pulse/sections/AIBriefingSection.tsx
"use client";

import { motion } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import AIBriefingScreen from "../screens/AIBriefingScreen";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export default function AIBriefingSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">AI Briefing</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">The centerpiece: a briefing, not a dashboard</h2>
        <p className="mx-auto mb-10 max-w-2xl leading-7 text-slate-300">
          Instead of asking executives to interpret charts, Pulse synthesizes what changed, what needs
          attention, and where the opportunity is — with priority, impact, and confidence attached to
          every recommendation.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto"
        {...revealAnimation(reduceMotion, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1 })}
      >
        <PhoneFrame label="AI Briefing" className="max-w-[340px]">
          <AIBriefingScreen />
        </PhoneFrame>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/sections/AIBriefingSection.tsx
git commit -m "Add centerpiece AI Briefing section"
```

---

### Task 17: Outcome section

**Files:**
- Create: `src/components/pulse/sections/Outcome.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/components/pulse/sections/Outcome.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";
import { outcomeStatements, nextUp } from "../content";

export default function Outcome() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Outcome</p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">What happened</h2>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ul className="flex flex-col gap-4">
          {outcomeStatements.map((statement) => (
            <li key={statement} className="flex items-start gap-3 leading-7 text-slate-300">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              {statement}
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            What I&apos;d Build Next
          </p>
          <ul className="flex flex-col gap-3">
            {nextUp.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/sections/Outcome.tsx
git commit -m "Add Outcome section with What I'd Build Next"
```

---

### Task 18: Closing section

**Files:**
- Create: `src/components/pulse/sections/Closing.tsx`

- [ ] **Step 1: Create the section**

```tsx
// src/components/pulse/sections/Closing.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";
import { closingStatement } from "../content";

export default function Closing() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <motion.div
        className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 text-center md:p-12"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Why This Matters</p>
        <p className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-snug text-slate-100 md:text-3xl">
          {closingStatement}
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/pulse/sections/Closing.tsx
git commit -m "Add Closing pull-quote section"
```

---

### Task 19: Assemble the case study page

**Files:**
- Create: `src/app/work/executive-companion-pulse/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
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
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`, then open `http://localhost:3000/work/executive-companion-pulse`.
Expected: page renders top to bottom in order — Hero, Case Study Overview, My Role, four alternating NarrativeSections, AI Briefing centerpiece, Outcome, Closing. No console errors (check terminal running `npm run dev` and the browser devtools console).

- [ ] **Step 4: Commit**

```bash
git add src/app/work/executive-companion-pulse/page.tsx
git commit -m "Assemble Executive Companion Pulse case study page"
```

---

### Task 20: Update homepage Featured Work card

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the `work` array and card rendering**

Replace the existing `const work = [...]` declaration (currently lines 1–27) with:

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type WorkItem = {
  title: string;
  tag: string;
  text: string;
  href?: string;
  highlights?: string[];
};

const work: WorkItem[] = [
  {
    title: "Executive Companion Pulse",
    tag: "0→1 production mobile app",
    text: "Conceived, defined, and built a 0→1 executive mobile companion that transformed complex enterprise marketing telemetry into decision-ready insights, AI briefings, and actionable recommendations.",
    href: "/work/executive-companion-pulse",
    highlights: [
      "AI-assisted development",
      "React Native + TypeScript",
      "Executive intelligence dashboards",
      "Product strategy, UX, architecture, and delivery",
      "Grew from an innovation project into an executive-sponsored product initiative",
    ],
  },
  {
    title: "Product Catalog",
    tag: "$1.1M+ influenced ARR",
    text: "Led 0→1 strategy for a retail product intelligence capability that became a competitive differentiator across enterprise opportunities.",
  },
  {
    title: "AI Product Operating System",
    tag: "Weeks → days",
    text: "Built an AI-native PM workflow across PRDs, research, roadmap planning, Jira handoffs, release notes, and product knowledge management.",
  },
  {
    title: "Reqon",
    tag: "AI job search CRM",
    text: "Personal product build combining job pipeline management, scout search, AI fit analysis, resume tailoring, autofill, and career intelligence.",
  },
  {
    title: "AI Investment Manager",
    tag: "Explainable AI system",
    text: "Personal product build focused on AI-generated portfolio briefings, evidence-backed recommendations, risk controls, and human review.",
  },
];
```

Then replace the `<div className="grid gap-5 md:grid-cols-2">...</div>` block (the one that maps over `work`) with:

```tsx
<div className="grid gap-5 md:grid-cols-2">
  {work.map((item) => {
    const cardBody = (
      <>
        <p className="text-sm font-semibold text-cyan-300">{item.tag}</p>
        <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
        <p className="mt-4 leading-7 text-neutral-400">{item.text}</p>
        {item.highlights ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300"
              >
                {highlight}
              </span>
            ))}
          </div>
        ) : null}
        {item.href ? (
          <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
            View case study
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </p>
        ) : null}
      </>
    );

    if (item.href) {
      return (
        <Link
          key={item.title}
          href={item.href}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
        >
          {cardBody}
        </Link>
      );
    }

    return (
      <article key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        {cardBody}
      </article>
    );
  })}
</div>
```

- [ ] **Step 2: Typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Manual verification**

Run: `npm run dev`, open `http://localhost:3000/`, confirm the "Executive Companion Pulse" card shows the highlight pills and a "View case study →" affordance, and clicking it navigates to `/work/executive-companion-pulse`. Confirm the other four cards render unchanged (no highlights row, no link wrapper, `<article>` not `<a>`).

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Link homepage Featured Work card to Pulse case study"
```

---

### Task 21: Full QA pass

**Files:** none (verification only)

- [ ] **Step 1: Typecheck, lint, and production build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three succeed with exit code 0. `npm run build` output should list `/work/executive-companion-pulse` as a generated route.

- [ ] **Step 2: No-employer-mention check**

Run: `grep -ril "acoustic" src/ docs/superpowers/specs/2026-07-03-executive-companion-pulse-design.md docs/superpowers/plans/2026-07-03-executive-companion-pulse.md`
Expected: no matches (exit code 1 / "no matches found"). If any match is found in files this task touched, remove it before proceeding.

- [ ] **Step 3: Responsive check**

Run: `npm run dev`, open `http://localhost:3000/work/executive-companion-pulse`.
Resize the viewport to 1280px (desktop), 768px (tablet), and 375px (mobile).
Expected at every width: no horizontal scrollbar/overflow, `PhoneFrame` scales down and stays fully visible, alternating `NarrativeSection` layouts collapse to a single stacked column below the `lg` breakpoint (phone above or below copy, not clipped).

- [ ] **Step 4: Reduced-motion check**

Emulate `prefers-reduced-motion: reduce` (Chrome DevTools → Rendering tab → "Emulate CSS media feature prefers-reduced-motion", or OS-level "Reduce Motion" setting) and reload the page.
Expected: all charts render at their final values immediately (no draw-in), the hero phone does not float, `NarrativeSection` copy/phone pairs appear without a slide-in, and no console errors occur.

- [ ] **Step 5: Accessibility pass**

Run through with reduced-motion off:
- Tab through the page keyboard-only from the top: the "View case study →" homepage card link and the case study page itself should have no unreachable interactive elements and a visible focus ring (default browser outline is acceptable; do not add `outline: none` anywhere in this feature's code).
- Confirm every chart SVG has `aria-hidden="true"` (already set in Task 4) so screen readers don't attempt to read raw SVG paths — the surrounding text labels (already present in every screen, e.g. "Revenue Health", "Category Performance") carry the actual meaning.
- Confirm color is never the only signal: every status-colored element (health cards, briefing category icons, top-mover deltas) is paired with a text label or icon shape, not color alone — check this visually against the components in Tasks 7–11 (all already pair color with a label per the code above).
- Run `npx tsc --noEmit && npm run lint` one more time to confirm no accessibility-related lint rules from `eslint-config-next` (e.g. `jsx-a11y/*`) are failing.

Record the outcome of this step in prose (pass/fail per bullet) — this becomes part of the Task 22 accessibility review deliverable.

- [ ] **Step 6: Commit any fixes found during QA**

If Steps 2–5 required code changes, commit them individually with descriptive messages before moving to Task 22. If no changes were needed, skip this step.

---

### Task 22: Pre-merge deliverables and push

**Files:** none (process/deliverables only)

- [ ] **Step 1: Confirm branch and push**

Run: `git status` to confirm all case study commits are on `feature/current-focus-section` (the branch this work has been on throughout). Run: `git push -u origin feature/current-focus-section`.
Expected: push succeeds; branch is now available on the remote.

- [ ] **Step 2: Open the pull request**

Run: `gh pr create --title "Add Executive Companion Pulse case study" --body "$(cat <<'EOF'
## Summary
- Adds a new narrative-scroll case study page at /work/executive-companion-pulse recreating a 0-to-1 executive mobile app entirely in original HTML/CSS/React (no screenshots, no employer references, synthetic data only)
- Links the homepage Featured Work card to the new case study

## Test plan
- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build` all pass
- [ ] Manual check at desktop/tablet/mobile widths: no overflow, phone frames scale correctly
- [ ] Manual check with prefers-reduced-motion enabled: all content renders in final state, no animation
- [ ] grep confirms no employer name anywhere in the new code or docs

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"`
Expected: PR created; note the returned URL.

- [ ] **Step 3: Get a live preview link**

If this repo is connected to Vercel (check with the Vercel MCP tools or `git remote -v` / `.vercel/project.json`), the push in Step 1 should trigger a preview deployment automatically — retrieve its URL (e.g. via the Vercel dashboard or `vercel ls` if the CLI is set up). If no automatic deployment exists, run `npm run build && npm run start` locally and share `http://localhost:3000/work/executive-companion-pulse` as the preview link instead, noting it's local-only.

- [ ] **Step 4: Capture desktop and mobile screenshots**

Using the dev/preview server, capture one full-page screenshot at a desktop width (1280px) and one at a mobile width (375px) of `/work/executive-companion-pulse`. Attach both to the PR description or share them directly with Dustin for review.

- [ ] **Step 5: Write the self-review against the spec**

Go section-by-section through `docs/superpowers/specs/2026-07-03-executive-companion-pulse-design.md` and confirm each requirement was met: scope (5 screens, no tab nav), IP-safety policy (no employer name, synthetic data, disclaimer text verbatim), motion/accessibility rules, color guardrails (blue/cyan/navy/emerald dominant, no purple, indigo minor-only), homepage change, and the merge decisions recorded in the spec's "Implementation note". List any deviations found and why.

- [ ] **Step 6: Accessibility review write-up**

Summarize the results of Task 21 Step 5 (keyboard navigation, focus visibility, `aria-hidden` on decorative SVGs, color-plus-label pairing) as a short pass/fail list.

- [ ] **Step 7: Share build/lint results**

Paste the final output (or a summary) of `npx tsc --noEmit`, `npm run lint`, and `npm run build` from Task 21 Step 1 so Dustin can see a clean run before merging.

- [ ] **Step 8: Wait for Dustin's go-ahead before merging**

Do not merge the PR without explicit approval — present the PR link, preview link, screenshots, self-review, accessibility review, and build/lint results together and wait for confirmation, per Dustin's request to treat this as a launch rather than a routine merge.
