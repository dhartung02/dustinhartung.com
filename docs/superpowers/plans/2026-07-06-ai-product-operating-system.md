# AI Product Operating System Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new portfolio case study page at `/work/ai-product-operating-system` for a system of six real Claude Skills (PRD Builder, Objective Builder, Story Builder, Release Announcement Builder, PM Radar, PM Jira Digest) that automate the PM workflow from feature idea to shipped release, and link the homepage's existing "AI Product Operating System" Featured Work card to it.

**Architecture:** Mirrors the existing `src/components/pulse/` and `src/components/catalog/` case studies: a `content.ts` single source of truth, a `sections/` directory of page sections, reuse of `usePrefersReducedMotion`/`revealAnimation` from `src/components/pulse/`. Unlike the prior two case studies, the centerpiece is **not** an interactive app mockup — it's a static, data-driven SVG workflow diagram plus a scroll-revealed terminal-style transcript, because this product never had a GUI and building one would misrepresent the work.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript (`strict: true`), Tailwind CSS v4, Framer Motion, lucide-react. No test framework in this repo — verification per task is `npx tsc --noEmit` + `npm run lint`, with `npm run build` at integration points.

**Source of truth:** `docs/superpowers/specs/2026-07-06-ai-product-operating-system-design.md` — read it if anything in this plan is ambiguous.

**Critical IP-safety constraint, applies to every task below:** never write the employer's real name, the tracker's real internal name for the "Objective" record, the real internal customer-intelligence or competitive-intelligence connector name, or any real persona/squad name into any file. Jira, Confluence, Slack, and Obsidian are fine to use as real tool names. The transcript's demo feature is an invented, clearly-synthetic example ("self-service saved audience segments") — never the real PRD example found during research.

---

### Task 1: Content config (content.ts)

**Files:**
- Create: `src/components/opsystem/content.ts`

- [ ] **Step 1: Write the file**

