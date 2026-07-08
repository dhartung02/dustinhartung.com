// src/components/invest/NextActionHero.tsx
import { nextAction, nextActionBoundary, type Urgency } from "./content";

const urgencyClasses: Record<Urgency, string> = {
  none: "border-white/10 bg-white/5 text-slate-400",
  low: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  medium: "border-amber-300/30 bg-amber-300/10 text-amber-300",
  high: "border-orange-400/30 bg-orange-400/10 text-orange-300",
  critical: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export default function NextActionHero() {
  return (
    <div className="border-b border-white/10 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Next Workflow Action</p>
        <span
          className={`rounded border px-2 py-0.5 text-[10px] font-semibold uppercase ${urgencyClasses[nextAction.urgency]}`}
        >
          {nextAction.urgency}
        </span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-[#E7EBE6]">{nextAction.label}</h3>
      <p className="mt-1.5 text-[13px] leading-6 text-slate-400">{nextAction.reason}</p>
      <p className="mt-1 text-[11px] text-slate-500">Opens: {nextAction.opensTarget}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" className="rounded-md bg-[#C9A86A] px-4 py-2 text-[13px] font-semibold text-[#0E1A14]">
          Go → {nextAction.label}
        </button>
        <button type="button" className="rounded-md border border-white/10 px-4 py-2 text-[13px] text-slate-300">
          Start guided review
        </button>
      </div>

      <p className="mt-4 max-w-xl text-[12px] leading-5 text-slate-500">{nextActionBoundary}</p>
    </div>
  );
}
