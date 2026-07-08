// src/components/invest/GateProgressStrip.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../pulse/revealAnimation";
import { gates, type GateStatus } from "./content";

const statusClasses: Record<GateStatus, string> = {
  delivered: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  started: "border-amber-300/40 bg-amber-300/10 text-amber-300",
  locked: "border-white/10 bg-white/5 text-slate-500",
};

const statusLabels: Record<GateStatus, string> = {
  delivered: "Delivered",
  started: "Started",
  locked: "Locked",
};

export default function GateProgressStrip() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="mt-8">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Capability Gates — What&apos;s Real Today
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {gates.map((gate, index) => (
          <motion.div
            key={gate.number}
            className={`rounded-lg border p-3 ${statusClasses[gate.status]}`}
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0 },
              { duration: 0.35, delay: index * 0.06 }
            )}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide opacity-80">Gate {gate.number}</p>
            <p className="mt-1 text-[12px] font-semibold leading-4">{gate.name}</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide">{statusLabels[gate.status]}</p>
            <p className="mt-1.5 text-[11px] leading-4 opacity-80">{gate.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
