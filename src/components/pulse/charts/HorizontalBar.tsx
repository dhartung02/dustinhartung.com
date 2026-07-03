"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export type BarItem = { label: string; value: number };

type HorizontalBarProps = {
  data: BarItem[];
  color?: string;
  max?: number;
  valueFormatter?: (value: number) => string;
};

export default function HorizontalBar({
  data,
  color = "#22d3ee",
  max,
  valueFormatter = (value) => `${value}`,
}: HorizontalBarProps) {
  const reduceMotion = usePrefersReducedMotion();
  const scaleMax = max ?? Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="flex flex-col gap-2.5">
      {data.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="w-24 shrink-0 truncate text-[11px] text-slate-300">{item.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full origin-left rounded-full"
              style={{ width: `${(item.value / scaleMax) * 100}%`, backgroundColor: color }}
              {...revealAnimation(reduceMotion, { scaleX: 0 }, { scaleX: 1 })}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-[11px] text-slate-400">{valueFormatter(item.value)}</span>
        </div>
      ))}
    </div>
  );
}
