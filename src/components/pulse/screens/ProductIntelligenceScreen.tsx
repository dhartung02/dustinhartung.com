// src/components/pulse/screens/ProductIntelligenceScreen.tsx
"use client";

import HorizontalBar from "../charts/HorizontalBar";
import DualLineChart from "../charts/DualLineChart";
import TrendBadge from "../charts/TrendBadge";
import { productIntelligence } from "../content";

export default function ProductIntelligenceScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Top Categories</p>
        <HorizontalBar data={productIntelligence.topCategories} color="#34d399" />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Product Signals</p>
        <p className="mb-2 mt-0.5 text-[9px] leading-relaxed text-slate-500">
          The product funnel behind the top-line numbers — views, cart adds, purchases, and abandonment.
        </p>
        <div className="flex flex-col gap-1.5">
          {productIntelligence.funnel.map((item) => (
            <div key={item.label} className="flex items-center justify-between text-[11px] text-slate-300">
              <span>{item.label}</span>
              <span className="flex items-center gap-2">
                <span className="text-slate-200">{item.value}</span>
                <TrendBadge deltaPct={item.deltaPct} invert={item.invert} className="w-11 justify-end" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Interest vs. Conversion</p>
        <DualLineChart series={productIntelligence.trend} />
      </div>
    </div>
  );
}
