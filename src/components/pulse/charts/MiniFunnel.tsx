"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export type FunnelStage = { label: string; value: number };

type MiniFunnelProps = {
  data: FunnelStage[];
  color?: string;
};

export default function MiniFunnel({ data, color = "#22d3ee" }: MiniFunnelProps) {
  const reduceMotion = usePrefersReducedMotion();
  const max = data[0]?.value || 1;

  return (
    <div className="flex flex-col gap-1.5">
      {data.map((stage, index) => {
        const widthPct = Math.max((stage.value / max) * 100, 16);

        return (
          <motion.div
            key={stage.label}
            className="flex items-center gap-2"
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, x: -8 },
              { opacity: 1, x: 0 },
              { duration: 0.4, delay: index * 0.08 }
            )}
          >
            <div
              className="flex h-6 items-center justify-center rounded-md text-[10px] font-medium text-slate-950"
              style={{ width: `${widthPct}%`, backgroundColor: color, opacity: 1 - index * 0.15 }}
            >
              {stage.value.toLocaleString()}
            </div>
            <span className="w-20 shrink-0 text-[10px] text-slate-400">{stage.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
