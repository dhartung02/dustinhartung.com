// src/components/reqon/OpportunityDetailPanel.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { opportunities } from "./content";

type OpportunityDetailPanelProps = {
  opportunityId: string | null;
  onClose: () => void;
};

const tierClasses: Record<string, string> = {
  A: "border-emerald-300/40 bg-emerald-300/10 text-emerald-300",
  B: "border-amber-300/40 bg-amber-300/10 text-amber-300",
  C: "border-white/10 bg-white/5 text-slate-400",
};

export default function OpportunityDetailPanel({ opportunityId, onClose }: OpportunityDetailPanelProps) {
  const reduceMotion = usePrefersReducedMotion();
  const opportunity = opportunityId ? opportunities.find((o) => o.id === opportunityId) : undefined;

  return (
    <AnimatePresence>
      {opportunity && (
        <motion.div
          key={opportunity.id}
          className="absolute inset-y-0 right-0 z-20 flex w-96 flex-col overflow-y-auto border-l border-white/10 bg-neutral-950 p-4 shadow-2xl"
          initial={reduceMotion ? { opacity: 1 } : { x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { x: "100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded border px-1.5 py-0.5 text-[10px] font-semibold ${tierClasses[opportunity.tier]}`}>
                TIER {opportunity.tier}
              </span>
              <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-slate-300">
                {opportunity.fitLabel}
              </span>
            </div>
            <button type="button" onClick={onClose} aria-label="Close opportunity detail">
              <X aria-hidden="true" className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          <h3 className="text-[15px] font-semibold text-slate-100">{opportunity.role}</h3>
          <p className="mt-1 text-[13px] text-slate-400">{opportunity.company}</p>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-2 text-center">
              <p className="text-[10px] uppercase text-slate-500">Fit</p>
              <p className="text-sm font-semibold text-emerald-300">{opportunity.fit.toFixed(1)}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-2 text-center">
              <p className="text-[10px] uppercase text-slate-500">Prob</p>
              <p className="text-sm font-semibold text-slate-100">{opportunity.probability.toFixed(1)}</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[0.03] p-2 text-center">
              <p className="text-[10px] uppercase text-slate-500">EV</p>
              <p className="text-sm font-semibold text-slate-100">{opportunity.ev.toFixed(1)}</p>
            </div>
          </div>

          <dl className="mt-4 flex flex-col gap-2.5 text-[12px]">
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Location</dt>
              <dd className="text-right text-slate-200">{opportunity.location}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Salary</dt>
              <dd className="text-right text-slate-200">{opportunity.salaryRange}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Link confidence</dt>
              <dd className="text-right text-slate-200">{opportunity.linkConfidence}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Status</dt>
              <dd className="text-right capitalize text-slate-200">{opportunity.stage}</dd>
            </div>
          </dl>

          <div className="mt-4 rounded-md border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase text-slate-500">Next action</p>
            <p className="mt-1 text-[13px] text-slate-200">{opportunity.nextAction}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 text-[12px] font-medium text-emerald-300"
            >
              Open ↗
            </button>
            <button type="button" className="rounded-md border border-white/10 px-3 py-1.5 text-[12px] text-slate-300">
              Edit details
            </button>
            <button type="button" className="rounded-md border border-white/10 px-3 py-1.5 text-[12px] text-slate-300">
              ✨ Enrich
            </button>
            <button type="button" className="rounded-md border border-white/10 px-3 py-1.5 text-[12px] text-slate-300">
              AI draft
            </button>
            <button type="button" className="rounded-md border border-white/10 px-3 py-1.5 text-[12px] text-rose-300">
              Delete
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
