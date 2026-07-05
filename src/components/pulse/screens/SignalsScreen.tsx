// src/components/pulse/screens/SignalsScreen.tsx
"use client";

import HeatMap from "../charts/HeatMap";
import HorizontalBar from "../charts/HorizontalBar";
import UserJourney from "../charts/UserJourney";
import TrendBadge from "../charts/TrendBadge";
import { signalIntelligence } from "../content";

export default function SignalsScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Signal Health</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-semibold text-cyan-300">{signalIntelligence.signalHealth}</p>
            <TrendBadge deltaPct={signalIntelligence.signalHealthDeltaPct} />
          </div>
        </div>
        <p className="text-[10px] text-slate-400">Updated {signalIntelligence.freshnessMinutesAgo}m ago</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Signal Types</p>
        <HorizontalBar data={signalIntelligence.signalTypes} color="#22d3ee" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Traffic Source → Signal</p>
        <UserJourney
          stages={signalIntelligence.trafficSourceFlow.stages}
          flows={signalIntelligence.trafficSourceFlow.flows}
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Signal Funnel</p>
        <HorizontalBar
          data={signalIntelligence.signalFunnel}
          color="#34d399"
          max={100}
          valueFormatter={(value) => `${value}%`}
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Signal Timing Pattern</p>
        <HeatMap grid={signalIntelligence.heatmap} color="#22d3ee" />
      </div>
    </div>
  );
}
