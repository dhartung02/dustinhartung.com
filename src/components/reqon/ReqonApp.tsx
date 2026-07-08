// src/components/reqon/ReqonApp.tsx
"use client";

import { useState } from "react";
import BrowserFrame from "./BrowserFrame";
import TabBar from "./TabBar";
import StatStrip from "./StatStrip";
import ActionNeededGrid from "./ActionNeededGrid";
import OpportunityList from "./OpportunityList";
import OpportunityDetailPanel from "./OpportunityDetailPanel";
import AnalyticsTab from "./AnalyticsTab";
import type { TabId } from "./content";

export default function ReqonApp() {
  const [activeTab, setActiveTab] = useState<TabId>("today");
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);

  const handleSelectTab = (tab: TabId) => {
    setActiveTab(tab);
    setSelectedOpportunityId(null);
  };

  return (
    <BrowserFrame>
      <div className="relative flex h-[640px] w-full flex-col overflow-hidden">
        <StatStrip />
        <TabBar activeTab={activeTab} onSelectTab={handleSelectTab} />
        <div className="flex-1 overflow-y-auto">
          {activeTab === "analytics" ? (
            <AnalyticsTab />
          ) : (
            <>
              {activeTab === "today" && <ActionNeededGrid />}
              <OpportunityList activeTab={activeTab} onSelectOpportunity={setSelectedOpportunityId} />
            </>
          )}
        </div>
        <OpportunityDetailPanel opportunityId={selectedOpportunityId} onClose={() => setSelectedOpportunityId(null)} />
      </div>
    </BrowserFrame>
  );
}
