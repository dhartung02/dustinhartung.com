// src/components/opsystem/content.ts

export type FactBadge = { label: string; value: string };

export const heroFacts: FactBadge[] = [
  { label: "System", value: "6 Claude Skills, one PM workflow" },
  { label: "Impact", value: "PRD authoring: weeks → days" },
  { label: "Stack", value: "Claude Skills + MCP + Jira + Confluence" },
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
      "Each skill reads from the same org structure, customer feedback, and competitive context, drafts the artifact, and keeps it in sync with the others — a PRD, its delivery record, and its engineering stories update together instead of drifting apart. MCP integrations let the workflows operate against the systems where product work actually lives — Jira and Confluence — rather than generating disconnected output for manual transfer, while keeping human review at every consequential handoff point.",
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
  "MCP integrations connecting skills directly to Jira and Confluence for delivery tracking and documentation",
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
