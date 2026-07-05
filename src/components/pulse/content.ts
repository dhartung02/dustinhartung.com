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
  { label: "Product", value: "0→1 mobile app" },
  { label: "Stack", value: "React Native + TypeScript" },
  { label: "Auth", value: "Okta" },
  { label: "Rollout", value: "LaunchDarkly" },
  { label: "Observability", value: "DataDog" },
  { label: "Shipped", value: "Apple App Store approved" },
  { label: "Approach", value: "AI-assisted development" },
];

export const disclaimerLabel = "Representative Product Demonstration";
export const disclaimerBody =
  "This page recreates the product experience using original HTML/CSS components and synthetic data. It illustrates the product concepts, UX, and technical implementation while avoiding reproduction of proprietary interfaces.";

export const caseStudyOverview = [
  {
    eyebrow: "The Insight",
    title: "Executives had data — just not fast access to it",
    description:
      "Executives had access to platform and product data, but it was fragmented across desktop dashboards, static reports, Slack and email updates, and status meetings. The gap wasn't more dashboards — it was faster confidence between meetings.",
  },
  {
    eyebrow: "The Product Thesis",
    title: "Compress the operating view, not replicate the desktop",
    description:
      "Mobile shouldn't recreate a desktop analytics workspace. The right experience is glanceable, secure, and configurable — trusted enough that executives could check in confidently between meetings.",
  },
  {
    eyebrow: "The Outcome",
    title: "From side project to executive-sponsored initiative",
    description:
      "After an internal demo, executive interest helped rally a team around the concept and move it from an unofficial effort into a funded, production-grade mobile initiative that shipped to the App Store.",
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
  "Okta authentication integration",
  "LaunchDarkly feature flags and phased rollout",
  "DataDog RUM and production observability",
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
  deltaPct: number;
};

export const executiveFeed = {
  overallScore: 82,
  overallStatus: "good" as Status,
  overallDeltaPct: 3,
  cards: [
    { id: "revenue", label: "Revenue Health", score: 91, status: "excellent", trend: [85, 86, 88, 87, 89, 90, 91], deltaPct: 12 },
    { id: "audience", label: "Audience Health", score: 74, status: "good", trend: [70, 71, 69, 73, 72, 75, 74], deltaPct: 6 },
    { id: "deliverability", label: "Deliverability Health", score: 88, status: "excellent", trend: [60, 64, 68, 66, 72, 78, 88], deltaPct: 4 },
    { id: "engagement", label: "Engagement Quality", score: 70, status: "good", trend: [65, 66, 68, 67, 69, 70, 70], deltaPct: 1 },
    { id: "product", label: "Product Momentum", score: 61, status: "watch", trend: [70, 68, 65, 63, 62, 60, 61], deltaPct: -9 },
    { id: "pipeline", label: "Pipeline Reliability", score: 85, status: "good", trend: [80, 82, 81, 83, 84, 84, 85], deltaPct: 2 },
  ] as HealthCardData[],
  risks: [
    { id: "w1", label: "Product momentum trending down 9% this week", categoryTag: "Product", status: "watch" as Status, confidence: 82 },
    { id: "w2", label: "3 audience segments showing reduced engagement this week", categoryTag: "Audience", status: "watch" as Status, confidence: 74 },
  ],
  opportunities: [
    { id: "o1", label: "Revenue trending toward a new high this month", categoryTag: "Revenue", status: "excellent" as Status, confidence: 88 },
    { id: "o2", label: "Engagement quality up across top segments", categoryTag: "Engagement", status: "good" as Status, confidence: 79 },
    { id: "o3", label: "Deliverability holding steady near an all-time high", categoryTag: "Deliverability", status: "excellent" as Status, confidence: 91 },
  ],
};

export type LifecycleStage = { label: string; value: number; color: string };

export const customerIntelligence = {
  stats: [
    { label: "Active Accounts", value: "1,284", deltaPct: 5 },
    { label: "Avg. Engagement Score", value: "76", deltaPct: 2 },
    { label: "New Customers", value: "231", deltaPct: 14 },
  ],
  lifecycle: [
    { label: "New", value: 18, color: statusColor.good },
    { label: "Growing", value: 34, color: statusColor.excellent },
    { label: "Stable", value: 31, color: statusColor.good },
    { label: "Needs Attention", value: 17, color: statusColor.watch },
  ] as LifecycleStage[],
  valueMatrix: [
    { id: "a1", x: 82, y: 74, r: 14, label: "Enterprise A" },
    { id: "a2", x: 45, y: 88, r: 10, label: "Growth B" },
    { id: "a3", x: 30, y: 32, r: 8, label: "SMB C" },
    { id: "a4", x: 68, y: 40, r: 12, label: "Mid-Market D" },
    { id: "a5", x: 20, y: 60, r: 7, label: "SMB E" },
    { id: "a6", x: 90, y: 90, r: 16, label: "Enterprise F" },
  ],
  whatToDo: [
    "Review the 3 accounts flagged for reduced activity this week.",
    "Prioritize outreach to accounts trending from Growing to Stable.",
    "Scale successful engagement patterns while momentum is positive.",
  ],
  retailDrillIn: {
    funnel: [
      { label: "Product Views", value: "18,204", deltaPct: 6 },
      { label: "Added to Cart", value: "4,932", deltaPct: 3 },
      { label: "Purchased", value: "1,614", deltaPct: -4 },
      { label: "Cart Abandoned", value: "3,318", deltaPct: 9, invert: true },
      { label: "Browse Abandoned", value: "9,847", deltaPct: 2, invert: true },
    ],
    trend: [
      { label: "Interest", color: statusColor.good, data: [52, 58, 55, 63, 68, 71] },
      { label: "Conversion", color: statusColor.excellent, data: [24, 26, 25, 29, 31, 33] },
    ],
  },
};

export const behaviorIntelligence = {
  signalHealth: 79,
  signalHealthDeltaPct: 3,
  freshnessMinutesAgo: 6,
  topSignals: [
    { label: "Weekly active users", value: 92, delta: 6 },
    { label: "Feature adoption rate", value: 84, delta: 9 },
    { label: "Workflow completions", value: 71, delta: -2 },
    { label: "API usage volume", value: 58, delta: 11 },
    { label: "Report usage", value: 46, delta: -4 },
  ],
  signalMix: [
    { label: "Feature Usage", value: 38, color: statusColor.excellent },
    { label: "Engagement", value: 29, color: statusColor.good },
    { label: "Errors & Issues", value: 21, color: statusColor.watch },
    { label: "Account Info", value: 12, color: "#38bdf8" },
  ],
  funnelEfficiency: [
    { label: "Sessions → Active", value: 44 },
    { label: "Active → Engaged", value: 34 },
    { label: "Engaged → Repeat", value: 33 },
  ],
  topFunctionalAreas: [
    { label: "Dashboards", value: 88, delta: 3 },
    { label: "Reporting", value: 74, delta: 5 },
    { label: "Data Export", value: 61, delta: -2 },
    { label: "Integrations", value: 52, delta: 8 },
    { label: "Mobile Access", value: 45, delta: 15 },
  ],
  heatmap: [
    [0.2, 0.4, 0.3, 0.6, 0.9],
    [0.1, 0.2, 0.5, 0.4, 0.3],
    [0.6, 0.7, 0.8, 0.9, 1.0],
    [0.3, 0.3, 0.2, 0.4, 0.5],
  ],
  userJourney: {
    stages: [
      ["Dashboard", "Search"],
      ["Reports", "Alerts"],
      ["Export", "Share"],
    ],
    flows: [
      { from: "Dashboard", to: "Reports", value: 62 },
      { from: "Dashboard", to: "Alerts", value: 18 },
      { from: "Search", to: "Reports", value: 24 },
      { from: "Search", to: "Alerts", value: 14 },
      { from: "Reports", to: "Export", value: 51 },
      { from: "Reports", to: "Share", value: 22 },
      { from: "Alerts", to: "Export", value: 9 },
      { from: "Alerts", to: "Share", value: 12 },
    ],
  },
};

export type BriefingCategory = "changed" | "watch" | "working" | "action";

export type BriefingItem = {
  id: string;
  category: BriefingCategory;
  title: string;
  deterministicDetail: string;
  aiEnhancedDetail: string;
};

export const briefingCategoryLabel: Record<BriefingCategory, string> = {
  changed: "What Changed",
  watch: "What To Watch",
  working: "What's Working",
  action: "Recommended Actions",
};

export const aiBriefing: BriefingItem[] = [
  {
    id: "b1",
    category: "changed",
    title: "Product momentum dipped this week",
    deterministicDetail:
      "Calculated automatically from usage telemetry — a rules-based comparison against the prior period.",
    aiEnhancedDetail:
      "Product momentum slipped this week, mostly concentrated in one segment — worth a quick look before it becomes a trend.",
  },
  {
    id: "b2",
    category: "watch",
    title: "A handful of accounts show reduced engagement",
    deterministicDetail: "Flagged deterministically once an account crosses a defined engagement-decline threshold.",
    aiEnhancedDetail:
      "A small group of previously-active accounts have gone quiet — reaching out now, while they're still recoverable, tends to work better than waiting.",
  },
  {
    id: "b3",
    category: "working",
    title: "A usage trend is accelerating ahead of plan",
    deterministicDetail: "Surfaced by a fixed rule comparing current trend velocity against target.",
    aiEnhancedDetail: "This trend is compounding faster than the same period last quarter — a good one to double down on.",
  },
  {
    id: "b4",
    category: "action",
    title: "Review accounts with declining engagement",
    deterministicDetail: "A standing recommendation tied directly to the watch-list rule above.",
    aiEnhancedDetail:
      "Start with the accounts with the highest historical value — the decline is early enough that personal outreach usually turns it around.",
  },
];

export const outcomeStatements = [
  "Gave executives and product leaders faster mobile access to trusted platform, product, and operational signals.",
  "Created a production-ready mobile foundation for executive visibility.",
  "Reduced dependence on manual status gathering and desktop-only dashboards.",
  "Demonstrated how AI-assisted development could accelerate a production-grade internal product from concept to App Store approval.",
  "Established reusable patterns for secure authentication, telemetry display, configurable cards, feature-flagged rollout, and production observability.",
];

export const nextUp = [
  "A proactive AI agent (via Model Context Protocol) that surfaces insight automatically, not just on request",
  "Explainable anomaly and risk detection",
  "Recommended follow-up workflows",
  "Delegation and ownership tracking",
  "Drill-down to source data",
];

export const closingStatement =
  "Executives don't need more dashboards — they need a fast, trusted signal they can check from anywhere. Pulse is what that looks like when product thinking, UX, and hands-on engineering come from the same person.";
