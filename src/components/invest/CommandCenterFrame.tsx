// src/components/invest/CommandCenterFrame.tsx
import type { ReactNode } from "react";

type CommandCenterFrameProps = {
  children: ReactNode;
  className?: string;
};

// Uses the real product's actual Streamlit theme colors (#16241C chrome bar,
// #0E1A14 canvas) as a deliberate brand homage, not stray hardcoding — see
// docs/superpowers/specs/2026-07-08-ai-investment-manager-design.md.
export default function CommandCenterFrame({ children, className = "" }: CommandCenterFrameProps) {
  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 ${className}`}
    >
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
