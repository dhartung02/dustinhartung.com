// src/components/catalog/BrowserFrame.tsx
import type { ReactNode } from "react";

type BrowserFrameProps = {
  children: ReactNode;
  className?: string;
};

export default function BrowserFrame({ children, className = "" }: BrowserFrameProps) {
  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-neutral-950/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#f43f5e]" />
        <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
        <span className="h-3 w-3 rounded-full bg-[#10b981]" />
        <div className="ml-4 flex-1 rounded-md bg-white/5 px-3 py-1 text-center text-[11px] text-slate-500">
          catalog.internal/products
        </div>
      </div>
      <div className="bg-slate-950">{children}</div>
    </div>
  );
}
