import type { Metadata } from "next";
import ContactCta from "@/components/shared/ContactCta";
import { intro, phases } from "@/components/executive/90-day-plan/content";

export const metadata: Metadata = {
  title: "90-Day Product Leadership Plan — Dustin Hartung",
  description:
    "How Dustin Hartung would assess an organization, establish priorities, and deliver value in a new product leadership role.",
};

export default function NinetyDayPlanPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          Leadership Approach
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          90-Day Product Leadership Plan
        </h1>
        <div className="mt-8 flex flex-col gap-6">
          {intro.map((paragraph, i) => (
            <p key={i} className="text-lg leading-8 text-neutral-400">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {phases.map((phase) => (
            <div
              key={phase.range}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm font-semibold text-cyan-300">{phase.range}</p>
              <h2 className="mt-3 text-xl font-semibold">{phase.title}</h2>
              <p className="mt-3 text-sm font-medium italic leading-6 text-neutral-300">
                {phase.primaryQuestion}
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Activities
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {phase.activities.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 leading-7 text-neutral-300">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Outputs
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {phase.outputs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 leading-7 text-neutral-300">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
