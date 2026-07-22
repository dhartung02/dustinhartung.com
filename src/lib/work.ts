export type WorkItem = {
  title: string;
  tag: string;
  text: string;
  href?: string;
  highlights?: string[];
};

export const work: WorkItem[] = [
  {
    title: "Executive Companion Pulse",
    tag: "0→1 production mobile app",
    text: "Conceived, designed, and built a 0→1 executive mobile companion that turned platform and product telemetry into a fast, trusted operating view for executives.",
    href: "/work/executive-companion-pulse",
    highlights: [
      "AI-assisted development",
      "React Native + TypeScript + Okta",
      "LaunchDarkly feature flags + DataDog observability",
      "Product strategy, UX, architecture, and delivery",
      "Grew from an innovation project into an executive-sponsored initiative",
    ],
  },
  {
    title: "Product Catalog",
    tag: "$1.1M+ influenced ARR",
    text: "Led 0→1 strategy for a retail product intelligence capability that became a competitive differentiator across enterprise opportunities.",
    href: "/work/product-catalog",
    highlights: [
      "React + TypeScript + GraphQL",
      "Category-drilldown and analytics-panel interaction model",
      "Product strategy, UX, and delivery",
      "Cited as a differentiator across enterprise sales opportunities",
    ],
  },
  {
    title: "AI Product Operating System",
    tag: "Weeks → days",
    text: "Built a system of Claude Skills that automates the PM workflow — PRDs, delivery tracking, engineering handoff, and release communication — keeping every artifact in sync.",
    href: "/work/ai-product-operating-system",
    highlights: [
      "Claude Skills + Jira + Confluence",
      "PRD, delivery record, and engineering stories kept in sync automatically",
      "Migrated from personal tooling into a company-wide skill library",
      "Cut PRD authoring time from weeks to days",
    ],
  },
  {
    title: "Reqon",
    tag: "AI job search CRM",
    text: "Personal product build combining job pipeline management, scout search, AI fit analysis, resume tailoring, autofill, and career intelligence.",
    href: "/work/reqon",
    highlights: [
      "React Native + Chrome Extension + Web",
      "Deterministic scout + optional, budget-capped AI assistance",
      "150+ real opportunities tracked",
      "Solo-built and production-shipped",
    ],
  },
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
];
