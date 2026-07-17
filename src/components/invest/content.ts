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
export const urgencyClasses: Record<Urgency, string> = {
  none: "border-white/10 bg-white/5 text-slate-400",
  low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  medium: "border-amber-300/30 bg-amber-300/10 text-amber-300",
  high: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  critical: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

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
