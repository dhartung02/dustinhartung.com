"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

type HeatMapProps = {
  grid: number[][];
  color?: string;
};

export default function HeatMap({ grid, color = "#22d3ee" }: HeatMapProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-1">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((intensity, colIndex) => {
            const targetOpacity = 0.15 + intensity * 0.75;

            return (
              <motion.div
                key={colIndex}
                className="h-4 flex-1 rounded-sm"
                style={{ backgroundColor: color }}
                {...revealAnimation(
                  reduceMotion,
                  { opacity: 0, scale: 0.6 },
                  { opacity: targetOpacity, scale: 1 },
                  { duration: 0.3, delay: (rowIndex * row.length + colIndex) * 0.02 }
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
