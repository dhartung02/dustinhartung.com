// src/components/reqon/AnalyticsTab.tsx
import { insights, conversionFunnel, applicationOutcomes } from "./content";

const outcomeTone: Record<string, string> = {
  slate: "bg-slate-500",
  emerald: "bg-emerald-400",
  rose: "bg-rose-400",
};

export default function AnalyticsTab() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <p className="mb-3 text-[13px] font-semibold text-slate-100">Insights</p>
        <ul className="flex flex-col gap-2">
          {insights.map((insight) => (
            <li key={insight} className="flex items-start gap-2 text-[12px] leading-5 text-slate-300">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-300" />
              {insight}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-3 text-[13px] font-semibold text-slate-100">Conversion funnel</p>
        <div className="flex flex-col gap-2">
          {conversionFunnel.map((stage) => (
            <div key={stage.stage} className="flex items-center gap-3">
              <span className="w-32 shrink-0 text-[12px] text-slate-400">{stage.stage}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: `${stage.pct}%` }} />
              </div>
              <span className="w-20 shrink-0 text-right text-[12px] text-slate-300">
                {stage.count} · {stage.pct.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-[13px] font-semibold text-slate-100">Application outcomes</p>
        <div className="flex flex-col gap-2">
          {applicationOutcomes.map((outcome) => (
            <div key={outcome.label} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-[12px] text-slate-400">{outcome.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                <div className={`h-full rounded-full ${outcomeTone[outcome.tone]}`} style={{ width: `${outcome.pct}%` }} />
              </div>
              <span className="w-20 shrink-0 text-right text-[12px] text-slate-300">
                {outcome.count} · {outcome.pct.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
