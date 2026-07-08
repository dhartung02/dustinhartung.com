// src/components/reqon/ActionNeededGrid.tsx
import { actionNeeded } from "./content";

export default function ActionNeededGrid() {
  return (
    <div className="p-4">
      <p className="mb-3 text-[11px] uppercase tracking-wide text-slate-500">
        Action needed — your daily loop: discover → verify → apply → follow up
      </p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {actionNeeded.map((card) => (
          <div key={card.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xl font-semibold text-emerald-300">
              <span className="sr-only">Count: </span>
              {card.count}
            </p>
            <p className="mt-1 text-[13px] font-medium text-slate-200">{card.title}</p>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
