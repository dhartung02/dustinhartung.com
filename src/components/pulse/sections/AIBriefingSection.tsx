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
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Deterministic by default. AI-enhanced on your terms.</h2>
        <p className="mx-auto mb-10 max-w-2xl leading-7 text-slate-300">
          Every day, the app assembled an executive brief — What Changed, What To Watch, What&apos;s Working, and
          Recommended Actions — calculated directly from platform and product telemetry using fixed rules and
          thresholds. Add your own Anthropic, OpenAI, or Gemini API key in Settings, and that same trusted
          foundation gets described in AI-generated language instead — the same facts, put more naturally. Try the
          toggle below. The next step is a fully proactive agent that surfaces this on its own, not just on
          request.
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
