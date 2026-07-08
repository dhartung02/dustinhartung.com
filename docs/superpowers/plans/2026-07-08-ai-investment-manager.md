# AI Investment Manager Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new portfolio case study page at `/work/ai-investment-manager` recreating the real Command Center console from an actively-developed personal product, honestly framed around its real, gated build stage rather than the overclaiming homepage copy it currently has.

**Architecture:** A `src/components/invest/` directory following this repo's established one-directory-per-case-study convention: a `content.ts` single source of truth, standalone dashboard sub-components (`CommandCenterFrame`, `NextActionHero`, `SectionGrid`, `GateProgressStrip`), a root client component (`InvestmentApp`), and a `sections/` directory of page-flow sections assembled into a new App Router route. Reuses `../pulse/usePrefersReducedMotion.ts` and `../pulse/revealAnimation.ts` from the existing shared motion utilities.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion, lucide-react.

**Context for whoever executes this plan:** This should run in a fresh git worktree (e.g. `.claude/worktrees/investment-manager` on a new branch), created and given a copy of this plan file plus the design spec (`docs/superpowers/specs/2026-07-08-ai-investment-manager-design.md`) before Task 1 begins — the same setup pattern already used for the `product-catalog`, `opsystem`, and `reqon` case studies. This repo has no test framework; "tests" in the generic subagent-driven-development flow map to `npx tsc --noEmit` + `npm run lint`, with `npm run build` at integration checkpoints, exactly as specified in each task below.

---

### Task 1: Content config (content.ts)

**Files:**
- Create: `src/components/invest/content.ts`

- [ ] **Step 1: Write the file**

