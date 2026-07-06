// src/components/opsystem/sections/WorkflowSection.tsx
"use client";

import { motion } from "framer-motion";
import WorkflowDiagram from "../WorkflowDiagram";
import SkillTranscript from "../SkillTranscript";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";

export default function WorkflowSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        className="mb-10 text-center"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">How It Works</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">One workflow, six skills, always in sync</h2>
        <p className="mx-auto max-w-2xl leading-7 text-slate-300">
          A feature idea becomes a PRD, a committed delivery record, and engineering stories — and a change to
          any one of those three updates the others. Two more skills keep a PM caught up on Slack, email, and
          Jira without leaving the flow to check.
        </p>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
      >
        <WorkflowDiagram />
      </motion.div>

      <motion.div className="mt-12" {...revealAnimation(reduceMotion, { opacity: 0, y: 16 }, { opacity: 1, y: 0 })}>
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
          What Running One Actually Looks Like
        </p>
        <SkillTranscript />
      </motion.div>
    </section>
  );
}
