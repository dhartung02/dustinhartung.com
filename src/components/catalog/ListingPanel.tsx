// src/components/catalog/ListingPanel.tsx
"use client";

import { useState } from "react";
import { List, LayoutGrid, Filter as FilterIcon, ChevronLeft } from "lucide-react";
import { categoryTree, allCategories, productsByCategory, type CategoryNode } from "./content";
import ListView from "./ListView";
import GridView from "./GridView";
import type { SelectedEntity } from "./ProductCatalogApp";

type ListingPanelProps = {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  onFilterToggle: () => void;
  onSelectEntity: (entity: SelectedEntity) => void;
};

function getChildrenOf(folderId: string): CategoryNode[] {
  if (folderId === "all") return categoryTree;
  const node = allCategories.find((c) => c.id === folderId);
  return node?.children ?? [];
}

export default function ListingPanel({ viewMode, onViewModeChange, onFilterToggle, onSelectEntity }: ListingPanelProps) {
  const [currentFolderId, setCurrentFolderId] = useState("all");

  const folderNode = currentFolderId === "all" ? null : allCategories.find((c) => c.id === currentFolderId) ?? null;
  const childCategories = getChildrenOf(currentFolderId);
  const isLeafFolder = currentFolderId !== "all" && childCategories.length === 0;
  const products = isLeafFolder ? productsByCategory[currentFolderId] ?? [] : [];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          {currentFolderId !== "all" && (
            <button
              type="button"
              onClick={() => setCurrentFolderId("all")}
              className="flex items-center gap-1 text-[12px] text-slate-400 hover:text-slate-200"
            >
              <ChevronLeft aria-hidden="true" className="h-3.5 w-3.5" />
              All Products
            </button>
          )}
          {folderNode && <span className="text-[12px] font-medium text-slate-200">/ {folderNode.name}</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-md border border-white/10">
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              aria-pressed={viewMode === "list"}
              aria-label="List view"
              className={`p-1.5 ${viewMode === "list" ? "bg-cyan-300/15 text-cyan-300" : "text-slate-500"}`}
            >
              <List aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              aria-pressed={viewMode === "grid"}
              aria-label="Grid view"
              className={`p-1.5 ${viewMode === "grid" ? "bg-cyan-300/15 text-cyan-300" : "text-slate-500"}`}
            >
              <LayoutGrid aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onFilterToggle}
            className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-[12px] text-slate-300 hover:bg-white/5"
          >
            <FilterIcon aria-hidden="true" className="h-3.5 w-3.5" />
            Filter
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {viewMode === "list" ? (
          <ListView
            categories={childCategories}
            products={products}
            onCategoryDoubleClick={setCurrentFolderId}
            onCategorySingleClick={(id) => onSelectEntity({ type: "category", id })}
            onProductClick={(id) => onSelectEntity({ type: "product", id })}
          />
        ) : (
          <GridView
            categories={childCategories}
            products={products}
            onCategoryDoubleClick={setCurrentFolderId}
            onCategorySingleClick={(id) => onSelectEntity({ type: "category", id })}
            onProductClick={(id) => onSelectEntity({ type: "product", id })}
          />
        )}
      </div>
    </div>
  );
}
