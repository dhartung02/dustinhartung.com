import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  label?: string;
  className?: string;
};

export default function PhoneFrame({ children, label, className = "" }: PhoneFrameProps) {
  return (
    <div className={`mx-auto w-full max-w-[300px] ${className}`}>
      <div className="relative aspect-[9/19.5] w-full rounded-[2.75rem] border-[6px] border-neutral-800 bg-neutral-800 shadow-2xl shadow-black/50">
        <div className="absolute left-1/2 top-2.5 z-10 h-4 w-24 -translate-x-1/2 rounded-full bg-neutral-900" />
        <div className="flex h-full w-full flex-col overflow-hidden rounded-[2.25rem] bg-slate-950">
          {label ? (
            <div className="border-b border-white/10 bg-slate-900/80 px-4 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {label}
            </div>
          ) : (
            <div className="h-6" />
          )}
          <div className="flex-1 overflow-y-auto px-3 py-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
