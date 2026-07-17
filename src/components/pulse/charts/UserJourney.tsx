"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

export type JourneyFlow = { from: string; to: string; value: number };

type UserJourneyProps = {
  stages: string[][];
  flows: JourneyFlow[];
  color?: string;
};

const WIDTH = 240;
const HEIGHT = 132;
const PADDING_X = 34;
const NODE_WIDTH = 58;
const NODE_HEIGHT = 16;

export default function UserJourney({ stages, flows, color = "#22d3ee" }: UserJourneyProps) {
  const reduceMotion = usePrefersReducedMotion();
  const stageGap = stages.length > 1 ? (WIDTH - PADDING_X * 2) / (stages.length - 1) : 0;

  const positions = new Map<string, { x: number; y: number }>();
  stages.forEach((nodes, stageIndex) => {
    const x = PADDING_X + stageGap * stageIndex;
    const rowGap = HEIGHT / (nodes.length + 1);
    nodes.forEach((label, nodeIndex) => {
      positions.set(label, { x, y: rowGap * (nodeIndex + 1) });
    });
  });

  const maxValue = Math.max(...flows.map((flow) => flow.value), 1);

  return (
    <svg width="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true">
      {flows.map((flow, index) => {
        const from = positions.get(flow.from);
        const to = positions.get(flow.to);
        if (!from || !to) return null;
        // Start/end at the node's edge, not its center — otherwise the path is drawn
        // straight through the (translucent) node pill and its label text.
        const fromX = from.x + NODE_WIDTH / 2;
        const toX = to.x - NODE_WIDTH / 2;
        const midX = (fromX + toX) / 2;
        const strokeWidth = 1 + (flow.value / maxValue) * 4;

        return (
          <motion.path
            key={`${flow.from}-${flow.to}`}
            d={`M ${fromX} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${toX} ${to.y}`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            {...revealAnimation(
              reduceMotion,
              { opacity: 0 },
              { opacity: 0.2 + (flow.value / maxValue) * 0.55 },
              { duration: 0.5, delay: index * 0.05 }
            )}
          />
        );
      })}

      {stages.map((nodes) =>
        nodes.map((label) => {
          const pos = positions.get(label);
          if (!pos) return null;
          return (
            <g key={label} transform={`translate(${pos.x - NODE_WIDTH / 2}, ${pos.y - NODE_HEIGHT / 2})`}>
              <rect
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={8}
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.15)"
              />
              <text x={NODE_WIDTH / 2} y={NODE_HEIGHT / 2 + 3} textAnchor="middle" fontSize={7} fill="#e2e8f0">
                {label}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
}
