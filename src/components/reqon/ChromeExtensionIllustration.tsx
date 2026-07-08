// src/components/reqon/ChromeExtensionIllustration.tsx
import { chromeExtension } from "./content";

export default function ChromeExtensionIllustration() {
  return (
    <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50">
      <div
        aria-hidden="true"
        className="flex items-center justify-between border-b border-white/10 bg-neutral-900/60 px-3 py-2"
      >
        <p className="text-[11px] font-medium text-slate-300">Reqon Clip</p>
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="flex flex-col gap-4 p-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">{chromeExtension.pageLabel}</p>
          <p className="mt-1 truncate text-[12px] text-slate-200">{chromeExtension.pageTitle}</p>
          <button
            type="button"
            className="mt-3 w-full rounded-md bg-emerald-400 py-1.5 text-[12px] font-semibold text-neutral-950"
          >
            + Clip to board
          </button>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-wide text-slate-500">Keyword coverage</p>
            <p className="text-[12px] font-semibold text-amber-300">{chromeExtension.keywordCoverage.pct}%</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {chromeExtension.keywords.map((kw) => (
              <span
                key={kw.word}
                className={`rounded-full border px-2 py-0.5 text-[10px] ${
                  kw.matched ? "border-white/10 text-slate-300" : "border-amber-300/30 text-amber-300"
                }`}
              >
                {kw.word}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-center">
            <p className="text-lg font-semibold text-slate-100">{chromeExtension.pipelineStats.rolesTracked}</p>
            <p className="text-[10px] uppercase text-slate-500">Roles tracked</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-center">
            <p className="text-lg font-semibold text-emerald-300">{chromeExtension.pipelineStats.openNotApplied}</p>
            <p className="text-[10px] uppercase text-slate-500">Open / not applied</p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] uppercase tracking-wide text-slate-500">Top opportunities to apply</p>
          <div className="flex flex-col gap-2">
            {chromeExtension.topOpportunities.map((opp) => (
              <div key={opp.role} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-medium text-slate-200">{opp.role}</p>
                  <p className="truncate text-[11px] text-slate-500">{opp.company}</p>
                </div>
                <span className="shrink-0 text-[12px] font-semibold text-emerald-300">{opp.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