```ts
// src/components/invest/content.ts

export type FactBadge = { label: string; value: string };
export const heroFacts: FactBadge[] = [
  { label: "Product", value: "Self-hosted, local-first research platform" },
  { label: "Scale", value: "468+ commits, actively developed" },
  { label: "Stack", value: "FastAPI + Postgres + Streamlit" },
  { label: "AI Status", value: "Zero LLM calls in product to date" },
];

export const disclaimerLabel = "Real, In-Progress Product";
export const disclaimerBody =
  "This page recreates the real Command Center interface from an actively-developed personal product. The gate statuses shown (delivered / started / locked) reflect the real product's actual current state. No AI/LLM-generated content exists in the product yet at any gate; all recommendation and workflow logic shown is deterministic and human-reviewed.";

export type OverviewCard = { eyebrow: string; title: string; description: string };
export const caseStudyOverview: OverviewCard[] = [
  {
    eyebrow: "The Insight",
    title: "AI investing tools compete on hype, not trust",
    description:
      "Most AI investing products lead with a claim — smarter picks, better signals — that's easy to copy and hard to prove. The differentiated position isn't a smarter model; it's a system that can show exactly what it knew, where it learned it, and why it reached a conclusion.",
  },
  {
    eyebrow: "The Product Thesis",
    title: "Evidence before recommendations, paper trades before real money",
    description:
      "Every capability unlocks behind an explicit, named gate: research and evidence first, then conservative human-approved recommendations, then fake-money simulation, then — only later, and only with approval — real trading. AI is introduced deliberately, once earlier gates have proven trustworthy, not on day one.",
  },
  {
    eyebrow: "The Outcome",
    title: "A working evidence-to-decision pipeline, built without AI, by design",
    description:
      "Source tracking, signal review, human-approved recommendation packets, and fake-money paper simulation are built and functioning end to end — entirely deterministic, zero LLM calls, with a human required to approve every consequential step.",
  },
];

export type RoleItem = string;
export const roleLeadership: RoleItem[] = [
  "Designed the capability-gate model itself — six named gates, each unlocking only when explicitly started, so AI and automation are earned rather than assumed",
  "Wrote the public positioning strategy: lead with transparency and evidence, not with claims of beating the market",
  "Defined the conservative recommendation action set (watch / research more / avoid for now / paper-track candidate) — deliberately excluding buy/sell, price targets, or allocation until much later gates",
  "Set the human-approval requirement as a non-negotiable boundary at every gate, including the ones already built",
];
export const roleTechnical: RoleItem[] = [
  "Backend: FastAPI + Postgres, with an append-only audit trail across sources, signals, packets, and paper orders",
  "Dashboard: a modularized Streamlit app (shared API/state/UI helpers, extracted page renderers) covering 30+ workflow pages",
  "Built the Command Center console: a deterministic next-best-action engine aggregating status across every workflow area",
  "Built the recommendation-packet and paper-simulation-handoff state machines, including a 9-section approval checklist and an 11-state paper-handoff eligibility engine",
];

export const outcomeStatements: string[] = [
  "Gate 1 (Evidence & Research Foundation) and Gate 2 (Investment Cockpit & Manual Portfolio Context) are fully delivered.",
  "Gate 3 (Explainable Human-Approved Recommendations) and Gate 4 (Paper-Money Simulation) have started, in conservative, deterministic form.",
  "Zero AI or LLM calls exist in the product to date, at any gate — every signal, score, and recommendation is deterministic and evidence-linked.",
  "Every consequential action, from a recommendation packet to a paper trade, requires explicit human approval.",
];
export const nextUp: string[] = [
  "Gate 3's AI-assisted explanation layer — synthesizing evidence into plain-English rationale, still human-approved, never auto-acting",
  "Gate 5: real-money broker integration, starting with read-only sync before any user-approved trade ticket",
  "Gate 6: guardrailed automation, disabled by default, only after real-money gates prove trustworthy",
  "Expanding the paper-trading trust ladder with performance tracking and prediction-accuracy scoring",
];
export const closingStatement =
  "The hardest part of building an AI investment manager isn't the AI. It's proving, one gate at a time, that it deserves to be trusted with your money.";

// ── Capability gates ─────────────────────────────────────────────────────

export type GateStatus = "delivered" | "started" | "locked";
export type Gate = { number: number; name: string; status: GateStatus; description: string };
export const gates: Gate[] = [
  {
    number: 1,
    name: "Evidence & Research Foundation",
    status: "delivered",
    description: "Provenance, signals, and the human review workflow.",
  },
  {
    number: 2,
    name: "Investment Cockpit & Manual Portfolio Context",
    status: "delivered",
    description: "Watched tickers and manual portfolio context — organization, not advice.",
  },
  {
    number: 3,
    name: "Explainable Human-Approved Recommendations",
    status: "started",
    description: "Conservative recommendation packets — watch / research more / avoid — human approval required.",
  },
  {
    number: 4,
    name: "Paper-Money Simulation",
    status: "started",
    description: "Fake-money simulated orders and positions, seeded only from approved packets.",
  },
  {
    number: 5,
    name: "Real-Money Broker Integration With Approval",
    status: "locked",
    description: "Broker read-only sync first, then user-approved trade tickets with risk controls.",
  },
  {
    number: 6,
    name: "Guardrailed Automation",
    status: "locked",
    description: "Limited automated execution within strict guardrails, disabled by default.",
  },
];

// ── Command Center mockup data ───────────────────────────────────────────

export type Urgency = "none" | "low" | "medium" | "high" | "critical";

export type NextAction = {
  label: string;
  urgency: Urgency;
  reason: string;
  opensTarget: string;
};
export const nextAction: NextAction = {
  label: "Review signals awaiting evidence",
  urgency: "medium",
  reason:
    "AAPL and NVDA each have a grounded signal ready for human review before it can move toward a recommendation packet.",
  opensTarget: "Review Pipeline",
};

export const nextActionBoundary =
  "This is workflow routing only. It does not recommend investments, rank tickers, score, allocate, or trade.";

export type SectionCard = {
  key: string;
  title: string;
  statusLabel: string;
  urgency: Urgency;
  lastReviewed: string;
  detail: string[];
};
export const sectionGrid: SectionCard[] = [
  {
    key: "workflow_inbox",
    title: "Workflow Inbox",
    statusLabel: "1 item needs attention",
    urgency: "medium",
    lastReviewed: "Reviewed 2 days ago",
    detail: [
      "Aggregates open work items across every review surface into one triage list.",
      "Routes to the specific page that owns each item — never resolves anything itself.",
    ],
  },
  {
    key: "review_pipeline",
    title: "Review Pipeline",
    statusLabel: "2 signals awaiting review",
    urgency: "medium",
    lastReviewed: "Reviewed yesterday",
    detail: [
      "Triages incomplete, ready, and reviewed signals for AAPL and NVDA.",
      "A signal must clear review before it can feed a recommendation packet.",
    ],
  },
  {
    key: "research_intake",
    title: "Research Intake",
    statusLabel: "All caught up",
    urgency: "none",
    lastReviewed: "Reviewed today",
    detail: [
      "User-triggered staging: promote source candidates, extract facts, draft candidate signals.",
      "No scheduler, no live providers — every intake step is explicitly triggered by a human.",
    ],
  },
  {
    key: "paper_simulation",
    title: "Paper Simulation",
    statusLabel: "1 draft order ready for handoff review",
    urgency: "low",
    lastReviewed: "Reviewed 3 days ago",
    detail: [
      "Fake-money-only simulated accounts, orders, and positions.",
      "A paper order can only be created from an approved Gate 3 packet, and only on explicit request.",
    ],
  },
  {
    key: "decision_memory",
    title: "Decision Memory",
    statusLabel: "All caught up",
    urgency: "none",
    lastReviewed: "Reviewed today",
    detail: [
      "The human-authored decision journal: conclusions, rationale, and follow-up intent.",
      "Nothing here is generated — every entry is written by a human reviewer.",
    ],
  },
  {
    key: "investment_cockpit",
    title: "Investment Cockpit",
    statusLabel: "Portfolio context up to date",
    urgency: "none",
    lastReviewed: "Reviewed today",
    detail: [
      "Manual holdings, cash, and watch status — display metadata only.",
      "No performance calculation, allocation guidance, or position sizing at this gate.",
    ],
  },
  {
    key: "system_status",
    title: "System Status",
    statusLabel: "Healthy — no workflow debt",
    urgency: "none",
    lastReviewed: "Reviewed today",
    detail: [
      "Local data-intelligence and operating health, not investment health.",
      "Surfaces stale data, quarantined sources, or pending cleanup work.",
    ],
  },
];
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass with zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/content.ts
git commit -m "Add content config for AI Investment Manager case study"
```

