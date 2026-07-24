export const aboutEyebrow = "My name is Dustin";

export const aboutParagraphs: string[] = [
  "I'm a deeply technical business professional with a 21+ year career built on bringing business clarity to technical ambiguity — with customer data as the common thread running through nearly all of it.",
  "Outside of work, I'm a father and a husband — three kids, three dogs, and a house that's never quiet. I'm an early adopter and a geek at heart: I play golf, play video games, and build my own apps to solve problems in my own life before anyone asks me to.",
  "Right now I'm running four concurrent AI-driven personal projects, and outside my day job I moonlight as a professional beta tester and product reviewer — 30+ beta programs and hundreds of product reviews and counting.",
];

export type AboutFact = {
  value: string;
  label: string;
  detail: string;
};

export const aboutFacts: AboutFact[] = [
  { value: "4", label: "Concurrent AI Projects", detail: "personal apps built to solve my own problems" },
  { value: "30+", label: "Beta Programs", detail: "as a professional beta tester" },
  { value: "100s", label: "Product Reviews", detail: "submitted as a professional product reviewer" },
];
