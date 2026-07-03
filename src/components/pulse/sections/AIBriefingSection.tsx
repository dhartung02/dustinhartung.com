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
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">AI Briefing</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">The centerpiece: a briefing, not a dashboard</h2>
        <p className="mx-auto mb-10 max-w-2xl leading-7 text-slate-300">
          Instead of asking executives to interpret charts, Pulse synthesizes what changed, what needs
          attention, and where the opportunity is — with priority, impact, and confidence attached to
          every recommendation.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto"
        {...revealAnimation(reduceMotion, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1 })}
      >
        <PhoneFrame label="AI Briefing" className="max-w-[340px]">
          <AIBriefingScreen />
        </PhoneFrame>
      </motion.div>
    </section>
  );
}
