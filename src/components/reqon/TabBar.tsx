// src/components/reqon/TabBar.tsx
import { tabs, type TabId } from "./content";

type TabBarProps = {
  activeTab: TabId;
  onSelectTab: (id: TabId) => void;
};

export default function TabBar({ activeTab, onSelectTab }: TabBarProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-white/10 px-4 py-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onSelectTab(tab.id)}
          aria-pressed={activeTab === tab.id}
          className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors ${
            activeTab === tab.id
              ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-300"
              : "border-white/10 text-slate-400 hover:bg-white/5"
          }`}
        >
          {tab.label}
          {tab.count !== null && (
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-slate-300">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
