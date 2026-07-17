// src/components/catalog/InsightsTab.tsx
"use client";

import { useState } from "react";
import DualLineChart from "../pulse/charts/DualLineChart";
import { insightTrendByProduct, insightTrendByCategory, type InsightWindow } from "./content";
import type { SelectedEntity } from "./ProductCatalogApp";

type InsightsTabProps = { entity: NonNullable<SelectedEntity> };

const windows: { id: InsightWindow; label: string }[] = [
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
];

export default function InsightsTab({ entity }: InsightsTabProps) {
  const [window, setWindow] = useState<InsightWindow>("30d");

  const trendSource = entity.type === "product" ? insightTrendByProduct[entity.id] : insightTrendByCategory[entity.id];
  const trend = trendSource?.[window];

  if (!trend) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex rounded-lg border border-white/10 bg-white/[0.04] p-0.5">
        {windows.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => setWindow(w.id)}
            aria-pressed={window === w.id}
            className={`flex-1 rounded-md py-1 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
              window === w.id ? "bg-cyan-300/15 text-cyan-300" : "text-slate-500"
            }`}
          >
            {w.label}
          </button>
        ))}
      </div>

      <div>
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Interest vs. Conversion
        </p>
        <DualLineChart
          series={[
            { label: "Interest", color: "#22d3ee", data: trend.interest },
            { label: "Conversion", color: "#34d399", data: trend.conversion },
          ]}
        />
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Create Segment</p>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            className="rounded-md border border-white/10 px-2.5 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5"
          >
            Interested individuals
          </button>
          <button
            type="button"
            className="rounded-md border border-white/10 px-2.5 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5"
          >
            Converted individuals
          </button>
          <button
            type="button"
            className="rounded-md border border-white/10 px-2.5 py-1.5 text-left text-[11px] text-slate-300 hover:bg-white/5"
          >
            Interested minus converted
          </button>
        </div>
      </div>
    </div>
  );
}
