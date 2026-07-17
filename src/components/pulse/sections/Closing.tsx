// src/components/pulse/sections/Closing.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";
import { closingStatement } from "../content";

export default function Closing() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <motion.div
        className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-8 text-center md:p-12"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Why This Matters</p>
        <p className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-snug text-slate-100 md:text-3xl">
          {closingStatement}
        </p>
      </motion.div>
    </section>
  );
}
