// src/components/reqon/sections/DashboardSection.tsx
"use client";

import { motion } from "framer-motion";
import ReqonApp from "../ReqonApp";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";

export default function DashboardSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        className="mb-10 text-center"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Try It</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Your pipeline, one board</h2>
        <p className="mx-auto max-w-2xl leading-7 text-slate-300">
          Switch tabs to see Today&apos;s action items, browse by stage, or check Analytics. Click any role to
          open its detail panel — everything below is a working, original recreation of the real interface,
          running on synthetic data.
        </p>
      </motion.div>

      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1 })}>
        <ReqonApp />
      </motion.div>
    </section>
  );
}
