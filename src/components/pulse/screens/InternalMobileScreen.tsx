// src/components/pulse/screens/InternalMobileScreen.tsx
"use client";

import HorizontalBar from "../charts/HorizontalBar";
import { internalTelemetry } from "../content";

export default function InternalMobileScreen() {
  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300">Mobile App Usage</p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          Screen views inside the mobile companion itself — captured via production RUM, not customer telemetry.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">Screen Views</p>
        <HorizontalBar data={internalTelemetry.mobile.screenViews} color="#22d3ee" />
      </div>
    </div>
  );
}
