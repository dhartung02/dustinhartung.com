import type { Metadata } from "next";
import ContactCta from "@/components/shared/ContactCta";
import { intro, pillars, prepRows } from "@/components/executive/interview-positioning/content";

export const metadata: Metadata = {
  title: "Interview Positioning Framework — Dustin Hartung",
  description:
    "A consistent narrative framework for communicating Dustin Hartung's executive story across a leadership interview process.",
  robots: { index: false, follow: false },
};

export default function InterviewPositioningPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          Leadership Approach
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          Interview Positioning Framework
        </h1>
        <div className="mt-8 flex flex-col gap-6">
          {intro.map((paragraph, i) => (
            <p key={i} className="text-lg leading-8 text-neutral-400">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-lg font-semibold">{pillar.title}</h2>
              <p className="mt-3 leading-7 text-neutral-400">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <h2 className="mb-6 text-2xl font-semibold">Interview Prep</h2>
        <div className="flex flex-col divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.04]">
          {prepRows.map((row, i) => (
            <div key={i} className="grid gap-2 p-6 sm:grid-cols-2 sm:gap-6">
              <p className="font-medium text-white">{row.question}</p>
              <p className="text-neutral-400">{row.angle}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
