import type { Metadata } from "next";
import WorkGrid from "@/components/work/WorkGrid";
import { work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work — Dustin Hartung",
  description:
    "Case studies of AI-native enterprise products Dustin Hartung has led and built.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          Portfolio
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          Work
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
          Products I’ve led and built — enterprise SaaS, AI-native platforms, and
          solo-shipped personal products, each a self-contained case study of the
          strategy, trade-offs, and execution behind it.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <WorkGrid items={work} />
      </section>
    </main>
  );
}
