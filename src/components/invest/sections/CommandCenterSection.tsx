// src/components/invest/sections/CommandCenterSection.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import InvestmentApp from "../InvestmentApp";
import GateProgressStrip from "../GateProgressStrip";

export default function CommandCenterSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div className="mb-10" {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Try It</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">The real Command Center</h2>
        <p className="max-w-2xl leading-7 text-slate-300">
          This is the actual start-here console from the real product — a next-best-action engine and a
          workflow-status grid, not a stock picker. Click any section to see what it actually covers.
        </p>
      </motion.div>

      <InvestmentApp />
      <GateProgressStrip />
    </section>
  );
}
