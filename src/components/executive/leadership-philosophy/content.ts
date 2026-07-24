export const intro: string[] = [
  "Product strategy starts with the use case: who the persona is, what's actually blocking them, and what value they're trying to achieve. Everything else — roadmap, architecture, prioritization — is downstream of getting that right.",
];

export type Principle = {
  title: string;
  description: string;
};

export const principles: Principle[] = [
  {
    title: "Start with the use case, not the solution",
    description:
      "Personas, pain points, and the value they're chasing come before roadmap or architecture. If I can't articulate who's blocked and why, I'm not ready to prioritize.",
  },
  {
    title: "Bring business clarity to technical ambiguity",
    description:
      "Translating ambiguous technical and data problems into commercially clear decisions is the throughline of my career — from database production planning to AI-native product operations.",
  },
  {
    title: "Stay technically hands-on",
    description:
      "I stay close enough to the technology to understand constraints, challenge assumptions, and make informed trade-offs — without confusing technical fluency with owning every implementation decision.",
  },
  {
    title: "Earn trust through evidence, not promises",
    description:
      "Prove it works before you scale trust in it — deterministic before AI-assisted, paper trading before real money, MVP before full rollout.",
  },
  {
    title: "Institutionalize what works",
    description:
      "Solving a problem once isn't enough — turn it into a repeatable system others adopt, like an AI product operating model that became standard PM workflow, or an implementation toolkit that became the reference for an entire practice.",
  },
  {
    title: "Never deliver insights without action",
    description:
      "An insight without a clear next step is just noise. Every dashboard, every piece of analysis, every research finding should point to a decision.",
  },
];

export type Story = {
  title: string;
  subtitle: string;
  situation: string;
  options: string;
  decision: string;
  outcome: string;
  demonstrated: string[];
};

export const stories: Story[] = [
  {
    title: "Executive Companion Pulse",
    subtitle: "From opportunity to focused proof",
    situation:
      "Acoustic had extensive platform and product telemetry, but executives didn't have a fast, trusted way to understand product health and business performance away from the desktop. The obvious answer could have been a smaller version of the existing analytics experience — but that would have reproduced the platform rather than solving the executive use case.",
    options:
      "I could have waited for the capability to enter the formal roadmap, built a broad mobile analytics product, or created a deliberately narrow companion experience centered on the decisions executives needed to make.",
    decision:
      "I chose the narrow companion approach. I researched the competitive landscape, defined the executive personas and priority use cases, and reduced the initial product to the metrics and interactions that could prove the concept. Capabilities that weren't ready were hidden behind LaunchDarkly feature flags rather than delaying the entire experience. The trade-off was completeness — the first version wouldn't answer every question or reproduce every desktop workflow. It would, however, test whether executives valued immediate access to a clear operating view.",
    outcome:
      "I designed and built the React Native and TypeScript application, integrated Okta authentication, product and telemetry APIs, DataDog observability, and feature management, and took it through Apple review. What began as an independently developed innovation project gained executive sponsorship and became a broader company initiative.",
    demonstrated: [
      "Start with the use case",
      "Stay technically credible",
      "Reduce scope to resolve the most important uncertainty",
      "Earn support with working evidence rather than promises",
    ],
  },
  {
    title: "AI Product Operating System",
    subtitle: "Turning personal leverage into organizational capability",
    situation:
      "Product work repeatedly required recreating the same context across requirements, customer research, planning, Jira stories, Confluence documentation, engineering handoffs, and release communication. Individual AI experiments could make each task faster, but disconnected prompts wouldn't improve consistency across the product lifecycle.",
    options:
      "I could have kept the workflows as personal productivity tools, introduced a collection of reusable prompts, or designed a governed system in which common product activities shared context, structure, and quality expectations.",
    decision:
      "I built a reusable operating model using Claude Code skills, MCP integrations, and agentic workflows. The system connected product artifacts rather than treating each deliverable as an isolated writing task. The trade-off was that institutionalizing the approach required more upfront structure than simply generating documents on demand — skills needed defined inputs, outputs, handoff expectations, and review boundaries. AI also couldn't be allowed to replace product judgment or invent decisions that hadn't been made.",
    outcome:
      "The system reduced PRD development from weeks to days, improved consistency between requirements and engineering artifacts, and expanded from personal tooling into a reusable skill library other product managers now use. More importantly, it changed AI from an individual productivity shortcut into an operating capability that could be repeated and governed.",
    demonstrated: [
      "Institutionalize what works",
      "Use AI to accelerate judgment rather than replace it",
      "Build organizational leverage instead of depending on individual heroics",
    ],
  },
];
