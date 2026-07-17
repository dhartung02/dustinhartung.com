// src/components/invest/sections/Hero.tsx
import { LineChart } from "lucide-react";
import { heroFacts, disclaimerLabel, disclaimerBody } from "../content";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
      <div className="mb-4 flex items-center gap-2 text-amber-300">
        <LineChart aria-hidden="true" className="h-6 w-6" />
        <p className="text-sm font-medium uppercase tracking-[0.35em]">Product Case Study</p>
      </div>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">AI Investment Manager</h1>
      <p className="mt-4 max-w-2xl text-xl text-slate-300 md:text-2xl">
        A real, actively-developed research platform that earns the right to use AI one gate at a time — evidence
        first, human approval always, automation last.
      </p>
      <p className="mt-4 max-w-2xl leading-7 text-slate-400">
        Most AI investing tools lead with a claim about smarter picks. This one leads with a capability-gate model:
        research and evidence today, conservative human-approved recommendations and paper trading in progress, real
        money and automation locked until they&apos;re earned.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {heroFacts.map((fact) => (
          <div key={fact.label} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">{fact.label}</p>
            <p className="text-sm font-semibold text-slate-100">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-5">
        <p className="text-sm leading-7 text-slate-300">
          <span className="font-semibold text-amber-300">{disclaimerLabel} — </span>
          {disclaimerBody}
        </p>
      </div>
    </section>
  );
}
