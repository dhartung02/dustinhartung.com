// src/components/invest/sections/Outcome.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { outcomeStatements, nextUp } from "../content";

export default function Outcome() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Outcome</p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">What&apos;s real today</h2>
      </motion.div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ul className="flex flex-col gap-4">
          {outcomeStatements.map((statement) => (
            <li key={statement} className="flex items-start gap-3 leading-7 text-slate-300">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              {statement}
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">What&apos;s Next</p>
          <ul className="flex flex-col gap-3">
            {nextUp.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
