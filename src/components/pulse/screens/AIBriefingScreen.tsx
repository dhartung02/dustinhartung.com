// src/components/pulse/screens/AIBriefingScreen.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, AlertCircle, Lightbulb } from "lucide-react";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";
import { aiBriefing, type BriefingItem } from "../content";

const categoryIcon: Record<BriefingItem["category"], typeof Sparkles> = {
  changed: Sparkles,
  attention: AlertCircle,
  opportunity: Lightbulb,
};

const categoryColor: Record<BriefingItem["category"], string> = {
  changed: "#22d3ee",
  attention: "#f59e0b",
  opportunity: "#34d399",
};

export default function AIBriefingScreen() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-3 text-slate-100">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Concept: AI Briefing</p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          Illustrative concept, not part of the shipped MVP — a possible future extension of the same trusted data
          foundation.
        </p>
      </div>

      {aiBriefing.map((item, index) => {
        const Icon = categoryIcon[item.category];
        const color = categoryColor[item.category];

        return (
          <motion.div
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0 },
              { duration: 0.4, delay: index * 0.12 }
            )}
          >
            <div className="flex items-start gap-2">
              <Icon aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color }} />
              <div className="flex-1">
                <p className="text-[11px] font-semibold leading-snug text-slate-100">{item.title}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{item.detail}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
