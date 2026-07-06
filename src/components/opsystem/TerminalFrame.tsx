// src/components/opsystem/TerminalFrame.tsx
import type { ReactNode } from "react";

type TerminalFrameProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function TerminalFrame({ title, children, className = "" }: TerminalFrameProps) {
  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl shadow-black/50 ${className}`}
    >
      <div
        aria-hidden="true"
        className="flex items-center gap-2 border-b border-white/10 bg-neutral-900/60 px-4 py-3"
      >
        <span className="h-3 w-3 rounded-full bg-[#f43f5e]" />
        <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
        <span className="h-3 w-3 rounded-full bg-[#10b981]" />
        <p className="ml-3 text-[11px] font-medium text-slate-500">{title}</p>
      </div>
      <div className="overflow-x-auto bg-black p-5 font-mono text-[13px] leading-6">{children}</div>
    </div>
  );
}
