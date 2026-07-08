// src/components/invest/CommandCenterFrame.tsx
import type { ReactNode } from "react";

type CommandCenterFrameProps = {
  children: ReactNode;
};

export default function CommandCenterFrame({ children }: CommandCenterFrameProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#16241C] px-4 py-3" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-rose-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-300/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <div className="ml-3 flex-1 rounded-md bg-black/20 px-3 py-1 text-[11px] text-slate-400">
          investment-manager.local/command-center
        </div>
      </div>
      <div className="bg-[#0E1A14]">{children}</div>
    </div>
  );
}
