// src/components/opsystem/sections/MyRole.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";
import { roleLeadership, roleTechnical } from "../content";

export default function MyRole() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">My Role</p>
        <h2 className="mb-10 text-3xl font-semibold md:text-4xl">Sole product owner, concept to shipped capability</h2>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Product Leadership</p>
          <ul className="flex flex-col gap-2.5">
            {roleLeadership.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Technical Direction</p>
          <ul className="flex flex-col gap-2.5">
            {roleTechnical.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