```typescript
// src/components/opsystem/content.ts

export type FactBadge = { label: string; value: string };

export const heroFacts: FactBadge[] = [
  { label: "System", value: "6 Claude Skills, one PM workflow" },
  { label: "Impact", value: "PRD authoring: weeks → days" },
  { label: "Stack", value: "Claude Skills + Jira + Confluence" },
  { label: "Outcome", value: "Adopted into company-wide skill library" },
];

export const disclaimerLabel = "Representative Workflow Demonstration";
export const disclaimerBody =
  "This page illustrates a real AI-skill-based PM workflow using an original diagram and a synthetic example scenario. It does not reproduce the underlying skill source, internal company systems, or any real feature request; all names, tools, and data shown are for illustration.";

export const caseStudyOverview = [
  {
    eyebrow: "The Insight",
    title: "PM work was scattered across five tools with no memory between them",
    description:
      "A feature idea, its PRD, the committed delivery record, the engineering tickets, and the eventual release note all lived in different tools, updated by hand, one at a time. Nothing stayed in sync, and every PRD started from a blank page instead of what the team already knew.",
  },
  {
    eyebrow: "The Product Thesis",
    title: "Skills that read company context and write it back everywhere it needs to live",
    description:
      "Each skill reads from the same org structure, customer feedback, and competitive context, drafts the artifact, and keeps it in sync with the others — a PRD, its delivery record, and its engineering stories update together instead of drifting apart.",
  },
  {
    eyebrow: "The Outcome",
    title: "From a personal workflow hack to an adopted capability",
    description:
      "What started as scripts to save personal time became a formal, capability-based skill library other product managers now use — and PRD authoring time dropped from weeks to days.",
  },
];

export const roleLeadership = [
  "Identified the fragmentation across PRDs, delivery tracking, engineering handoff, and release communication as one workflow, not five separate problems",
  "Designed the PRD ↔ delivery record ↔ engineering story sync so the three artifacts never drift out of alignment",
  "Defined which company context — org ownership, customer signals, competitive positioning — each skill should read automatically instead of asking the PM to supply it",
  "Established the pattern that got these skills migrated from personal tooling into the company's formal, capability-based skill library",
];

export const roleTechnical = [
  "Claude Skills — structured markdown workflows with defined steps, reference files, and trigger phrases",
  "Integrated with Jira and Confluence for delivery tracking and documentation",
  "Connected to internal company-context and customer-intelligence systems for automatic enrichment",
  "Designed handoff points between skills so one skill's output becomes another skill's input",
];

export const outcomeStatements = [
  "PRD authoring time went from weeks to days.",
  "Eliminated the drift between a PRD, its delivery record, and its engineering stories — a change to one now propagates to the others.",
  "Reduced how often product managers had to manually re-explain context (org ownership, customer feedback, competitive positioning) the system could already surface automatically.",
  "Migrated from personal tooling into the company's formal, capability-based skill library, where other product managers now use it.",
];

export const nextUp = [
  "Roadmap update and stakeholder-communication skills, extending the same sync model beyond delivery into planning and reporting",
  "Competitive-landscape reporting as its own skill, not just a step inside PRD drafting",
  "Folding user research synthesis directly into the same context sources PRD drafting already reads from",
  "A quality-review pass on the delivery record itself, mirroring the PRD's existing review step",
];

export const closingStatement =
  "Product management doesn't need another tab — it needs the work it already produces to stay in sync with itself. This is what that looks like when the PM and the person building the workflow are the same person.";

// ── Workflow diagram ──────────────────────────────────────────────────────

export type DiagramNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  group: "context" | "artifact" | "informed";
};

export const diagramNodes: DiagramNode[] = [
  { id: "ctx-org", label: "Org Structure", x: 20, y: 16, w: 170, h: 48, group: "context" },
  { id: "ctx-customer", label: "Customer Signals", x: 210, y: 16, w: 180, h: 48, group: "context" },
  { id: "ctx-competitive", label: "Competitive Intel", x: 410, y: 16, w: 180, h: 48, group: "context" },
  { id: "idea", label: "Feature Idea", x: 20, y: 140, w: 130, h: 56, group: "artifact" },
  { id: "prd", label: "PRD", x: 210, y: 140, w: 110, h: 56, group: "artifact" },
  { id: "objective", label: "Objective", x: 390, y: 140, w: 140, h: 56, group: "artifact" },
  { id: "stories", label: "Stories", x: 600, y: 140, w: 120, h: 56, group: "artifact" },
  { id: "release", label: "Release Note", x: 790, y: 140, w: 150, h: 56, group: "artifact" },
  { id: "slack-email", label: "Slack + Email", x: 20, y: 264, w: 160, h: 56, group: "informed" },
  { id: "radar-digest", label: "PM Radar Digest", x: 250, y: 264, w: 180, h: 56, group: "informed" },
  { id: "jira-tickets", label: "Jira Tickets", x: 600, y: 264, w: 120, h: 56, group: "informed" },
  { id: "jira-digest", label: "Weekly Ticket Digest", x: 790, y: 264, w: 150, h: 56, group: "informed" },
];

export type DiagramEdge = {
  id: string;
  path: string;
  skill: string;
  color: string;
  markerId: string;
  bidirectional?: boolean;
  dashed?: boolean;
};

export const diagramEdges: DiagramEdge[] = [
  { id: "e-org-prd", path: "M105,64 L265,140", skill: "PRD Builder", color: "#22d3ee", markerId: "cyan", dashed: true },
  { id: "e-customer-prd", path: "M300,64 L265,140", skill: "PRD Builder", color: "#22d3ee", markerId: "cyan", dashed: true },
  { id: "e-competitive-prd", path: "M500,64 L265,140", skill: "PRD Builder", color: "#22d3ee", markerId: "cyan", dashed: true },
  { id: "e-idea-prd", path: "M150,168 L210,168", skill: "PRD Builder", color: "#22d3ee", markerId: "cyan" },
  { id: "e-prd-objective", path: "M320,168 L390,168", skill: "Objective Builder", color: "#fbbf24", markerId: "amber", bidirectional: true },
  { id: "e-objective-stories", path: "M530,168 L600,168", skill: "Story Builder", color: "#34d399", markerId: "emerald", bidirectional: true },
  { id: "e-stories-release", path: "M720,168 L790,168", skill: "Release Announcement Builder", color: "#38bdf8", markerId: "sky" },
  { id: "e-slack-radar", path: "M180,292 L250,292", skill: "PM Radar", color: "#fb7185", markerId: "rose" },
  { id: "e-radar-stories", path: "M340,264 L660,196", skill: "PM Radar", color: "#fb7185", markerId: "rose", dashed: true },
  { id: "e-tickets-digest", path: "M720,292 L790,292", skill: "PM Jira Digest", color: "#2dd4bf", markerId: "teal" },
];

export type DiagramLegendItem = { skill: string; color: string; description: string };

export const diagramLegend: DiagramLegendItem[] = [
  { skill: "PRD Builder", color: "#22d3ee", description: "Drafts the PRD, pulling org, customer, and competitive context automatically." },
  { skill: "Objective Builder", color: "#fbbf24", description: "Creates the committed delivery record and keeps it synced with the PRD." },
  { skill: "Story Builder", color: "#34d399", description: "Creates engineering epics and stories, synced with the Objective." },
  { skill: "Release Announcement Builder", color: "#38bdf8", description: "Drafts the release note once stories ship." },
  { skill: "PM Radar", color: "#fb7185", description: "Digests Slack and email into decisions, blockers, and ticket candidates." },
  { skill: "PM Jira Digest", color: "#2dd4bf", description: "Produces a weekly, prioritized view of a PM's open tickets." },
];

// ── Skill transcript ──────────────────────────────────────────────────────

export type TranscriptTurn = { type: "prompt"; text: string } | { type: "output"; lines: string[] };

export const transcriptTitle = "prd-builder — session";

export const transcriptTurns: TranscriptTurn[] = [
  { type: "prompt", text: "/prd Self-service saved audience segments — marketers rebuild the same filters every campaign" },
  { type: "output", lines: ["Reading org structure...", "Identified likely owning team and stakeholder reviewers."] },
  {
    type: "output",
    lines: [
      "Checking customer intelligence...",
      "Found 14 related support tickets and 6 recent feedback mentions citing repeated manual segment rebuilding.",
    ],
  },
  {
    type: "output",
    lines: [
      "Checking competitive landscape...",
      "Two competitors already ship saved-segment functionality — this closes a parity gap, not just a nice-to-have.",
    ],
  },
  { type: "output", lines: ["Drafting problem statement, use case, and success metric..."] },
  {
    type: "output",
    lines: [
      "Problem: Marketers rebuild the same audience filters campaign after campaign, with no way to save or reuse them.",
      "Use Case: A marketer saves a segment once, then applies it directly to any new campaign.",
      "Success Metric: Time to launch a campaign against a previously-used audience drops from ~20 minutes of manual rebuilding to under 2 minutes.",
    ],
  },
  { type: "output", lines: ["PRD drafted. Hand off to Objective Builder to create the delivery record? (y/n)"] },
];
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `content.ts` (errors in other not-yet-created files are expected at this point and will resolve as later tasks land — there are none yet, since nothing imports this file).

- [ ] **Step 3: Commit**

```bash
git add src/components/opsystem/content.ts
git commit -m "Add content config for AI Product Operating System case study"
```

---

### Task 2: TerminalFrame component

**Files:**
- Create: `src/components/opsystem/TerminalFrame.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/opsystem/TerminalFrame.tsx
import type { ReactNode } from "react";

type TerminalFrameProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function TerminalFrame({ title, children, className = "" }: TerminalFrameProps) {
  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50 ${className}`}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-2 border-b border-white/10 bg-neutral-900/60 px-4 py-3"
      >
        <span className="h-3 w-3 rounded-full bg-[#f43f5e]" />
        <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
        <span className="h-3 w-3 rounded-full bg-[#10b981]" />
        <p className="ml-3 text-[11px] font-medium text-slate-500">{title}</p>
      </div>
      <div className="overflow-x-auto bg-black p-5 font-mono text-[13px] leading-6">{children}</div>
    </div>
  );
}
```

This is a generic terminal window (traffic-light dots, a window-title placeholder instead of a browser's address bar) — analogous to `BrowserFrame`/`PhoneFrame` in the other case studies, and not a reproduction of any real terminal emulator's branding.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `TerminalFrame.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/opsystem/TerminalFrame.tsx
git commit -m "Add TerminalFrame component"
```

---

### Task 3: WorkflowDiagram component

**Files:**
- Create: `src/components/opsystem/WorkflowDiagram.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/opsystem/WorkflowDiagram.tsx
import { diagramNodes, diagramEdges, diagramLegend } from "./content";

const markerColors: Record<string, string> = {
  cyan: "#22d3ee",
  amber: "#fbbf24",
  emerald: "#34d399",
  sky: "#38bdf8",
  rose: "#fb7185",
  teal: "#2dd4bf",
};

const groupStyles: Record<string, { fill: string; stroke: string; text: string }> = {
  context: { fill: "rgba(255,255,255,0.03)", stroke: "rgba(255,255,255,0.12)", text: "#94a3b8" },
  artifact: { fill: "rgba(34,211,238,0.06)", stroke: "rgba(34,211,238,0.35)", text: "#e2e8f0" },
  informed: { fill: "rgba(52,211,153,0.06)", stroke: "rgba(52,211,153,0.3)", text: "#e2e8f0" },
};

export default function WorkflowDiagram() {
  return (
    <div>
      <svg
        viewBox="0 0 960 340"
        className="h-auto w-full"
        role="img"
        aria-label="Workflow diagram: org structure, customer signals, and competitive intelligence feed the PRD Builder; the PRD, Objective, and Stories stay in sync with each other; Stories feed the Release Announcement Builder. Separately, PM Radar digests Slack and email into ticket candidates, and PM Jira Digest produces a weekly ticket digest."
      >
        <defs>
          {Object.entries(markerColors).map(([id, color]) => (
            <marker
              key={id}
              id={`arrow-${id}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 Z" fill={color} />
            </marker>
          ))}
        </defs>

        {diagramEdges.map((edge) => (
          <path
            key={edge.id}
            d={edge.path}
            fill="none"
            stroke={edge.color}
            strokeWidth={1.5}
            strokeDasharray={edge.dashed ? "5,4" : undefined}
            markerEnd={`url(#arrow-${edge.markerId})`}
            markerStart={edge.bidirectional ? `url(#arrow-${edge.markerId})` : undefined}
            opacity={0.85}
          />
        ))}

        {diagramNodes.map((node) => {
          const style = groupStyles[node.group];
          return (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx={10}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={1}
              />
              <text
                x={node.x + node.w / 2}
                y={node.y + node.h / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={style.text}
                fontSize={12}
                fontWeight={500}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {diagramLegend.map((item) => (
          <div key={item.skill} className="flex items-start gap-2.5">
            <span
              aria-hidden="true"
              className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-[13px] leading-6 text-slate-300">
              <span className="font-semibold text-slate-100">{item.skill}</span> — {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

This is a new hand-rolled SVG flowchart primitive — it is intentionally not reused from Pulse's `Sparkline`/`TrendBadge`/`DualLineChart`/`HorizontalBar` chart primitives, since none of those render a labeled node-and-arrow flowchart. `role="img"` plus the `aria-label` treats the whole diagram as one described graphic, matching how decorative-but-meaningful SVG content is handled elsewhere in this codebase (rather than trying to make every node/edge individually screen-reader-navigable, which would be noisy for a diagram like this).

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `WorkflowDiagram.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/opsystem/WorkflowDiagram.tsx
git commit -m "Add WorkflowDiagram component"
```

---

### Task 4: SkillTranscript component

**Files:**
- Create: `src/components/opsystem/SkillTranscript.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/opsystem/SkillTranscript.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../pulse/revealAnimation";
import TerminalFrame from "./TerminalFrame";
import { transcriptTitle, transcriptTurns } from "./content";

export default function SkillTranscript() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <TerminalFrame title={transcriptTitle}>
      <div className="flex flex-col gap-4">
        {transcriptTurns.map((turn, index) =>
          turn.type === "prompt" ? (
            <motion.p
              key={turn.text}
              className="text-emerald-400"
              {...revealAnimation(
                reduceMotion,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0 },
                { duration: 0.3, delay: index * 0.05 }
              )}
            >
              <span className="text-slate-500">❯ </span>
              {turn.text}
            </motion.p>
          ) : (
            <motion.div
              key={turn.lines[0]}
              className="flex flex-col gap-1 pl-4 text-slate-300"
              {...revealAnimation(
                reduceMotion,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0 },
                { duration: 0.3, delay: index * 0.05 }
              )}
            >
              {turn.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </motion.div>
          )
        )}
      </div>
    </TerminalFrame>
  );
}
```

This renders a scripted, static sequence of transcript turns, revealed with a small staggered scroll-in animation (`revealAnimation`, respecting `usePrefersReducedMotion`) — there is no click-to-advance affordance, per the design spec's explicit "no interactive app" constraint. Each turn uses its own text content as the React key (`turn.text` for prompts, `turn.lines[0]` for outputs) since every turn's content is unique — this avoids the array-index-as-key anti-pattern.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `SkillTranscript.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/opsystem/SkillTranscript.tsx
git commit -m "Add SkillTranscript component"
```

---

### Task 5: Hero section

**Files:**
- Create: `src/components/opsystem/sections/Hero.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/opsystem/sections/Hero.tsx
import { Workflow } from "lucide-react";
import { heroFacts, disclaimerLabel, disclaimerBody } from "../content";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
      <div className="mb-4 flex items-center gap-2 text-cyan-300">
        <Workflow aria-hidden="true" className="h-6 w-6" />
        <p className="text-sm font-medium uppercase tracking-[0.35em]">Product Case Study</p>
      </div>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">AI Product Operating System</h1>
      <p className="mt-4 max-w-2xl text-xl text-slate-300 md:text-2xl">
        A system of Claude Skills that turned a fragmented PM workflow — PRDs, delivery tracking, engineering
        handoff, release communication — into one that stays in sync with itself.
      </p>
      <p className="mt-4 max-w-2xl leading-7 text-slate-400">
        What started as personal tooling to save time became a formal, capability-based skill library other
        product managers now use — and PRD authoring time dropped from weeks to days.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {heroFacts.map((fact) => (
          <div key={fact.label} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">{fact.label}</p>
            <p className="text-sm font-semibold text-slate-100">{fact.value}</p>
          </div>
        ))}
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

No `"use client"` directive — this section has no hooks or browser APIs, so it's correctly a Server Component (matching the fix applied to Product Catalog's `Hero.tsx` during its own build).

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: errors that `../content` module resolves fine, but no other new errors from this file (there is no page importing it yet).

- [ ] **Step 3: Commit**

```bash
git add src/components/opsystem/sections/Hero.tsx
git commit -m "Add Hero section"
```

---

### Task 6: WorkflowSection (the centerpiece)

**Files:**
- Create: `src/components/opsystem/sections/WorkflowSection.tsx`

- [ ] **Step 1: Write the file**

```tsx
// src/components/opsystem/sections/WorkflowSection.tsx
"use client";

import { motion } from "framer-motion";
import WorkflowDiagram from "../WorkflowDiagram";
import SkillTranscript from "../SkillTranscript";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";

export default function WorkflowSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        className="mb-10 text-center"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">How It Works</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">One workflow, six skills, always in sync</h2>
        <p className="mx-auto max-w-2xl leading-7 text-slate-300">
          A feature idea becomes a PRD, a committed delivery record, and engineering stories — and a change to
          any one of those three updates the others. Two more skills keep a PM caught up on Slack, email, and
          Jira without leaving the flow to check.
        </p>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
      >
        <WorkflowDiagram />
      </motion.div>

      <motion.div className="mt-12" {...revealAnimation(reduceMotion, { opacity: 0, y: 16 }, { opacity: 1, y: 0 })}>
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
          What Running One Actually Looks Like
        </p>
        <SkillTranscript />
      </motion.div>
    </section>
  );
}
```

This is the page's single flagship visual moment, placed directly after Hero per the design spec — learning from the reorder applied to Product Catalog, this page does not bury its best asset behind two text sections. Both inner blocks (`WorkflowDiagram`, `SkillTranscript`) are revealed via `revealAnimation` scroll-triggers only — there is no click-driven interactivity anywhere in this section, and zero infinite-loop animations, matching the design spec's motion budget.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing `WorkflowSection.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/opsystem/sections/WorkflowSection.tsx
git commit -m "Add WorkflowSection (centerpiece)"
```

---

### Task 7: CaseStudyOverview, MyRole, Outcome, Closing sections

**Files:**
- Create: `src/components/opsystem/sections/CaseStudyOverview.tsx`
- Create: `src/components/opsystem/sections/MyRole.tsx`
- Create: `src/components/opsystem/sections/Outcome.tsx`
- Create: `src/components/opsystem/sections/Closing.tsx`

These four sections follow the exact structure already established and reviewed in the Product Catalog case study (which itself matches Pulse's structure). All four genuinely need `"use client"` for `framer-motion`/`usePrefersReducedMotion`.

- [ ] **Step 1: Write `CaseStudyOverview.tsx`**

```tsx
// src/components/opsystem/sections/CaseStudyOverview.tsx
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

- [ ] **Step 2: Write `MyRole.tsx`**

```tsx
// src/components/opsystem/sections/MyRole.tsx
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
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">Sole product owner, concept to shipped capability</h2>
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
    </section>
  );
}
```

- [ ] **Step 3: Write `Outcome.tsx`**

```tsx
// src/components/opsystem/sections/Outcome.tsx
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
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
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

Note this uses `leading-7`/`mt-2.5` on **both** lists from the start (16px/28px on both sides) — matching the font-consistency fix that had to be applied after the fact to both Pulse's and Product Catalog's `Outcome.tsx`. Writing it correctly here avoids reintroducing that already-fixed bug.

- [ ] **Step 4: Write `Closing.tsx`**

```tsx
// src/components/opsystem/sections/Closing.tsx
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

- [ ] **Step 5: Verify it all compiles**

Run: `npx tsc --noEmit`
Expected: no errors referencing any of the four new files.

- [ ] **Step 6: Commit**

```bash
git add src/components/opsystem/sections/CaseStudyOverview.tsx src/components/opsystem/sections/MyRole.tsx src/components/opsystem/sections/Outcome.tsx src/components/opsystem/sections/Closing.tsx
git commit -m "Add CaseStudyOverview, MyRole, Outcome, Closing sections"
```

---

### Task 8: Assemble the page

**Files:**
- Create: `src/app/work/ai-product-operating-system/page.tsx`

- [ ] **Step 1: Write the file**

```tsx
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
```

- [ ] **Step 2: Verify it compiles and builds**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three pass with zero errors; the build output lists the new route:
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /work/ai-product-operating-system
├ ○ /work/executive-companion-pulse
└ ○ /work/product-catalog
```

- [ ] **Step 3: Commit**

```bash
git add src/app/work/ai-product-operating-system/page.tsx
git commit -m "Assemble AI Product Operating System case study page"
```

---

### Task 9: Update homepage Featured Work card

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Find the existing card**

The homepage's `work` array already has an entry for this case study, with no `href` or `highlights` yet:

```tsx
  {
    title: "AI Product Operating System",
    tag: "Weeks → days",
    text: "Built an AI-native PM workflow across PRDs, research, roadmap planning, Jira handoffs, release notes, and product knowledge management.",
  },
```

- [ ] **Step 2: Replace it with**

```tsx
  {
    title: "AI Product Operating System",
    tag: "Weeks → days",
    text: "Built an AI-native PM workflow across PRDs, research, roadmap planning, Jira handoffs, release notes, and product knowledge management.",
    href: "/work/ai-product-operating-system",
    highlights: [
      "Claude Skills + Jira + Confluence",
      "PRD, delivery record, and engineering stories kept in sync automatically",
      "Migrated from personal tooling into a company-wide skill library",
      "Cut PRD authoring time from weeks to days",
    ],
  },
```

Do not touch the pre-existing `tag`/`text` fields — only add `href` and `highlights`, matching how the Product Catalog card was updated.

- [ ] **Step 3: Verify it compiles and builds**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all pass with zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "Link the homepage AI Product Operating System card to its new case study page"
```

---

### Task 10: Static content and IP-safety verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server and fetch the rendered page**

```bash
(lsof -ti:3300 | xargs kill -9 2>/dev/null; true)
nohup npm run dev -- -p 3300 > /tmp/opsystem-dev.log 2>&1 &
sleep 5
curl -s http://localhost:3300/work/ai-product-operating-system -o /tmp/opsystem-page.html -w "%{http_code}\n"
```

Expected: `200`.

- [ ] **Step 2: Confirm key content renders**

```bash
grep -o "AI Product Operating System</h1>" /tmp/opsystem-page.html
grep -o "One workflow, six skills, always in sync" /tmp/opsystem-page.html
grep -o "PM Radar Digest" /tmp/opsystem-page.html
grep -o "Objective Builder" /tmp/opsystem-page.html
```

Expected: each grep prints at least one match.

- [ ] **Step 3: IP-safety grep check — this must return zero matches for every pattern**

```bash
grep -rniE "acoustic|PES Objective|Oksana|Krysta|Keiko|Anthony|Alok\b|Obsidian(s|ians)\b|Incredibles|Helldivers|Lazy Pandas|aipoweredmarketer|work-plugins|Product Catalog Bulk Delete" src/components/opsystem src/app/work/ai-product-operating-system
```

Expected: no output (zero matches). If anything matches, stop and fix the offending file before proceeding — do not continue to the next task with a match unresolved.

Note: "Obsidian" alone (the note-taking app, referenced generically elsewhere in this repo's Pulse case study) is not on this list — only the possessive/plural forms that would refer to the real internal squad name are. This case study's own content does not reference Obsidian at all, so this distinction shouldn't matter in practice, but the regex is deliberately scoped to avoid a false positive against the app name if content ever changes.

- [ ] **Step 4: Stop the temporary dev server**

```bash
lsof -ti:3300 | xargs kill -9 2>/dev/null; true
```

- [ ] **Step 5: No commit for this task** (verification only, nothing to commit).

---

### Task 11: Full QA pass

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

Grep the new files for the established a11y conventions used elsewhere in this repo (decorative icons/chrome hidden from screen readers, meaningful SVG described via `aria-label`):

```bash
grep -c "aria-hidden" src/components/opsystem/TerminalFrame.tsx
grep -c "aria-label" src/components/opsystem/WorkflowDiagram.tsx
```

Expected: both commands print a number ≥ 1.

- [ ] **Step 3: No commit for this task** (verification only, nothing to commit).

---

### Task 12: Update design spec with an implementation note

**Files:**
- Modify: `docs/superpowers/specs/2026-07-06-ai-product-operating-system-design.md`

- [ ] **Step 1: Append an implementation note**

Add a new section at the end of the file:

```markdown
## Implementation note

Built as planned in `docs/superpowers/plans/2026-07-06-ai-product-operating-system.md` via subagent-driven-development. No structural deviations from this spec — the three-cluster workflow diagram (context sources, bidirectional build-and-sync lane, stay-informed lane) and the scroll-revealed, non-interactive transcript both landed as designed.

Verification: `npx tsc --noEmit`, `npm run lint`, and `npm run build` all pass. The IP-safety grep check specified in the implementation plan (Task 10, Step 3) returned zero matches for the employer name, the real internal terminology this spec generalizes away, and every real persona/squad name encountered during research.

Because this page has no click-driven interactivity — the centerpiece is a static diagram and a scroll-revealed transcript, not an app — the live-click-through verification step that applied to Pulse and Product Catalog's interaction models doesn't apply here in the same way. Verification instead focused on content accuracy and the IP-safety grep check above.
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/specs/2026-07-06-ai-product-operating-system-design.md
git commit -m "Note AI Product Operating System implementation status in design spec"
```

---

### Task 13: Pre-merge deliverables

**Files:** none (git operations only)

- [ ] **Step 1: Push the branch**

```bash
git push -u origin worktree-opsystem
```

- [ ] **Step 2: Check for an existing PR**

```bash
gh pr list --head worktree-opsystem --state all --json number,state,url
```

- [ ] **Step 3: Open a PR if none exists**

```bash
gh pr create --base main --head worktree-opsystem --title "Add AI Product Operating System case study" --body "$(cat <<'EOF'
## Summary

- Adds a new case study at `/work/ai-product-operating-system` for a system of six real Claude Skills (PRD Builder, Objective Builder, Story Builder, Release Announcement Builder, PM Radar, PM Jira Digest) that automate the PM workflow from feature idea to shipped release.
- Unlike Pulse and Product Catalog, there's no application UI to recreate — the centerpiece is a static, data-driven SVG workflow diagram (showing the real PRD/Objective/Stories bidirectional sync) plus a scroll-revealed terminal-style transcript of one skill actually running, not a fabricated interactive mockup.
- Updates the homepage's existing "AI Product Operating System" Featured Work card to link to the new case study page.
- No real employer name, internal terminology, or real persona/squad names anywhere — confirmed via an explicit grep check (see Task 10 of the implementation plan).

See `docs/superpowers/specs/2026-07-06-ai-product-operating-system-design.md` for the full design spec.

## Test plan

- [x] `npx tsc --noEmit` — passes
- [x] `npm run lint` — passes
- [x] `npm run build` — passes, new route `○ /work/ai-product-operating-system` appears in output
- [x] Static rendered-HTML content check
- [x] IP-safety grep check — zero matches for employer name, real internal terminology, and real persona/squad names
- [x] No live click-through needed — this page has no click-driven interactivity by design

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 4: Report the resulting PR URL back to the user.**
