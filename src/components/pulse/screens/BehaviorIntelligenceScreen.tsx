// src/components/pulse/screens/BehaviorIntelligenceScreen.tsx
"use client";

import Donut from "../charts/Donut";
import HeatMap from "../charts/HeatMap";
import HorizontalBar from "../charts/HorizontalBar";
import { behaviorIntelligence } from "../content";

export default function BehaviorIntelligenceScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Signal Health</p>
          <p className="text-xl font-semibold text-cyan-300">{behaviorIntelligence.signalHealth}</p>
        </div>
        <p className="text-[10px] text-slate-400">Updated {behaviorIntelligence.freshnessMinutesAgo}m ago</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Top Usage Signals</p>
        <HorizontalBar data={behaviorIntelligence.topSignals} color="#22d3ee" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Top Performing Categories</p>
        <HorizontalBar data={behaviorIntelligence.topCategories} color="#34d399" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Signal Mix</p>
        <div className="flex items-center gap-3">
          <Donut data={behaviorIntelligence.signalMix} size={64} />
          <ul className="flex flex-1 flex-col gap-1">
            {behaviorIntelligence.signalMix.map((slice) => (
              <li key={slice.label} className="flex items-center justify-between text-[10px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: slice.color }} />
                  {slice.label}
                </span>
                <span className="text-slate-400">{slice.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Funnel Efficiency</p>
        <HorizontalBar
          data={behaviorIntelligence.funnelEfficiency}
          color="#22d3ee"
          max={100}
          valueFormatter={(value) => `${value}%`}
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Weekly Usage Pattern</p>
        <HeatMap grid={behaviorIntelligence.heatmap} color="#22d3ee" />
      </div>
    </div>
  );
}
