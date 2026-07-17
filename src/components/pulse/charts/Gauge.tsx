"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

type GaugeProps = {
  value: number;
  color?: string;
  size?: number;
};

export default function Gauge({ value, color = "#22d3ee", size = 180 }: GaugeProps) {
  const reduceMotion = usePrefersReducedMotion();
  const strokeWidth = size * 0.09;
  const radius = size / 2 - strokeWidth;
  const center = size / 2;
  const circumference = Math.PI * radius;
  const clamped = Math.min(Math.max(value, 0), 100);
  const targetOffset = circumference - (clamped / 100) * circumference;
  const trackPath = `M ${strokeWidth / 2} ${center} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${center}`;

  return (
    <svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`} aria-hidden="true">
      <path d={trackPath} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} strokeLinecap="round" />
      <motion.path
        d={trackPath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        {...revealAnimation(reduceMotion, { strokeDashoffset: circumference }, { strokeDashoffset: targetOffset })}
      />
    </svg>
  );
}
