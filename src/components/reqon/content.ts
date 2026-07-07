// src/components/reqon/content.ts

export type FactBadge = { label: string; value: string };

export const heroFacts: FactBadge[] = [
  { label: "Product", value: "Self-hosted job-search CRM, 3 surfaces" },
  { label: "Scale", value: "150+ opportunities tracked" },
  { label: "Stack", value: "React Native + Chrome Extension + AI" },
  { label: "Outcome", value: "Solo-built, production-shipped" },
];

export const disclaimerLabel = "Representative Product Demonstration";
export const disclaimerBody =
  "This page recreates Reqon's real interface using original components and synthetic data. Company names, roles, statuses, and figures shown are entirely invented for illustration and do not reflect any real job search.";

export const reqonUrl = "https://reqon.app";

export const caseStudyOverview = [
  {
    eyebrow: "The Insight",
    title: "Job searches scatter across spreadsheets, tabs, and email",
    description:
      "Good-fit roles get missed, follow-ups get dropped, and application decisions become inconsistent — not because the roles aren't there, but because nothing holds the whole picture together.",
  },
  {
    eyebrow: "The Product Thesis",
    title: "A structured pipeline, with AI that assists but never decides",
    description:
      "Roles are captured, scored, and tracked through a repeatable pipeline. A deterministic scout does the discovery; AI assistance is optional, reviewable, budget-capped, and never auto-submitted — the system helps make better decisions, it doesn't make them for you.",
  },
  {
    eyebrow: "The Outcome",
    title: "A real, self-hosted system — not a portfolio exercise",
    description:
      "Reqon is a production product spanning a web dashboard, an iOS/iPadOS companion app, and a Chrome extension, actively used to track a real job search end to end.",
  },
];

export const roleLeadership = [
  "Identified the fragmentation across job boards, spreadsheets, email, and personal notes as one workflow problem, not a tooling gap",
  "Defined the deterministic-first, AI-optional product philosophy — scoring and recommendations are reviewable, editable, and budget-capped, never auto-submitted",
  "Designed the pipeline model: lifecycle stages, hygiene lanes, and an expected-value-ranked apply-next queue",
  "Scoped and sequenced three companion surfaces (web, iOS/iPadOS, Chrome) around distinct jobs — command-center management, quick review, and capture",
];

export const roleTechnical = [
  "React Native / Expo companion app for iOS/iPadOS",
  "Chrome extension for posting capture, inline scoring, and autofill",
  "Deterministic multi-ATS scout polling public board APIs (Greenhouse, Ashby, Lever, and others), no API key required",
  "Optional AI assistance on the OpenAI Responses API, with per-call token metering and daily budget caps",
];

export const outcomeStatements = [
  "Actively tracks 150+ real opportunities across a real job search, end to end.",
  "Shipped three companion surfaces — web, iOS/iPadOS, and Chrome — from a single self-hosted backend.",
  "Established a deterministic-first, human-controlled AI pattern: every AI output is reviewable, editable, and never auto-submitted.",
  "Solo-built and production-shipped, including a drafted App Store listing.",
];

export const nextUp = [
  "Deeper Gmail-based triage — auto-classifying more recruiter reply types beyond the current rejection/interview detection",
  "Expanded ATS coverage as more boards adopt public APIs",
  "Calendar-integrated interview scheduling, tied directly to the pipeline's interview stage",
  "A public-facing, shareable version of the analytics view for career coaching use cases",
];

export const closingStatement =
  "A job search is a product problem — structured data, a repeatable workflow, and just enough automation to remove the busywork without removing your judgment. This is what that looks like when you build the tool you actually need.";

// ── Dashboard: tabs, stats, action-needed ────────────────────────────────────

export type TabId = "today" | "open" | "applied" | "interviewing" | "rejected" | "analytics";

export type Tab = { id: TabId; label: string; count: number | null };

export const tabs: Tab[] = [
  { id: "today", label: "Today", count: 38 },
  { id: "open", label: "Open", count: 74 },
  { id: "applied", label: "Applied", count: 52 },
  { id: "interviewing", label: "Interviewing", count: 3 },
  { id: "rejected", label: "Rejected + Archived", count: 18 },
  { id: "analytics", label: "Analytics", count: null },
];

export type StatItem = { label: string; value: string; tone?: "amber" | "rose" | "emerald" };

