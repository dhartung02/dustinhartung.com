// src/components/pulse/screens/ExecutiveFeedScreen.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingDown, ShieldCheck, AlertTriangle } from "lucide-react";
import Gauge from "../charts/Gauge";
import ProgressRing from "../charts/ProgressRing";
import Sparkline from "../charts/Sparkline";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { executiveFeed, statusColor } from "../content";

export default function ExecutiveFeedScreen() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="flex flex-col items-center gap-1 pt-1">
        <Gauge value={executiveFeed.overallScore} color={statusColor[executiveFeed.overallStatus]} size={140} />
        <p className="-mt-6 text-2xl font-semibold">{executiveFeed.overallScore}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Executive Health Score</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {executiveFeed.cards.map((card) => (
          <motion.div
            key={card.id}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-2.5"
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <ProgressRing value={card.score} color={statusColor[card.status]} size={48} strokeWidth={5} />
            <p className="text-center text-[10px] font-medium leading-tight text-slate-200">{card.label}</p>
            <Sparkline data={card.trend} color={statusColor[card.status]} className="h-4 w-14" />
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Signals to Watch</p>
        <ul className="flex flex-col gap-2">
          {executiveFeed.watchList.map((item) => {
            const Icon = item.status === "risk" ? AlertTriangle : item.status === "excellent" ? ShieldCheck : TrendingDown;
            return (
              <li key={item.id} className="flex items-start gap-2 text-[11px] text-slate-300">
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: statusColor[item.status] }} />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
