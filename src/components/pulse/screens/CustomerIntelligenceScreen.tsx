// src/components/pulse/screens/CustomerIntelligenceScreen.tsx
"use client";

import { Target, AlertTriangle, TrendingUp } from "lucide-react";
import Donut from "../charts/Donut";
import ScatterPlot from "../charts/ScatterPlot";
import DualLineChart from "../charts/DualLineChart";
import TrendBadge from "../charts/TrendBadge";
import { customerIntelligence } from "../content";

const actionIcons = [Target, AlertTriangle, TrendingUp];

export default function CustomerIntelligenceScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="grid grid-cols-3 gap-2">
        {customerIntelligence.stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-center">
            <p className="text-sm font-semibold text-cyan-300">{stat.value}</p>
            <p className="mt-0.5 text-[8.5px] leading-tight text-slate-400">{stat.label}</p>
            <div className="mt-1 flex justify-center">
              <TrendBadge deltaPct={stat.deltaPct} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">What To Do</p>
        <ul className="flex flex-col gap-2">
          {customerIntelligence.whatToDo.map((item, index) => {
            const Icon = actionIcons[index % actionIcons.length];
            return (
              <li key={item} className="flex items-start gap-2 text-[11px] leading-snug text-slate-300">
                <Icon aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Account Activity Overview</p>
        <ScatterPlot data={customerIntelligence.valueMatrix} xLabel="Interest" yLabel="Engagement" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Product Intelligence Drill-In</p>
        <p className="mb-2 mt-0.5 text-[9px] leading-relaxed text-slate-500">
          Drilling into a glanceable metric to see the underlying retail signals behind it.
        </p>
        <div className="flex flex-col gap-1.5">
          {customerIntelligence.retailDrillIn.funnel.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[11px] text-slate-300">
              <span>{item.label}</span>
              <span className="flex items-center gap-2">
                <span className="text-slate-200">{item.value}</span>
                <TrendBadge deltaPct={item.deltaPct} invert={item.invert} className="w-11 justify-end" />
              </span>
            </div>
          ))}
        </div>
        <p className="mb-1.5 mt-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Interest vs. Conversion
        </p>
        <DualLineChart series={customerIntelligence.retailDrillIn.trend} />
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
