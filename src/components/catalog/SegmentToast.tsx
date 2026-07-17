// src/components/catalog/SegmentToast.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";

type SegmentToastProps = {
  message: string | null;
  onDismiss: () => void;
};

export default function SegmentToast({ message, onDismiss }: SegmentToastProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="absolute right-4 top-4 z-30 flex max-w-xs items-start gap-2 rounded-lg border border-emerald-400/20 bg-neutral-900/95 p-3 shadow-2xl"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
          <p className="flex-1 text-[12px] text-slate-200">{message}</p>
          <button type="button" onClick={onDismiss} aria-label="Dismiss notification" className="shrink-0">
            <X aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
