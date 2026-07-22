import type { Metadata } from "next";
import { intro, principles } from "@/components/executive/leadership-philosophy/content";

export const metadata: Metadata = {
  title: "Leadership Philosophy — Dustin Hartung",
  description: "Dustin Hartung's leadership principles and product management approach.",
};

export default function LeadershipPhilosophyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          Executive Positioning
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          Leadership Philosophy
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
    </main>
  );
}
