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
};

export const executiveFeed = {
  overallScore: 82,
  overallStatus: "good" as Status,
  cards: [
    { id: "platform", label: "Platform Health", score: 91, status: "excellent", trend: [85, 86, 88, 87, 89, 90, 91] },
    { id: "adoption", label: "Product Adoption", score: 61, status: "watch", trend: [70, 68, 65, 63, 62, 60, 61] },
    { id: "customer", label: "Customer Activity", score: 74, status: "good", trend: [70, 71, 69, 73, 72, 75, 74] },
    { id: "operations", label: "Operational Status", score: 88, status: "excellent", trend: [60, 64, 68, 66, 72, 78, 88] },
  ] as HealthCardData[],
  watchList: [
    { id: "w1", label: "Product adoption trending down 9% this week", status: "watch" as Status },
    { id: "w2", label: "3 accounts showing reduced activity this week", status: "watch" as Status },
    { id: "w3", label: "Platform uptime steady at 99.98%", status: "excellent" as Status },
  ],
};

export type LifecycleStage = { label: string; value: number; color: string };

export const customerIntelligence = {
  stats: [
    { label: "Active Accounts", value: "1,284" },
    { label: "Avg. Engagement Score", value: "76" },
    { label: "Accounts Needing Review", value: "42" },
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
};

export const behaviorIntelligence = {
  signalHealth: 79,
  freshnessMinutesAgo: 6,
  topSignals: [
    { label: "Weekly active users", value: 92 },
    { label: "Feature adoption rate", value: 84 },
    { label: "Workflow completions", value: 71 },
    { label: "API usage volume", value: 58 },
    { label: "Report usage", value: 46 },
  ],
  signalMix: [
    { label: "Feature Usage", value: 38, color: statusColor.excellent },
    { label: "Engagement", value: 29, color: statusColor.good },
    { label: "Errors & Issues", value: 21, color: statusColor.watch },
    { label: "Account Info", value: 12, color: "#38bdf8" },
  ],
  funnel: [
    { label: "Sessions", value: 4200 },
    { label: "Active Users", value: 1860 },
    { label: "Feature Engaged", value: 640 },
    { label: "Repeat Use", value: 210 },
  ],
  heatmap: [
    [0.2, 0.4, 0.3, 0.6, 0.9],
    [0.1, 0.2, 0.5, 0.4, 0.3],
    [0.6, 0.7, 0.8, 0.9, 1.0],
    [0.3, 0.3, 0.2, 0.4, 0.5],
  ],
};

export type BriefingItem = {
  id: string;
  category: "changed" | "attention" | "opportunity";
  title: string;
  detail: string;
};

export const aiBriefing: BriefingItem[] = [
  {
    id: "b1",
    category: "changed",
    title: "Product adoption dipped this week",
    detail: "A conceptual example: a sudden shift in a usage metric is one of the patterns a future summary could call out.",
  },
  {
    id: "b2",
    category: "attention",
    title: "A handful of accounts show reduced activity",
    detail: "A conceptual example: multiple weeks of declining engagement is the kind of signal a future briefing might surface for review.",
  },
  {
    id: "b3",
    category: "opportunity",
    title: "A usage trend is accelerating ahead of plan",
    detail: "A conceptual example: an emerging positive trend is the kind of early signal a future briefing might flag for attention.",
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
  "AI-generated executive briefings",
  "Explainable anomaly and risk detection",
  "Recommended follow-up workflows",
  "Delegation and ownership tracking",
  "Drill-down to source data",
];

export const closingStatement =
  "Executives don't need more dashboards — they need a fast, trusted signal they can check from anywhere. Pulse is what that looks like when product thinking, UX, and hands-on engineering come from the same person.";
