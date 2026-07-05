// src/components/catalog/KpiHeader.tsx
"use client";

import { Search } from "lucide-react";
import TrendBadge from "../pulse/charts/TrendBadge";
import { kpisByScope, allCategories, segmentToastCopy } from "./content";

type KpiHeaderProps = { scopeId: string; onCreateSegment: (message: string) => void };

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function formatCount(value: number): string {
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${value}`;
}

export default function KpiHeader({ scopeId, onCreateSegment }: KpiHeaderProps) {
  const kpis = kpisByScope[scopeId] ?? kpisByScope.all;
  const scopeLabel =
    scopeId === "all" ? "All Products" : allCategories.find((c) => c.id === scopeId)?.name ?? "All Products";

  const cards = [
    { label: "Total Revenue", value: formatCurrency(kpis.revenue.value), deltaPct: kpis.revenue.deltaPct, invert: false },
    { label: "Total Purchases", value: formatCount(kpis.purchases.value), deltaPct: kpis.purchases.deltaPct, invert: false },
    { label: "Total Views", value: formatCount(kpis.views.value), deltaPct: kpis.views.deltaPct, invert: false },
    { label: "Cart Abandons", value: formatCount(kpis.cartAbandons.value), deltaPct: kpis.cartAbandons.deltaPct, invert: true },
  ];

  return (
    <div className="border-b border-white/10 bg-neutral-950/60 p-4">
      <div className="mb-3 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
        <Search aria-hidden="true" className="h-4 w-4 text-slate-500" />
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="text"
          placeholder="Search products"
          className="w-full bg-transparent text-[13px] text-slate-300 placeholder:text-slate-600 focus:outline-none"
        />
      </div>
      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">{scopeLabel} — Last 30 Days</p>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <p className="text-[10px] uppercase tracking-wide text-slate-500">{card.label}</p>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-lg font-semibold text-slate-100">{card.value}</p>
              <TrendBadge deltaPct={card.deltaPct} invert={card.invert} />
            </div>
            <button
              type="button"
              onClick={() => {
                const copy = segmentToastCopy[card.label];
                onCreateSegment(scopeId === "all" ? copy.all : copy.category(scopeLabel));
              }}
              className="mt-2 w-full rounded-md border border-cyan-300/20 bg-cyan-300/[0.06] py-1 text-[10px] font-medium text-cyan-300"
            >
              Create Segment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