---

### Task 2: CommandCenterFrame component

**Files:**
- Create: `src/components/invest/CommandCenterFrame.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/invest/CommandCenterFrame.tsx
import type { ReactNode } from "react";

type CommandCenterFrameProps = {
  children: ReactNode;
};

export default function CommandCenterFrame({ children }: CommandCenterFrameProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#16241C] px-4 py-3" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-rose-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-300/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <div className="ml-3 flex-1 rounded-md bg-black/20 px-3 py-1 text-[11px] text-slate-400">
          investment-manager.local/command-center
        </div>
      </div>
      <div className="bg-[#0E1A14]">{children}</div>
    </div>
  );
}
```

This is a standalone copy (not shared with `catalog/BrowserFrame.tsx`, `reqon/BrowserFrame.tsx`, or `opsystem/TerminalFrame.tsx`), per this repo's established one-copy-per-case-study convention. It uses the real product's actual canvas colors (`#16241C` chrome bar, `#0E1A14` content background) as arbitrary Tailwind values rather than a new named color token.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass with zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/CommandCenterFrame.tsx
git commit -m "Add CommandCenterFrame component"
```

---

### Task 3: NextActionHero component

**Files:**
- Create: `src/components/invest/NextActionHero.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/invest/NextActionHero.tsx
import { nextAction, nextActionBoundary, type Urgency } from "./content";

