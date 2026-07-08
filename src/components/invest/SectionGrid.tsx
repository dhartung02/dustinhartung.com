// src/components/invest/SectionGrid.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { sectionGrid, type Urgency } from "./content";

type SectionGridProps = {
  expandedKey: string | null;
  onToggle: (key: string) => void;
};

const urgencyClasses: Record<Urgency, string> = {
  none: "border-white/10 bg-white/5 text-slate-400",
  low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  medium: "border-amber-300/30 bg-amber-300/10 text-amber-300",
  high: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  critical: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export default function SectionGrid({ expandedKey, onToggle }: SectionGridProps) {
  return (
    <div className="grid gap-3 p-5 pt-0 md:grid-cols-2">
      {sectionGrid.map((card) => {
        const expanded = expandedKey === card.key;
        const detailId = `section-detail-${card.key}`;
        return (
          <div key={card.key} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <button
              type="button"
              onClick={() => onToggle(card.key)}
              aria-expanded={expanded}
              aria-controls={detailId}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-semibold text-[#E7EBE6]">{card.title}</p>
                <span
                  className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${urgencyClasses[card.urgency]}`}
                >
                  {card.urgency}
                </span>
              </div>
              <p className="mt-1 text-[12px] text-slate-400">{card.statusLabel}</p>
              <p className="mt-1 text-[11px] text-slate-500">{card.lastReviewed}</p>
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.ul
                  id={detailId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="mt-3 flex flex-col gap-1.5 overflow-hidden border-t border-white/10 pt-3"
                >
                  {card.detail.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-[12px] leading-5 text-slate-400">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C9A86A]" />
                      {line}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
