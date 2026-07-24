export type ExecutiveArtifact = {
  title: string;
  tag: string;
  text: string;
  href: string;
};

export const executiveArtifacts: ExecutiveArtifact[] = [
  {
    title: "Product Leadership Philosophy",
    tag: "How I lead",
    text: "The principles I use to connect customer value, business outcomes, technical reality, and effective execution.",
    href: "/executive/leadership-philosophy",
  },
  {
    title: "90-Day Product Leadership Plan",
    tag: "How I enter a new organization",
    text: "A practical approach to understanding the system, aligning around the decisions that matter, and proving progress without forcing a premature roadmap reset.",
    href: "/executive/90-day-plan",
  },
  {
    title: "Leadership SWOT Assessment",
    tag: "How I evaluate my fit",
    text: "A direct assessment of the strengths I bring, the areas I actively manage, and the market dynamics shaping my next role.",
    href: "/executive/swot",
  },
];