const urgencyClasses: Record<Urgency, string> = {
  none: "border-white/10 bg-white/5 text-slate-400",
  low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  medium: "border-amber-300/30 bg-amber-300/10 text-amber-300",
  high: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  critical: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export default function NextActionHero() {
  return (
    <div className="border-b border-white/10 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Next Workflow Action</p>
        <span
          className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase ${urgencyClasses[nextAction.urgency]}`}
        >
          {nextAction.urgency}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-[#E7EBE6]">{nextAction.label}</h3>
      <p className="mt-1.5 text-[13px] leading-6 text-slate-400">{nextAction.reason}</p>
      <p className="mt-1 text-[11px] text-slate-500">Opens: {nextAction.opensTarget}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className="rounded-md bg-[#C9A86A] px-4 py-2 text-[13px] font-semibold text-[#0E1A14]">
          Go → {nextAction.label}
        </button>
        <button type="button" className="rounded-md border border-white/10 px-4 py-2 text-[13px] text-slate-300">
          Start guided review
        </button>
      </div>

      <p className="mt-4 max-w-xl text-[12px] leading-5 text-slate-500">{nextActionBoundary}</p>
    </div>
  );
}
```

Both buttons are presentational/inert (no `onClick`), consistent with this repo's established pattern of not fabricating navigation to pages that aren't rebuilt (same treatment as Reqon's `OpportunityDetailPanel` action buttons).

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass with zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/NextActionHero.tsx
git commit -m "Add NextActionHero component"
```

---

### Task 4: SectionGrid component

**Files:**
- Create: `src/components/invest/SectionGrid.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/invest/SectionGrid.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { sectionGrid, type Urgency } from "./content";

type SectionGridProps = {
  expandedKey: string | null;
  onToggle: (key: string) => void;
};

const urgencyClasses: Record<Urgency, string> = {
  none: "border-white/10 bg-white/5 text-slate-400",
  low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  medium: "border-amber-300/30 bg-amber-300/10 text-amber-300",
  high: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  critical: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export default function SectionGrid({ expandedKey, onToggle }: SectionGridProps) {
  return (
    <div className="grid gap-3 p-5 pt-0 md:grid-cols-2">
      {sectionGrid.map((card) => {
        const expanded = expandedKey === card.key;
        const detailId = `section-detail-${card.key}`;
        return (
          <div key={card.key} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <button
              type="button"
              onClick={() => onToggle(card.key)}
              aria-expanded={expanded}
              aria-controls={detailId}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-[#E7EBE6]">{card.title}</p>
                <span
                  className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${urgencyClasses[card.urgency]}`}
                >
                  {card.urgency}
                </span>
              </div>
              <p className="mt-1 text-[12px] text-slate-400">{card.statusLabel}</p>
              <p className="mt-1 text-[11px] text-slate-500">{card.lastReviewed}</p>
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  id={detailId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="mt-3 flex flex-col gap-1.5 overflow-hidden border-t border-white/10 pt-3"
                >
                  {card.detail.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-[12px] leading-5 text-slate-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C9A86A]" />
                      {line}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
```

Note the structure: each card is a plain `<div>` containing a `<button>` (the clickable header, with `aria-expanded`/`aria-controls`) as a sibling to the expandable `<ul>` (referenced via matching `id`), rather than nesting the `<ul>` inside the `<button>` itself — this keeps the interactive element's content model clean.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass with zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/SectionGrid.tsx
git commit -m "Add SectionGrid component"
```

---

### Task 5: GateProgressStrip component

**Files:**
- Create: `src/components/invest/GateProgressStrip.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/invest/GateProgressStrip.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../pulse/revealAnimation";
import { gates, type GateStatus } from "./content";

const statusClasses: Record<GateStatus, string> = {
  delivered: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  started: "border-amber-300/40 bg-amber-300/10 text-amber-300",
  locked: "border-white/10 bg-white/5 text-slate-500",
};

const statusLabels: Record<GateStatus, string> = {
  delivered: "Delivered",
  started: "Started",
  locked: "Locked",
};

export default function GateProgressStrip() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="mt-8">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Capability Gates — What&apos;s Real Today
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {gates.map((gate, index) => (
          <motion.div
            key={gate.number}
            className={`rounded-lg border p-3 ${statusClasses[gate.status]}`}
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0 },
              { duration: 0.35, delay: index * 0.06 }
            )}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide opacity-80">Gate {gate.number}</p>
            <p className="mt-1 text-[12px] font-semibold leading-4">{gate.name}</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide">{statusLabels[gate.status]}</p>
            <p className="mt-1.5 text-[11px] leading-4 opacity-80">{gate.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

This is scroll-revealed and non-interactive, matching the treatment of AI Product Operating System's `WorkflowDiagram` — a status display, not a click-through workflow.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass with zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/GateProgressStrip.tsx
git commit -m "Add GateProgressStrip component"
```

---

### Task 6: InvestmentApp root component

**Files:**
- Create: `src/components/invest/InvestmentApp.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/invest/InvestmentApp.tsx
"use client";

import { useState } from "react";
import CommandCenterFrame from "./CommandCenterFrame";
import NextActionHero from "./NextActionHero";
import SectionGrid from "./SectionGrid";

export default function InvestmentApp() {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const handleToggle = (key: string) => {
    setExpandedKey((current) => (current === key ? null : key));
  };

  return (
    <CommandCenterFrame>
      <NextActionHero />
      <SectionGrid expandedKey={expandedKey} onToggle={handleToggle} />
    </CommandCenterFrame>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass with zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/InvestmentApp.tsx
git commit -m "Add InvestmentApp root component"
```

---

### Task 7: Hero section

**Files:**
- Create: `src/components/invest/sections/Hero.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/invest/sections/Hero.tsx
import { LineChart } from "lucide-react";
import { heroFacts, disclaimerLabel, disclaimerBody } from "../content";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
      <div className="mb-4 flex items-center gap-2 text-amber-300">
        <LineChart aria-hidden="true" className="h-6 w-6" />
        <p className="text-sm font-medium uppercase tracking-[0.35em]">Product Case Study</p>
      </div>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">AI Investment Manager</h1>
      <p className="mt-4 max-w-2xl text-xl text-slate-300 md:text-2xl">
        A real, actively-developed research platform that earns the right to use AI one gate at a time — evidence
        first, human approval always, automation last.
      </p>
      <p className="mt-4 max-w-2xl leading-7 text-slate-400">
        Most AI investing tools lead with a claim about smarter picks. This one leads with a capability-gate model:
        research and evidence today, conservative human-approved recommendations and paper trading in progress, real
        money and automation locked until they&apos;re earned.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {heroFacts.map((fact) => (
          <div key={fact.label} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">{fact.label}</p>
            <p className="text-sm font-semibold text-slate-100">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-5">
        <p className="text-sm leading-7 text-slate-300">
          <span className="font-semibold text-amber-300">{disclaimerLabel} — </span>
          {disclaimerBody}
        </p>
      </div>
    </section>
  );
}
```

No external link in this Hero (unlike Reqon's `reqon.app` link) — this product runs locally on a Mac mini and has no public URL, per the design spec.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass with zero errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/sections/Hero.tsx
git commit -m "Add Hero section"
```

---

### Task 8: CommandCenterSection (centerpiece)

**Files:**
- Create: `src/components/invest/sections/CommandCenterSection.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/invest/sections/CommandCenterSection.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import InvestmentApp from "../InvestmentApp";
import GateProgressStrip from "../GateProgressStrip";

export default function CommandCenterSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div className="mb-10" {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Try It</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">The real Command Center</h2>
        <p className="max-w-2xl leading-7 text-slate-300">
          This is the actual start-here console from the real product — a next-best-action engine and a
          workflow-status grid, not a stock picker. Click any section to see what it actually covers.
        </p>
      </motion.div>

      <InvestmentApp />
      <GateProgressStrip />
    </section>
  );
}
```

This is placed second in the page order (right after Hero), per the "lead with the centerpiece" lesson already applied to Product Catalog, AI Product Operating System, and Reqon.

- [ ] **Step 2: Verify it compiles and builds**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three pass with zero errors. (The route doesn't exist yet — this checks the component compiles cleanly on its own; the build will succeed even though nothing imports this component yet, since it's still valid, unused-nowhere TypeScript/TSX.)

- [ ] **Step 3: Commit**

```bash
git add src/components/invest/sections/CommandCenterSection.tsx
git commit -m "Add CommandCenterSection (centerpiece)"
```

---

### Task 9: CaseStudyOverview, MyRole, Outcome, Closing sections

**Files:**
- Create: `src/components/invest/sections/CaseStudyOverview.tsx`
- Create: `src/components/invest/sections/MyRole.tsx`
- Create: `src/components/invest/sections/Outcome.tsx`
- Create: `src/components/invest/sections/Closing.tsx`

- [ ] **Step 1: Write `CaseStudyOverview.tsx`**

```tsx
// src/components/invest/sections/CaseStudyOverview.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { caseStudyOverview } from "../content";

export default function CaseStudyOverview() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Case Study</p>
      <h2 className="mb-10 text-3xl font-semibold md:text-4xl">The story behind the system</h2>

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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">{card.eyebrow}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-100">{card.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `MyRole.tsx`**

```tsx
// src/components/invest/sections/MyRole.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { roleLeadership, roleTechnical } from "../content";

export default function MyRole() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">My Role</p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">
          Sole builder — product, architecture, and the gating model
        </h2>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Product Leadership</p>
          <ul className="flex flex-col gap-2.5">
            {roleLeadership.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Technical Direction
          </p>
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
    </section>
  );
}
```

- [ ] **Step 3: Write `Outcome.tsx`**

```tsx
// src/components/invest/sections/Outcome.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { outcomeStatements, nextUp } from "../content";

export default function Outcome() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Outcome</p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">What&apos;s real today</h2>
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
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">What&apos;s Next</p>
          <ul className="flex flex-col gap-3">
            {nextUp.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
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

Both lists MUST use `leading-7` and `mt-2.5` (16px text / 28px line-height, matching bullet-dot vertical alignment) — this exact font-size consistency bug (one list rendering smaller than the other) shipped in both Pulse's and Product Catalog's `Outcome.tsx` and had to be fixed after the fact. Land it correctly here from the start, as already done correctly in AI Product Operating System's and Reqon's `Outcome.tsx`.

- [ ] **Step 4: Write `Closing.tsx`**

```tsx
// src/components/invest/sections/Closing.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { closingStatement } from "../content";

export default function Closing() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <motion.div
        className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-8 text-center md:p-12"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Why This Matters</p>
        <p className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-snug text-slate-100 md:text-3xl">
          {closingStatement}
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 5: Verify all four files compile**

Run: `npx tsc --noEmit && npm run lint`
Expected: both pass with zero errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/invest/sections/CaseStudyOverview.tsx src/components/invest/sections/MyRole.tsx src/components/invest/sections/Outcome.tsx src/components/invest/sections/Closing.tsx
git commit -m "Add CaseStudyOverview, MyRole, Outcome, Closing sections"
```

---

### Task 10: Assemble the page

**Files:**
- Create: `src/app/work/ai-investment-manager/page.tsx`

- [ ] **Step 1: Write the file**

```tsx
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
```

Section order: Hero → CommandCenterSection (centerpiece) → CaseStudyOverview → MyRole → Outcome → Closing.

- [ ] **Step 2: Verify it compiles and builds**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three pass with zero errors; the build output should list a new route `○ /work/ai-investment-manager`.

- [ ] **Step 3: Commit**

```bash
git add src/app/work/ai-investment-manager/page.tsx
git commit -m "Assemble AI Investment Manager case study page"
```

---

### Task 11: Update homepage Featured Work card

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Find the existing entry**

```tsx
  {
    title: "AI Investment Manager",
    tag: "Explainable AI system",
    text: "Personal product build focused on AI-generated portfolio briefings, evidence-backed recommendations, risk controls, and human review.",
  },
```

- [ ] **Step 2: Replace it with**

```tsx
  {
    title: "AI Investment Manager",
    tag: "Gated evidence-to-decision pipeline",
    text: "Personal product build applying a deliberately gated, evidence-first approach to AI-assisted investing — deterministic recommendations and paper trading today, AI and real money introduced only as each gate earns trust.",
    href: "/work/ai-investment-manager",
    highlights: [
      "FastAPI + Postgres + Streamlit",
      "Human-approved recommendation packets, zero LLM calls to date",
      "468+ commits, actively developed",
      "Six-gate capability model: evidence → recommendations → paper trading → real money → automation",
    ],
  },
```

This corrects the previous `tag`/`text` (which described AI-generated capability that doesn't exist yet) as well as adding the link and highlights — do not touch any other entry in the `work` array.

- [ ] **Step 3: Verify it compiles and builds**

Run: `npx tsc --noEmit && npm run lint && npm run build`

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Correct and link the homepage AI Investment Manager card"
```

---

### Task 12: Static content and accuracy/privacy verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server and fetch the rendered page**

```bash
(lsof -ti:3600 | xargs kill -9 2>/dev/null; true)
nohup npm run dev -- -p 3600 > /tmp/invest-dev.log 2>&1 &
sleep 5
curl -s http://localhost:3600/work/ai-investment-manager -o /tmp/invest-page.html -w "%{http_code}\n"
```

Expected: `200`.

- [ ] **Step 2: Confirm key content renders**

```bash
grep -o "AI Investment Manager</h1>" /tmp/invest-page.html
grep -o "The real Command Center" /tmp/invest-page.html
grep -o "Real, In-Progress Product" /tmp/invest-page.html
grep -o "Gate 1" /tmp/invest-page.html
```

Expected: each grep prints at least one match.

- [ ] **Step 3: Privacy grep check**

```bash
grep -rni "portfolio.*\$[0-9]\|account.*[0-9]\{6,\}\|holdings.*\$" src/components/invest src/app/work/ai-investment-manager
```

Expected: no output (zero matches). This confirms no dollar figures or account-number-shaped strings suggesting real personal financial data were introduced — expected to trivially pass, since this content was never written to include any dollar amounts at all.

- [ ] **Step 4: Gate-accuracy check — this is the most important check for this case study**

Compare the `gates` array in `src/components/invest/content.ts` directly against the real product's canonical gate model. Read `~/Documents/ai_investment_manager_project/docs/01_product_requirements.md`, section `2A.3 Capability Gates (canonical forward model)`, and confirm every one of these six facts matches exactly:

1. Gate 1 "Evidence & Research Foundation" — status: Delivered (real doc says "current"/delivered foundation work).
2. Gate 2 "Investment Cockpit & Manual Portfolio Context" — status: Delivered (real doc explicitly says "is delivered").
3. Gate 3 "Explainable Human-Approved Recommendations" — status: Started (real doc explicitly says "has started").
4. Gate 4 "Paper-Money Simulation" — status: Started (real doc explicitly says "has also started").
5. Gate 5 "Real-Money Broker Integration With Approval" — status: Locked (real doc says "remain locked").
6. Gate 6 "Guardrailed Automation" — status: Locked (real doc says "remain locked").

Expected: all six match. If the real product's gate statuses have advanced since this plan was written (e.g. Gate 5 has since started), update `src/components/invest/content.ts`'s `gates` array to match the real, current state before proceeding — accuracy here is the entire point of this case study, more important than any other verification step in this plan.

- [ ] **Step 5: Clean up**

```bash
lsof -ti:3600 | xargs kill -9 2>/dev/null; true
```

- [ ] **Step 6: No commit for this task** (unless Step 4 required a content fix, in which case commit that fix with message `"Correct gate statuses to match the real product's current state"`).

---

### Task 13: Live interaction verification

**Files:** none (verification only)

- [ ] **Step 1: Attempt live click-through via the preview tooling**

Add a `.claude/launch.json` entry (if one doesn't already exist for this worktree) pointing at this worktree specifically, then use it to start a dev server and drive the page: click each of the 7 section cards in the Command Center mockup and confirm each expands to reveal its detail bullets, click again (or click a different card) and confirm the previous one collapses, and confirm the Gate Progress Strip renders all 6 gates with the correct statuses.

- [ ] **Step 2: If the environment's preview tooling can't reach this worktree's dev server correctly** (a known limitation encountered during the Pulse, Product Catalog, and Reqon builds — the tooling can launch a server from the wrong directory, or local module resolution can behave unexpectedly in a nested worktree), fall back to:
  - Static HTML checks (already done in Task 12).
  - Direct code tracing of the interaction model: confirm `InvestmentApp`'s `expandedKey` state is correctly passed to and read by `SectionGrid`, confirm `handleToggle`'s toggle-off logic (`current === key ? null : key`) correctly produces single-card-open-at-a-time behavior, confirm `SectionGrid` renders exactly 7 cards from `sectionGrid` in `content.ts`.
  - Disclose transparently in the spec's implementation note (Task 14) whichever verification path was actually used — do not claim a live click-through happened if it didn't.

- [ ] **Step 3: No commit for this task.**

---

### Task 14: Update design spec with implementation note

**Files:**
- Modify: `docs/superpowers/specs/2026-07-08-ai-investment-manager-design.md`

- [ ] **Step 1: Append an implementation note**

Add a new section at the end of the file summarizing what was built, confirming no structural deviations, disclosing exactly how Task 13's verification was actually performed (live click-through vs. static tracing), and confirming the Task 12 gate-accuracy check found all six gate statuses correct (or noting what was corrected if the real product had advanced since the plan was written).

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/specs/2026-07-08-ai-investment-manager-design.md
git commit -m "Note AI Investment Manager implementation status in design spec"
```

---

### Task 15: Full QA pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full verification suite from a clean state**

```bash
rm -rf .next
npx tsc --noEmit
npm run lint
npm run build
```

Expected: all four commands succeed with zero errors.

- [ ] **Step 2: Confirm accessibility basics**

```bash
grep -c "aria-hidden" src/components/invest/CommandCenterFrame.tsx
grep -c "aria-expanded" src/components/invest/SectionGrid.tsx
grep -c "aria-controls" src/components/invest/SectionGrid.tsx
```

Expected: each command prints a number ≥ 1.

- [ ] **Step 3: No commit for this task.**

---

### Task 16: Pre-merge deliverables

**Files:** none (git operations only)

- [ ] **Step 1: Push the branch**

```bash
git push -u origin worktree-ai-investment-manager
```

(Use whatever branch name the worktree was actually created with — this assumes the same `worktree-<name>` convention used for `worktree-reqon`, `worktree-opsystem`, etc.)

- [ ] **Step 2: Check for an existing PR**

```bash
gh pr list --head worktree-ai-investment-manager --state all --json number,state,url
```

- [ ] **Step 3: Open a PR if none exists**

```bash
gh pr create --base main --head worktree-ai-investment-manager --title "Add AI Investment Manager case study" --body "$(cat <<'EOF'
## Summary

- Adds a new case study at `/work/ai-investment-manager` for a real, actively-developed personal product — a self-hosted, evidence-first investment research platform (FastAPI + Postgres + Streamlit, 468+ commits).
- The interactive centerpiece recreates the real Command Center console (next-best-action hero card, 7-section workflow-status grid with click-to-expand detail) alongside a Gate Progress Strip showing the product's real, current capability-gate status (Gates 1–2 delivered, Gates 3–4 started in deterministic form, Gates 5–6 locked).
- This case study's core theme is honesty about build stage: the homepage previously implied AI-generated recommendations that don't exist yet in the real product. The corrected framing leads with the evidence-first, gated-trust discipline itself as the differentiator, grounded in the real product's own public positioning notes.
- Zero AI/LLM-generated content is shown anywhere on this page, matching the real product's actual current state.
- Updates the homepage's existing "AI Investment Manager" Featured Work card to correct its overclaiming text and link to the new case study page.

See `docs/superpowers/specs/2026-07-08-ai-investment-manager-design.md` for the full design spec, including an implementation note on verification.

## Test plan

- [x] `npx tsc --noEmit` — passes
- [x] `npm run lint` — passes
- [x] `npm run build` — passes, new route `○ /work/ai-investment-manager` appears in output
- [x] Static rendered-HTML content check
- [x] Privacy grep check — zero matches for dollar-figure or account-number-shaped strings
- [x] Gate-accuracy check — all six capability-gate statuses confirmed to match the real product's PRD `§2A.3` exactly
- [x] Live interaction verification — see the design spec's implementation note for exactly how this was performed (live click-through if the environment allowed it, otherwise static tracing, disclosed transparently either way)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 4: Report the resulting PR URL back to the user.**
