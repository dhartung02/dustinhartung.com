export const intro: string[] = [
  "The same three pillars, told consistently, whoever's asking and whatever the question — so the narrative holds together across an entire interview process, not just one conversation.",
];

export type Pillar = {
  title: string;
  description: string;
};

export const pillars: Pillar[] = [
  {
    title: "Technical fluency that isn't secondhand",
    description:
      "I stay close enough to the technology to understand constraints, challenge assumptions, and make informed trade-offs — without confusing technical fluency with owning every implementation decision.",
  },
  {
    title: "Use-case-first strategist",
    description:
      "Every roadmap decision traces back to a specific persona, pain point, and the value they're chasing — not technology for its own sake.",
  },
  {
    title: "AI accelerates judgment, it doesn't replace it",
    description:
      "It all comes back to deeply understanding the use cases. AI doesn't replace that — it helps flesh them out more effectively and document them faster. AI is a tool and an accelerator, not a substitute for experience, domain knowledge, and good business and technical judgment.",
  },
];

export type PrepRow = {
  question: string;
  angle: string;
};

export const prepRows: PrepRow[] = [
  {
    question: "Your background is MarTech and data platforms — how does that translate here?",
    angle:
      "Customer data is the common thread, not MarTech specifically — every industry has customers, and the underlying work (turning ambiguous business and technical problems into commercial clarity) is domain-agnostic. Point to the range already covered: retail, automotive, and enterprise SaaS.",
  },
  {
    question: "You've carried broad scope, but you haven't held a VP Product title.",
    angle:
      "That's fair. I don't position myself as someone who's already held every responsibility of a large-company VP of Product. What I've carried is broader than my most recent title may suggest: multi-domain product ownership, commercial accountability, technical team leadership, platform strategy, executive stakeholder alignment, and the creation of new operating capabilities. I'm targeting roles where that scope is useful — Principal, Director, Product Lead, or Head of Product roles depending on the organization — not asking a company to ignore the distinction between demonstrated scope and a title I haven't yet held.",
  },
  {
    question: "How hands-on do you plan to stay at this level — will you still be writing code or building prototypes?",
    angle:
      "Staying hands-on isn't a stage I'm outgrowing, it's deliberate — used for validation and staying evidence-based, not because I don't delegate. I still hold the roadmap altitude and let the team own execution.",
  },
  {
    question: "Tell me about a time you had to say no to something important.",
    angle:
      "Aggressive prioritization is core to how I operate — most of what surfaces in discovery doesn't make the cut, and being able to explain why not is as important as explaining what did.",
  },
];
