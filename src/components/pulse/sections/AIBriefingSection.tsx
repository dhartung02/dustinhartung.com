// src/components/pulse/sections/AIBriefingSection.tsx
"use client";

import { motion } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import AIBriefingScreen from "../screens/AIBriefingScreen";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export default function AIBriefingSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Future Direction</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Designed for future intelligence</h2>
        <p className="mx-auto mb-10 max-w-2xl leading-7 text-slate-300">
          While the shipped MVP focused on secure access, configurable metric cards, and executive-ready
          telemetry views, the interaction model created a natural path toward deeper AI capability — an
          agent connected across the full data surface, via MCP, that could offer proactive suggestions and
          recommendations rather than just static summaries.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto"
        {...revealAnimation(reduceMotion, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1 })}
      >
        <PhoneFrame label="Concept: AI Briefing" className="max-w-[340px]">
          <AIBriefingScreen />
        </PhoneFrame>
      </motion.div>
    </section>
  );
}
