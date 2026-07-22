import type { Metadata } from "next";
import Image from "next/image";
import { aboutEyebrow, aboutParagraphs, aboutFacts } from "@/components/about/content";

export const metadata: Metadata = {
  title: "About — Dustin Hartung",
  description: "Get to know Dustin Hartung.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-[280px_1fr]">
          <div className="mx-auto h-56 w-56 shrink-0 overflow-hidden rounded-full border border-white/10 md:mx-0 md:h-64 md:w-64">
            <Image
              src="/images/dustin-headshot.png"
              alt="Portrait of Dustin Hartung"
              width={512}
              height={512}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div>
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.35em] text-cyan-300">
              {aboutEyebrow}
            </p>
            <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
              Let’s get to know me
            </h1>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 md:ml-[calc(280px+3rem)]">
          {aboutParagraphs.map((paragraph, i) => (
            <p key={i} className="text-lg leading-8 text-neutral-400">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
          {aboutFacts.map((fact) => (
            <div key={fact.label}>
              <p className="text-4xl font-semibold text-cyan-300">{fact.value}</p>
              <p className="mt-2 text-sm font-semibold text-white">{fact.label}</p>
              <p className="mt-1 text-sm text-neutral-400">{fact.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
