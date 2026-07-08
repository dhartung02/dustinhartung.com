// src/components/invest/SectionGrid.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { sectionGrid, urgencyClasses } from "./content";

type SectionGridProps = {
  expandedKey: string | null;
  onToggle: (key: string) => void;
};

export default function SectionGrid({ expandedKey, onToggle }: SectionGridProps) {
  const reduceMotion = usePrefersReducedMotion();

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
                  initial={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                  className="mt-3 flex flex-col gap-1.5 overflow-hidden border-t border-white/10 pt-3"
                >
                  {card.detail.map((line, index) => (
                    <li key={`${card.key}-${index}`} className="flex items-start gap-2 text-[12px] leading-5 text-slate-400">
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
