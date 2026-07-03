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
