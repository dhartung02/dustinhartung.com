export const intro: string[] = [
  "An honest self-assessment, not a highlight reel — the strengths I'd put in front of a hiring committee, the areas I actively manage, and where I'm positioned in today's market.",
];

export type QuadrantItem = {
  title?: string;
  description: string;
};

export type Quadrant = {
  label: string;
  accent: string;
  items: QuadrantItem[];
};

export const quadrants: Quadrant[] = [
  {
    label: "Strengths",
    accent: "text-cyan-300",
    items: [
      {
        description:
          "Equally credible with engineers and executives — able to go deep technically in one conversation and translate straight into business impact in the next.",
      },
      {
        description:
          "Results-oriented and relentless about finding optimization opportunities — not satisfied with \"good enough\" once something ships.",
      },
      {
        description:
          "Stay close enough to the technology to understand constraints, challenge assumptions, and make informed trade-offs — without confusing technical fluency with owning every implementation decision.",
      },
    ],
  },
  {
    label: "Growth Areas",
    accent: "text-amber-300",
    items: [
      {
        title: "Controlling scope when I can see the larger system",
        description:
          "I naturally see the connections around a problem — the adjacent workflows, missing data, automation opportunities, and platform capabilities that could make the solution more complete. That systems thinking is valuable, but it can also create pressure to solve too much at once. I've had to become more deliberate about defining the smallest proof that will resolve the most important uncertainty, shipping that first, and treating the broader vision as a sequenced roadmap rather than an initial requirement. Executive Companion Pulse is a good example: I reduced the initial scope, placed unfinished capabilities behind feature flags, and focused the first release on proving that executives would value a fast, trusted mobile operating view.",
      },
      {
        title: "Staying at the technical altitude the decision requires",
        description:
          "Because I can engage directly with architecture, data models, and implementation decisions, I sometimes stay in the technical problem longer than the leadership decision requires. I manage that by defining the decision I'm trying to enable, setting a time boundary for investigation, and separating where my technical involvement adds leverage from where the team needs space to own the solution.",
      },
    ],
  },
  {
    label: "Opportunities",
    accent: "text-emerald-300",
    items: [
      {
        description:
          "AI-native product leadership is newly and specifically in demand — pairing deep data-platform expertise with hands-on AI fluency is a rare, timely combination.",
      },
      {
        description:
          "Embedding AI capabilities smartly into existing data and business workflows, rather than bolting AI on as a feature, is a growing mandate at most enterprises right now.",
      },
    ],
  },
  {
    label: "Threats",
    accent: "text-rose-300",
    items: [
      {
        title: "Being categorized too narrowly by domain",
        description:
          "Much of my experience sits at the intersection of customer data, marketing technology, analytics, and enterprise platforms. That depth is valuable, but it can cause recruiters to classify me as a MarTech specialist rather than recognizing the broader pattern: building data-intensive products, translating technical complexity into customer value, and operating across product, engineering, delivery, and commercial teams.",
      },
    ],
  },
];