export const statStrip: StatItem[] = [
  { label: "Open", value: "74" },
  { label: "Applied", value: "52" },
  { label: "Follow-up due", value: "31", tone: "amber" },
  { label: "Rejected", value: "18", tone: "rose" },
  { label: "Interviews", value: "3", tone: "emerald" },
  { label: "Offers", value: "0" },
  { label: "Total roles", value: "158" },
  { label: "Tier A", value: "41" },
  { label: "Response rate", value: "5.8%" },
  { label: "Avg days→contact", value: "3.4" },
];

export type ActionCard = { count: number; title: string; description: string };

export const actionNeeded: ActionCard[] = [
  { count: 2, title: "New since last run", description: "Added since the last scout run, not yet applied" },
  { count: 5, title: "Needs verification", description: "Unverified links — confirm the live posting first" },
  { count: 19, title: "Apply next", description: "Tier A/B · verified · still open · not applied" },
  { count: 12, title: "Tier A · not applied", description: "Top-tier roles you haven't applied to yet" },
  { count: 31, title: "Follow-up due", description: "Active applications gone quiet past your threshold" },
  { count: 6, title: "Recently closed", description: "Postings detected closed — review and archive" },
  { count: 3, title: "In interviews", description: "Active interview-stage conversations" },
];

// ── Opportunities (synthetic sample) ─────────────────────────────────────────

export type Opportunity = {
  id: string;
  role: string;
  company: string;
  tier: "A" | "B" | "C";
  fitLabel: "Excellent" | "Strong" | "Possible" | "Low priority";
  stage: "open" | "applied" | "interviewing" | "rejected";
  today: boolean;
  fit: number;
  probability: number;
  ev: number;
  location: string;
  salaryRange: string;
  linkConfidence: "Verified" | "Board-only" | "Unverified";
  nextAction: string;
};

export const opportunities: Opportunity[] = [
  {
    id: "op-northwind",
    role: "Senior PM, Growth",
    company: "Northwind Analytics",
    tier: "A",
    fitLabel: "Excellent",
    stage: "open",
    today: true,
    fit: 8.2,
    probability: 6.5,
    ev: 5.3,
    location: "Remote (US)",
    salaryRange: "$170K–210K est.",
    linkConfidence: "Verified",
    nextAction: "Apply this week — Tier A, verified, still open",
  },
  {
    id: "op-fernbridge",
    role: "Principal PM, Platform",
    company: "Fernbridge Labs",
    tier: "A",
    fitLabel: "Strong",
    stage: "open",
    today: true,
    fit: 7.6,
    probability: 5.8,
    ev: 4.4,
    location: "Hybrid (Austin)",
    salaryRange: "$180K–220K est.",
    linkConfidence: "Verified",
    nextAction: "Tier A, not yet applied — prioritize",
  },
  {
    id: "op-lumen",
    role: "Group PM, Data",
    company: "Lumen Robotics",
    tier: "B",
    fitLabel: "Strong",
    stage: "open",
    today: false,
    fit: 7.0,
    probability: 5.2,
    ev: 3.6,
    location: "Remote (US)",
    salaryRange: "$155K–190K est.",
    linkConfidence: "Board-only",
    nextAction: "New since last scout run — review and verify",
  },
  {
    id: "op-solace",
    role: "Group PM, Data",
    company: "Solace Robotics",
    tier: "B",
    fitLabel: "Strong",
    stage: "applied",
    today: true,
    fit: 7.1,
    probability: 4.0,
    ev: 2.8,
    location: "Remote (US)",
    salaryRange: "$150K–180K est.",
    linkConfidence: "Unverified",
    nextAction: "Needs verification — confirm live posting",
  },
  {
    id: "op-cobalt",
    role: "Staff PM, Search",
    company: "Cobalt Systems",
    tier: "A",
    fitLabel: "Excellent",
    stage: "applied",
    today: true,
    fit: 8.0,
    probability: 5.0,
    ev: 4.0,
    location: "Remote (US)",
    salaryRange: "$185K–225K est.",
    linkConfidence: "Verified",
    nextAction: "Applied 16 days ago, no contact — follow up",
  },
  {
    id: "op-meridian",
    role: "Sr PM, Analytics",
    company: "Meridian Health",
    tier: "A",
    fitLabel: "Excellent",
    stage: "interviewing",
    today: true,
    fit: 8.4,
    probability: 7.2,
    ev: 6.0,
    location: "Hybrid (Boston)",
    salaryRange: "$175K–215K est.",
    linkConfidence: "Verified",
    nextAction: "Recruiter screen scheduled — prep guide ready",
  },
  {
    id: "op-palisade",
    role: "PM, Developer Tools",
    company: "Palisade Cloud",
    tier: "B",
    fitLabel: "Strong",
    stage: "interviewing",
    today: false,
    fit: 7.3,
    probability: 6.0,
    ev: 4.4,
    location: "Remote (US)",
    salaryRange: "$145K–175K est.",
    linkConfidence: "Verified",
    nextAction: "Hiring manager round next week",
  },
  {
    id: "op-thornbury",
    role: "Sr PM, Commerce",
    company: "Thornbury Retail",
    tier: "B",
    fitLabel: "Possible",
    stage: "rejected",
    today: false,
    fit: 6.2,
    probability: 3.1,
    ev: 1.9,
    location: "Remote (US)",
    salaryRange: "$140K–165K est.",
    linkConfidence: "Verified",
    nextAction: "Rejected after panel — archive",
  },
  {
    id: "op-ashgrove",
    role: "PM, Risk",
    company: "Ashgrove Fintech",
    tier: "C",
    fitLabel: "Low priority",
    stage: "rejected",
    today: false,
    fit: 4.8,
    probability: 2.0,
    ev: 1.0,
    location: "Onsite (NYC)",
    salaryRange: "$130K–155K est.",
    linkConfidence: "Board-only",
    nextAction: "Posting detected closed — review and archive",
  },
];

