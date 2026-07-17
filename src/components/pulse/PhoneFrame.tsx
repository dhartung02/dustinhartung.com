// src/components/pulse/PhoneFrame.tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { revealAnimation } from "./revealAnimation";

type PhoneFrameProps = {
  children: ReactNode;
  label?: string;
  className?: string;
  scrollHint?: boolean;
  tabBar?: ReactNode;
};

export default function PhoneFrame({ children, label, className = "", scrollHint = true, tabBar }: PhoneFrameProps) {
  const reduceMotion = usePrefersReducedMotion();

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
          <div className="relative flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto px-3 py-3">{children}</div>
            {scrollHint ? (
              <>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950 to-transparent" />
                <motion.div
                  className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2"
                  {...revealAnimation(
                    reduceMotion,
                    { y: 0, opacity: 0 },
                    { y: 5, opacity: 0.8 },
                    { duration: 0.6, repeat: 2, repeatType: "reverse", ease: "easeInOut" }
                  )}
                >
                  <ChevronDown aria-hidden="true" className="h-4 w-4 text-cyan-300" />
                </motion.div>
              </>
            ) : null}
          </div>
          {tabBar}
        </div>
      </div>
    </div>
  );
}
