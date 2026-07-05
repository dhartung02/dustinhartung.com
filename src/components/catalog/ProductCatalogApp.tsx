// src/components/catalog/ProductCatalogApp.tsx
"use client";

import { useEffect, useState } from "react";
import BrowserFrame from "./BrowserFrame";
import CategoryTree from "./CategoryTree";
import KpiHeader from "./KpiHeader";
import ListingPanel from "./ListingPanel";
import FilterPanel from "./FilterPanel";
import AnalyticsPanel from "./AnalyticsPanel";
import SegmentToast from "./SegmentToast";

export type SelectedEntity = { type: "product" | "category"; id: string } | null;

export default function ProductCatalogApp() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(null);
  const [listingResetToken, setListingResetToken] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleSelectCategory = (id: string) => {
    setSelectedCategoryId(id);
    if (id === "all") {
      setListingResetToken((n) => n + 1);
    }
  };

  return (
    <BrowserFrame>
      <div className="relative flex h-[640px] w-full overflow-hidden">
        <div className="relative h-full w-56 shrink-0 border-r border-white/10">
          <CategoryTree selectedCategoryId={selectedCategoryId} onSelectCategory={handleSelectCategory} />
          <FilterPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
        </div>
        <div className="flex h-full flex-1 flex-col">
          <KpiHeader scopeId={selectedCategoryId} onCreateSegment={setToastMessage} />
          <div className="flex-1 overflow-hidden">
            <ListingPanel
              key={listingResetToken}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onFilterToggle={() => setFilterOpen((v) => !v)}
              onSelectEntity={setSelectedEntity}
            />
          </div>
        </div>
        <AnalyticsPanel entity={selectedEntity} onClose={() => setSelectedEntity(null)} />
        <SegmentToast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      </div>
    </BrowserFrame>
  );
}
