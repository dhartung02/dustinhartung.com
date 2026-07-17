// src/components/pulse/screens/InternalOverviewScreen.tsx
"use client";

import TrendBadge from "../charts/TrendBadge";
import { internalTelemetry } from "../content";

export default function InternalOverviewScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Internal Telemetry</p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          Diagnostic-only view of how the tool itself is used — kept fully separate from customer-facing data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {internalTelemetry.overview.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-3"
          >
            <p className="text-[11px] text-slate-300">{stat.label}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-cyan-300">{stat.value}</p>
              <TrendBadge deltaPct={stat.deltaPct} invert={stat.invert} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
