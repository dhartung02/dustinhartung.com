"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export type ScatterPoint = { id: string; x: number; y: number; r: number; label: string; color?: string };

type ScatterPlotProps = {
  data: ScatterPoint[];
  xLabel?: string;
  yLabel?: string;
};

export default function ScatterPlot({ data, xLabel = "Spend", yLabel = "Engagement" }: ScatterPlotProps) {
  const reduceMotion = usePrefersReducedMotion();
  const size = 220;
  const padding = 20;

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <line x1={padding} y1={size - padding} x2={size - padding} y2={size - padding} stroke="rgba(255,255,255,0.15)" />
        <line x1={padding} y1={padding} x2={padding} y2={size - padding} stroke="rgba(255,255,255,0.15)" />
        {data.map((point, index) => {
          const cx = padding + (point.x / 100) * (size - padding * 2);
          const cy = size - padding - (point.y / 100) * (size - padding * 2);

          return (
            <motion.circle
              key={point.id}
              cx={cx}
              cy={cy}
              r={point.r}
              fill={point.color ?? "#22d3ee"}
              fillOpacity={0.7}
              stroke={point.color ?? "#22d3ee"}
              strokeWidth={1.5}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              {...revealAnimation(
                reduceMotion,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1 },
                { duration: 0.5, ease: "easeOut", delay: index * 0.06 }
              )}
            />
          );
        })}
      </svg>
      <div className="mt-1 flex justify-between text-[9px] uppercase tracking-wide text-slate-500">
        <span>{xLabel} →</span>
        <span>↑ {yLabel}</span>
      </div>
    </div>
  );
}
