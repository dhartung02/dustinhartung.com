import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import ContactCta from "@/components/shared/ContactCta";
import { executiveArtifacts } from "@/lib/executive";

export const metadata: Metadata = {
  title: "Leadership — Dustin Hartung",
  description:
    "How Dustin Hartung leads, makes product decisions, and creates value in a senior product leadership role — beyond the portfolio of what he's built.",
};

export default function ExecutivePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
          Leadership Approach
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          How I lead beyond the deliverable
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-400">
          The case studies in{" "}
          <Link href="/work" className="text-cyan-300 underline underline-offset-4">
            Work
          </Link>{" "}
          show the products and systems I’ve built. These materials focus on
          the decisions behind them: how I diagnose problems, establish
          priorities, navigate technical and commercial trade-offs, align
          teams, and create repeatable organizational value.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {executiveArtifacts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/40 hover:bg-white/[0.06]"
            >
              <p className="text-sm font-semibold text-cyan-300">{item.tag}</p>
              <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-4 leading-7 text-neutral-400">{item.text}</p>
              <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                Read more
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
