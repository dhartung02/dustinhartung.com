// src/components/pulse/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import PulseLogo from "../PulseLogo";
import Gauge from "../charts/Gauge";
import ProgressRing from "../charts/ProgressRing";
import Sparkline from "../charts/Sparkline";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { heroFacts, disclaimerLabel, disclaimerBody, executiveFeed, statusColor } from "../content";

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
          <PhoneFrame label="Today at a Glance" scrollHint={false}>
            <div className="flex flex-col gap-4 text-slate-100">
              <div className="flex flex-col items-center gap-1 pt-1">
                <Gauge value={executiveFeed.overallScore} color={statusColor[executiveFeed.overallStatus]} size={140} />
                <p className="-mt-6 text-2xl font-semibold">{executiveFeed.overallScore}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Executive Snapshot</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {executiveFeed.cards.slice(0, 2).map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-2.5"
                  >
                    <ProgressRing value={card.score} color={statusColor[card.status]} size={48} strokeWidth={5} />
                    <p className="text-center text-[10px] font-medium leading-tight text-slate-200">{card.label}</p>
                    <Sparkline data={card.trend} color={statusColor[card.status]} className="h-4 w-14" />
                  </div>
                ))}
              </div>

              <p className="text-center text-[10px] leading-relaxed text-slate-500">
                Full executive snapshot, active risks, and opportunities shown below.
              </p>
            </div>
          </PhoneFrame>
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
