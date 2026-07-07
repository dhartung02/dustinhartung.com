// src/components/reqon/StatStrip.tsx
import { statStrip, type StatItem } from "./content";

const toneClasses: Record<NonNullable<StatItem["tone"]> | "default", string> = {
  default: "text-slate-100",
  amber: "text-amber-300",
  rose: "text-rose-300",
  emerald: "text-emerald-300",
};

export default function StatStrip() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-white/10 px-4 py-3">
      {statStrip.map((stat) => (
        <div key={stat.label}>
          <p className="text-[10px] uppercase tracking-wide text-slate-500">{stat.label}</p>
          <p className={`text-lg font-semibold ${toneClasses[stat.tone ?? "default"]}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
