// Placeholder structure — real content to be filled in via interview.

export type ResumeStat = {
  value: string;
  label: string;
  detail: string;
};

export const resumeStats: ResumeStat[] = [
  { value: "TODO", label: "Years Experience", detail: "TODO — years in product leadership" },
  { value: "TODO", label: "TODO Stat", detail: "TODO" },
  { value: "TODO", label: "TODO Stat", detail: "TODO" },
];

export const resumeIntro: string[] = [
  "TODO — replace with a 2-3 paragraph product leadership summary, interview-sourced.",
];

export type ResumeRole = {
  period: string;
  company: string;
  title: string;
  summary: string;
  bullets: string[];
};

export const resumeExperience: ResumeRole[] = [
  {
    period: "TODO – Present",
    company: "TODO Company",
    title: "TODO Title",
    summary: "TODO — 1-2 sentence summary of scope and mandate.",
    bullets: ["TODO bullet", "TODO bullet", "TODO bullet"],
  },
  {
    period: "TODO – TODO",
    company: "TODO Company",
    title: "TODO Title",
    summary: "TODO — 1-2 sentence summary of scope and mandate.",
    bullets: ["TODO bullet", "TODO bullet"],
  },
];
