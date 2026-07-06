// src/components/opsystem/sections/Hero.tsx
import { Workflow } from "lucide-react";
import { heroFacts, disclaimerLabel, disclaimerBody } from "../content";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
      <div className="mb-4 flex items-center gap-2 text-cyan-300">
        <Workflow aria-hidden="true" className="h-6 w-6" />
        <p className="text-sm font-medium uppercase tracking-[0.35em]">Product Case Study</p>
      </div>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">AI Product Operating System</h1>
      <p className="mt-4 max-w-2xl text-xl text-slate-300 md:text-2xl">
        A system of Claude Skills that turned a fragmented PM workflow — PRDs, delivery tracking, engineering
        handoff, release communication — into one that stays in sync with itself.
      </p>
      <p className="mt-4 max-w-2xl leading-7 text-slate-400">
        What started as personal tooling to save time became a formal, capability-based skill library other
        product managers now use — and PRD authoring time dropped from weeks to days.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {heroFacts.map((fact) => (
          <div key={fact.label} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">{fact.label}</p>
            <p className="text-sm font-semibold text-slate-100">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
        <p className="text-sm leading-7 text-slate-300">
          <span className="font-semibold text-cyan-300">{disclaimerLabel} — </span>
          {disclaimerBody}
        </p>
      </div>
    </section>
  );
}
