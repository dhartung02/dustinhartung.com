// src/components/catalog/FilterPanel.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { filterOptions } from "./content";

type FilterPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function FilterPanel({ open, onClose }: FilterPanelProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-10 flex flex-col bg-neutral-950 p-3"
          initial={reduceMotion ? { opacity: 1 } : { x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { x: "-100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Filter</p>
            <button type="button" onClick={onClose} aria-label="Close filter panel">
              <X aria-hidden="true" className="h-4 w-4 text-slate-400" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <p className="mb-2 text-[10px] uppercase tracking-wide text-slate-500">Price</p>
            <div className="mb-4 flex flex-col gap-1.5">
              {filterOptions.priceRanges.map((range) => (
                <label key={range} className="flex items-center gap-2 text-[12px] text-slate-300">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-white/20 bg-transparent" />
                  {range}
                </label>
              ))}
            </div>
            <p className="mb-2 text-[10px] uppercase tracking-wide text-slate-500">Attributes</p>
            <div className="flex flex-col gap-1.5">
              {filterOptions.attributes.map((attribute) => (
                <label key={attribute} className="flex items-center gap-2 text-[12px] text-slate-300">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-white/20 bg-transparent" />
                  {attribute}
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
