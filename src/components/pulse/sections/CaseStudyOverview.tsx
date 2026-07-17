// src/components/pulse/sections/CaseStudyOverview.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";
import { caseStudyOverview } from "../content";

export default function CaseStudyOverview() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Case Study</p>
      <h2 className="mb-10 text-3xl font-semibold md:text-4xl">
        The story behind the product
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {caseStudyOverview.map((card, index) => (
          <motion.div
            key={card.eyebrow}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0 },
              { duration: 0.4, delay: index * 0.1 }
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{card.eyebrow}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-100">{card.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
