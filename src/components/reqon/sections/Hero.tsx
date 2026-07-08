// src/components/reqon/sections/Hero.tsx
import { ArrowUpRight } from "lucide-react";
import { heroFacts, disclaimerLabel, disclaimerBody, reqonUrl } from "../content";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-emerald-300">Product Case Study</p>
        <a
          href={reqonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[13px] font-medium text-emerald-300 hover:text-emerald-200"
        >
          reqon.app
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">Reqon</h1>
      <p className="mt-4 max-w-2xl text-xl text-slate-300 md:text-2xl">
        A self-hosted, AI-assisted job-search CRM — structured pipeline management, a deterministic scout, and
        optional AI assistance that never takes control from you.
      </p>
      <p className="mt-4 max-w-2xl leading-7 text-slate-400">
        Job searches scatter across spreadsheets, browser tabs, and email. Reqon turns that into a structured
        product system — spanning a web dashboard, an iOS/iPadOS companion app, and a Chrome extension.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {heroFacts.map((fact) => (
          <div key={fact.label} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">{fact.label}</p>
            <p className="text-sm font-semibold text-slate-100">{fact.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-5">
        <p className="text-sm leading-7 text-slate-300">
          <span className="font-semibold text-emerald-300">{disclaimerLabel} — </span>
          {disclaimerBody}
        </p>
      </div>
    </section>
  );
}
