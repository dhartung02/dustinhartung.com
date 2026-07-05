// src/components/pulse/screens/AIBriefingScreen.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye, TrendingUp, CheckSquare } from "lucide-react";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";
import { aiBriefing, briefingCategoryLabel, type BriefingItem } from "../content";

const categoryIcon: Record<BriefingItem["category"], typeof Sparkles> = {
  changed: Sparkles,
  watch: Eye,
  working: TrendingUp,
  action: CheckSquare,
};

const categoryColor: Record<BriefingItem["category"], string> = {
  changed: "#f59e0b",
  watch: "#22d3ee",
  working: "#34d399",
  action: "#22d3ee",
};

type BriefMode = "deterministic" | "ai";

export default function AIBriefingScreen() {
  const reduceMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState<BriefMode>("deterministic");

  return (
    <div className="flex flex-col gap-3 text-slate-100">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Today&apos;s Executive Brief</p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          Every brief ships with a deterministic baseline. Bring your own API key in Settings and the same facts
          are described with AI-generated language instead.
        </p>
      </div>

      <div className="flex rounded-lg border border-white/10 bg-white/[0.04] p-0.5">
        {(
          [
            { id: "deterministic" as const, label: "Deterministic" },
            { id: "ai" as const, label: "AI-Enhanced" },
          ]
        ).map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setMode(option.id)}
            aria-pressed={mode === option.id}
            className={`flex-1 rounded-md py-1.5 text-[9px] font-semibold uppercase tracking-wide transition-colors ${
              mode === option.id ? "bg-cyan-300/15 text-cyan-300" : "text-slate-500"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {aiBriefing.map((item, index) => {
        const Icon = categoryIcon[item.category];
        const color = categoryColor[item.category];
        const detail = mode === "ai" ? item.aiEnhancedDetail : item.deterministicDetail;

        return (
          <motion.div
            key={item.id}
            {...revealAnimation(
              reduceMotion,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0 },
              { duration: 0.4, delay: index * 0.12 }
            )}
          >
            <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {briefingCategoryLabel[item.category]}
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
              <div className="flex items-start gap-2">
                <Icon aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color }} />
                <div className="flex-1">
                  <p className="text-[11px] font-semibold leading-snug text-slate-100">{item.title}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-slate-400">{detail}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
