export const intro: string[] = [
  "My first 90 days in a new product leadership role follow a deliberate arc: understand the system, align around the decisions that matter, then activate and prove the strategy.",
  "This approach reflects lessons from initiatives such as Executive Companion Pulse and the AI Product Operating System. In both cases, the breakthrough didn't come from starting with a large delivery plan. It came from identifying the decision or uncertainty that mattered most, building the smallest credible proof, and using evidence to earn broader organizational commitment.",
];

export type Phase = {
  range: string;
  title: string;
  primaryQuestion: string;
  activities: string[];
  outputs: string[];
};

export const phases: Phase[] = [
  {
    range: "Days 1–30",
    title: "Understand the System",
    primaryQuestion:
      "What is the organization trying to accomplish, and what is preventing it from doing so consistently?",
    activities: [
      "Review strategy, commitments, customer evidence, product performance, architecture, delivery health, and economics.",
      "Meet horizontally across executives, product, engineering, design, sales, customer success, finance, and operations.",
      "Trace two or three important customer or business outcomes through the full system rather than studying each department in isolation.",
    ],
    outputs: [
      "Current-state product and operating-system map.",
      "Explicit list of commitments, constraints, assumptions, and unresolved decisions.",
      "Initial evidence-quality assessment.",
      "No broad roadmap reset before understanding why current commitments exist.",
    ],
  },
  {
    range: "Days 31–60",
    title: "Align Around the Decisions",
    primaryQuestion: "Which few decisions would unlock the greatest customer and business value?",
    activities: [
      "Translate broad requests into personas, use cases, blockers, desired outcomes, and measurable value.",
      "Separate strategic problems from execution problems, and product gaps from operating-model gaps.",
      "Evaluate opportunities against customer impact, strategic fit, economics, confidence, effort, dependencies, and reversibility.",
    ],
    outputs: [
      "Prioritized opportunity and decision portfolio.",
      "Explicit \"not now\" list.",
      "Success measures and evidence plan for the leading bets.",
      "Alignment on the trade-offs, not merely agreement on a ranked feature list.",
    ],
  },
  {
    range: "Days 61–90",
    title: "Activate and Prove the Strategy",
    primaryQuestion:
      "How do we convert alignment into visible evidence that the organization can execute differently?",
    activities: [
      "Publish a sequenced roadmap tied to outcomes and decision points.",
      "Start one or two bounded initiatives capable of producing meaningful evidence.",
      "Establish product and operating cadences for decisions, dependencies, risk, learning, and progress.",
    ],
    outputs: [
      "Outcome-based roadmap.",
      "Named owners, metrics, assumptions, and review dates.",
      "Early proof of progress.",
      "Clear operating model for how priorities will be evaluated and adjusted after day 90.",
    ],
  },
];
