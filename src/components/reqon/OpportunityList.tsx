// src/components/reqon/OpportunityList.tsx
import { opportunities, type TabId } from "./content";

type OpportunityListProps = {
  activeTab: Exclude<TabId, "analytics">;
  onSelectOpportunity: (id: string) => void;
};

const tierClasses: Record<string, string> = {
  A: "border-emerald-300/40 bg-emerald-300/10 text-emerald-300",
  B: "border-amber-300/40 bg-amber-300/10 text-amber-300",
  C: "border-white/10 bg-white/5 text-slate-400",
};

export default function OpportunityList({ activeTab, onSelectOpportunity }: OpportunityListProps) {
  const rows =
    activeTab === "today" ? opportunities.filter((o) => o.today) : opportunities.filter((o) => o.stage === activeTab);

  return (
    <div className="flex flex-col divide-y divide-white/5 px-4">
      <div className="grid grid-cols-[1.6fr_0.9fr_0.6fr_0.6fr_0.6fr] gap-2 pb-2 pt-3 text-[10px] uppercase tracking-wide text-slate-500">
        <span>Role</span>
        <span>Company</span>
        <span className="text-right">Fit</span>
        <span className="text-right">Prob</span>
        <span className="text-right">EV</span>
      </div>
      {rows.map((row) => (
        <button
          key={row.id}
          type="button"
          onClick={() => onSelectOpportunity(row.id)}
          className="grid grid-cols-[1.6fr_0.9fr_0.6fr_0.6fr_0.6fr] items-center gap-2 py-2.5 text-left hover:bg-white/5"
        >
          <span className="flex items-center gap-2 truncate text-[13px] text-slate-200">
            <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${tierClasses[row.tier]}`}>
              {row.tier}
            </span>
            <span className="truncate">{row.role}</span>
          </span>
          <span className="truncate text-[12px] text-slate-400">{row.company}</span>
          <span className="text-right text-[12px] text-slate-300">{row.fit.toFixed(1)}</span>
          <span className="text-right text-[12px] text-slate-300">{row.probability.toFixed(1)}</span>
          <span className="text-right text-[12px] text-slate-300">{row.ev.toFixed(1)}</span>
        </button>
      ))}
    </div>
  );
}
