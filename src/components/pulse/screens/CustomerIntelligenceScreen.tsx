// src/components/pulse/screens/CustomerIntelligenceScreen.tsx
"use client";

import Donut from "../charts/Donut";
import ScatterPlot from "../charts/ScatterPlot";
import { customerIntelligence } from "../content";

export default function CustomerIntelligenceScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="grid grid-cols-3 gap-2">
        {customerIntelligence.stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center">
            <p className="text-sm font-semibold text-cyan-300">{stat.value}</p>
            <p className="mt-0.5 text-[8.5px] leading-tight text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Account Activity Overview</p>
        <ScatterPlot data={customerIntelligence.valueMatrix} xLabel="Usage" yLabel="Engagement" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Account Status Mix</p>
        <div className="flex items-center gap-3">
          <Donut
            data={customerIntelligence.lifecycle.map((stage) => ({
              label: stage.label,
              value: stage.value,
              color: stage.color,
            }))}
            size={72}
          />
          <ul className="flex flex-1 flex-col gap-1">
            {customerIntelligence.lifecycle.map((stage) => (
              <li key={stage.label} className="flex items-center justify-between text-[10px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.color }} />
                  {stage.label}
                </span>
                <span className="text-slate-400">{stage.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
