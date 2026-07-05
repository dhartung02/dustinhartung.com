// src/components/pulse/sections/AIBriefingSection.tsx
"use client";

import { motion } from "framer-motion";
import PhoneApp from "../PhoneApp";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export default function AIBriefingSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Executive Brief</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">A brief that&apos;s calculated, not guessed at</h2>
        <p className="mx-auto mb-10 max-w-2xl leading-7 text-slate-300">
          Every day, the app assembled a deterministic executive brief — What Changed, What To Watch, What&apos;s
          Working, and Recommended Actions — calculated directly from platform and product telemetry using fixed
          rules and thresholds, not AI. The natural next step is layering AI on top of that same trusted
          foundation: a data-connected agent, via MCP, that could offer proactive suggestions and
          recommendations rather than just a calculated summary.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto"
        {...revealAnimation(reduceMotion, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1 })}
      >
        <PhoneApp initialTabId="brief" className="max-w-[340px]" />
      </motion.div>
    </section>
  );
}
