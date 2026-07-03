"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

type ProgressRingProps = {
  value: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
};

export default function ProgressRing({ value, color = "#22d3ee", size = 56, strokeWidth = 6 }: ProgressRingProps) {
  const reduceMotion = usePrefersReducedMotion();
  const clamped = Math.min(Math.max(value, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={center} cy={center} r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} fill="none" />
      <motion.circle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        transform={`rotate(-90 ${center} ${center})`}
        {...revealAnimation(reduceMotion, { strokeDashoffset: circumference }, { strokeDashoffset: targetOffset })}
      />
      <text x={center} y={center + size * 0.07} textAnchor="middle" fontSize={size * 0.28} fill="white" fontWeight={600}>
        {value}
      </text>
    </svg>
  );
}
