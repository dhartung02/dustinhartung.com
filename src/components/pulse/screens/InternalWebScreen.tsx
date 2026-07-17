// src/components/pulse/screens/InternalWebScreen.tsx
"use client";

import HorizontalBar from "../charts/HorizontalBar";
import { internalTelemetry } from "../content";

export default function InternalWebScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Web Platform Usage</p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          Which parts of the web platform the internal team actually uses — separate from the mobile companion.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Feature Areas</p>
        <HorizontalBar data={internalTelemetry.web.featureAreas} color="#34d399" />
      </div>
    </div>
  );
}
