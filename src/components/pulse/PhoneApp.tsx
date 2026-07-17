"use client";

import { useState } from "react";
import PhoneFrame from "./PhoneFrame";
import { pulseTabs, type PulseTab } from "./tabs";

type PhoneAppProps = {
  initialTabId: string;
  tabs?: PulseTab[];
  className?: string;
};

export default function PhoneApp({ initialTabId, tabs = pulseTabs, className }: PhoneAppProps) {
  const [activeId, setActiveId] = useState<string>(initialTabId);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const Screen = active.screen;

  return (
    <PhoneFrame
      label={active.label}
      className={className}
      tabBar={
        <div className="flex items-stretch justify-around border-t border-white/10 bg-slate-900/90">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveId(tab.id)}
                aria-pressed={isActive}
                aria-label={tab.label}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[8px] font-medium uppercase tracking-wide transition-colors ${
                  isActive ? "text-cyan-300" : "text-slate-500"
                }`}
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
                {tab.shortLabel}
              </button>
            );
          })}
        </div>
      }
    >
      <Screen />
    </PhoneFrame>
  );
}