// ── Analytics ─────────────────────────────────────────────────────────────

export const insights: string[] = [
  "Best source by response rate: linkedin at 18% (2 of 11 applications).",
  "greenhouse has produced 0 responses from 14 applications — consider deprioritizing it.",
  "9 of your applications went through gated (login-walled) ATSs — fillable sources are faster to apply through if quality is comparable.",
  "Tier A: 22 of 41 applied, 2 responses so far.",
  "31 active applications are aging 14+ days without contact — consider a follow-up.",
  "18 rejections so far — 34.6% of applications.",
];

export type FunnelStage = { stage: string; count: number; pct: number };

export const conversionFunnel: FunnelStage[] = [
  { stage: "Applied", count: 52, pct: 100 },
  { stage: "Recruiter screen", count: 6, pct: 11.5 },
  { stage: "Hiring manager", count: 3, pct: 5.8 },
  { stage: "Panel", count: 2, pct: 3.8 },
  { stage: "Offer", count: 0, pct: 0 },
];

export type OutcomeBar = { label: string; count: number; pct: number; tone: "slate" | "emerald" | "rose" };

export const applicationOutcomes: OutcomeBar[] = [
  { label: "Awaiting reply", count: 31, pct: 59.6, tone: "slate" },
  { label: "In interview", count: 3, pct: 5.8, tone: "emerald" },
  { label: "Offer", count: 0, pct: 0, tone: "emerald" },
  { label: "Rejected", count: 18, pct: 34.6, tone: "rose" },
];

// ── Chrome extension illustration (synthetic) ────────────────────────────────

export type KeywordChip = { word: string; matched: boolean };

export const chromeExtension = {
  pageLabel: "Not on your board",
  pageTitle: "(8) New Product roles for you | LinkedIn",
  keywordCoverage: { matched: 3, total: 11, pct: 27 },
  keywords: [
    { word: "product", matched: true },
    { word: "roadmap", matched: true },
    { word: "stakeholder", matched: true },
    { word: "platform", matched: false },
    { word: "growth", matched: false },
    { word: "senior", matched: false },
    { word: "remote", matched: false },
    { word: "analytics", matched: false },
    { word: "cross-functional", matched: false },
    { word: "leadership", matched: false },
    { word: "kpi", matched: false },
  ] satisfies KeywordChip[],
  pipelineStats: { rolesTracked: 158, openNotApplied: 74 },
  topOpportunities: [
    { role: "Senior PM, Growth", company: "Northwind Analytics", score: 5.3 },
    { role: "Principal PM, Platform", company: "Fernbridge Labs", score: 4.4 },
    { role: "Group PM, Data", company: "Lumen Robotics", score: 3.6 },
  ],
};
