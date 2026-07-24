import type { Metadata } from "next";
import ContactCta from "@/components/shared/ContactCta";
import { intro, quadrants } from "@/components/executive/swot/content";

export const metadata: Metadata = {
  title: "Leadership SWOT Assessment — Dustin Hartung",
  description:
    "An objective evaluation of Dustin Hartung's leadership strengths, development areas, market opportunities, and positioning for senior product leadership.",
};

export default function SwotPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          Leadership Approach
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          Leadership SWOT Assessment
        </h1>
        <div className="mt-8 flex flex-col gap-6">
          {intro.map((paragraph, i) => (
            <p key={i} className="text-lg leading-8 text-neutral-400">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2">
          {quadrants.map((quadrant) => (
            <div
              key={quadrant.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h2 className={`text-sm font-semibold uppercase tracking-[0.2em] ${quadrant.accent}`}>
                {quadrant.label}
              </h2>
              <div className="mt-4 flex flex-col gap-5">
                {quadrant.items.map((item, i) =>
                  item.title ? (
                    <div key={i}>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-2 leading-7 text-neutral-400">{item.description}</p>
                    </div>
                  ) : (
                    <div key={i} className="flex items-start gap-3 leading-7 text-neutral-300">
                      <span className={`mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current ${quadrant.accent}`} />
                      {item.description}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
