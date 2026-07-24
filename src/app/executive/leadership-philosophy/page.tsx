import type { Metadata } from "next";
import ContactCta from "@/components/shared/ContactCta";
import { intro, principles, stories } from "@/components/executive/leadership-philosophy/content";

export const metadata: Metadata = {
  title: "Product Leadership Philosophy — Dustin Hartung",
  description: "Dustin Hartung's leadership principles and product management approach.",
};

export default function LeadershipPhilosophyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          Leadership Approach
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          Product Leadership Philosophy
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
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <h2 className="text-xl font-semibold">{principle.title}</h2>
              <p className="mt-3 leading-7 text-neutral-400">{principle.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
          Leadership in Practice
        </p>
        <h2 className="mb-8 text-3xl font-semibold">Two decisions, start to finish</h2>

        <div className="flex flex-col gap-8">
          {stories.map((story) => (
            <div key={story.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm font-semibold text-cyan-300">{story.subtitle}</p>
              <h3 className="mt-2 text-2xl font-semibold">{story.title}</h3>

              <div className="mt-6 flex flex-col gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Situation</p>
                  <p className="mt-2 leading-7 text-neutral-400">{story.situation}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Options Considered</p>
                  <p className="mt-2 leading-7 text-neutral-400">{story.options}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Decision &amp; Trade-off</p>
                  <p className="mt-2 leading-7 text-neutral-400">{story.decision}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Outcome</p>
                  <p className="mt-2 leading-7 text-neutral-400">{story.outcome}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {story.demonstrated.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
