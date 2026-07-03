"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export type DonutSlice = { label: string; value: number; color: string };

type DonutProps = {
  data: DonutSlice[];
  size?: number;
};

export default function Donut({ data, size = 120 }: DonutProps) {
  const reduceMotion = usePrefersReducedMotion();
  const strokeWidth = size * 0.16;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1;

  const slices = data.reduce<{ cumulative: number; items: Array<DonutSlice & { dash: number; dashOffset: number }> }>(
    (acc, slice) => {
      const fraction = slice.value / total;
      const dash = fraction * circumference;
      acc.items.push({ ...slice, dash, dashOffset: -acc.cumulative });
      acc.cumulative += dash;
      return acc;
    },
    { cumulative: 0, items: [] }
  ).items;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {slices.map((slice) => (
        <motion.circle
          key={slice.label}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={slice.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${slice.dash} ${circumference - slice.dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          {...revealAnimation(reduceMotion, { strokeDashoffset: circumference }, { strokeDashoffset: slice.dashOffset })}
        />
      ))}
    </svg>
  );
}
