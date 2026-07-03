// src/components/pulse/screens/CommerceIntelligenceScreen.tsx
"use client";

import HorizontalBar from "../charts/HorizontalBar";
import Sparkline from "../charts/Sparkline";
import { commerceIntelligence } from "../content";

export default function CommerceIntelligenceScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="grid grid-cols-2 gap-2">
        {commerceIntelligence.overview.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5 text-center">
            <p className="text-base font-semibold text-cyan-300">{stat.value}</p>
            <p className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Category Performance</p>
        <HorizontalBar data={commerceIntelligence.categoryPerformance} color="#34d399" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Top Movers</p>
        <ul className="flex flex-col gap-2">
          {commerceIntelligence.topMovers.map((mover) => (
            <li key={mover.label} className="flex items-center justify-between gap-2">
              <span className="flex-1 truncate text-[10.5px] text-slate-200">{mover.label}</span>
              <Sparkline data={mover.trend} color={mover.changePct >= 0 ? "#34d399" : "#f59e0b"} className="h-4 w-12" />
              <span
                className={`w-10 shrink-0 text-right text-[10px] font-medium ${
                  mover.changePct >= 0 ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {mover.changePct >= 0 ? "+" : ""}
                {mover.changePct}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
