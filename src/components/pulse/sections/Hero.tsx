// src/components/pulse/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import PhoneApp from "../PhoneApp";
import PulseLogo from "../PulseLogo";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { heroFacts, disclaimerLabel, disclaimerBody } from "../content";

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-4 flex items-center gap-2 text-cyan-300">
            <PulseLogo className="h-6 w-6" />
            <p className="text-sm font-medium uppercase tracking-[0.35em]">Product Case Study</p>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Executive Companion Pulse</h1>
          <p className="mt-4 text-xl text-slate-300 md:text-2xl">
            A 0→1 executive mobile companion that turned platform telemetry into a fast, trusted
            operating view.
          </p>
          <p className="mt-4 max-w-xl leading-7 text-slate-400">
            Secure mobile access, glanceable health metrics, and configurable dashboards gave
            executives product and platform visibility between meetings — built and shipped to
            production.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {heroFacts.map((fact) => (
              <div key={fact.label} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                <p className="text-[10px] uppercase tracking-wide text-slate-400">{fact.label}</p>
                <p className="text-sm font-semibold text-slate-100">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PhoneApp initialTabId="overview" />
        </motion.div>
      </div>

      <div className="mt-12 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
        <p className="text-sm leading-7 text-slate-300">
          <span className="font-semibold text-cyan-300">{disclaimerLabel} — </span>
          {disclaimerBody}
        </p>
      </div>
    </section>
  );
}
