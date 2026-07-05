// src/components/catalog/CategoryTree.tsx
"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Search } from "lucide-react";
import { categoryTree, type CategoryNode } from "./content";

type CategoryTreeProps = {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
};

function TreeNode({
  node,
  depth,
  selectedCategoryId,
  onSelectCategory,
}: {
  node: CategoryNode;
  depth: number;
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = !!node.children?.length;
  const isSelected = selectedCategoryId === node.id;

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 rounded-md py-1.5 pr-2 text-[13px] transition-colors ${
          isSelected ? "bg-cyan-300/10 text-cyan-300" : "text-slate-300 hover:bg-white/5"
        }`}
        style={{ paddingLeft: 8 + depth * 14 }}
      >
        {hasChildren ? (
          <button
            type="button"
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse" : "Expand"}
            onClick={() => setExpanded((v) => !v)}
            className="shrink-0"
          >
            {expanded ? (
              <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
            ) : (
              <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
            )}
          </button>
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <button
          type="button"
          onClick={() => onSelectCategory(node.id)}
          className="flex flex-1 items-center justify-between gap-2 text-left"
        >
          <span className="flex-1 truncate">{node.name}</span>
          <span className="shrink-0 text-[11px] text-slate-500">{node.productCount}</span>
        </button>
      </div>
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={onSelectCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryTree({ selectedCategoryId, onSelectCategory }: CategoryTreeProps) {
  const totalCount = categoryTree.reduce((sum, node) => sum + node.productCount, 0);

  return (
    <div className="flex h-full flex-col bg-neutral-950/40 p-3">
      <div className="mb-3 flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1.5">
        <Search aria-hidden="true" className="h-3.5 w-3.5 text-slate-500" />
        <label htmlFor="category-search" className="sr-only">
          Search categories
        </label>
        <input
          id="category-search"
          type="text"
          placeholder="Search categories"
          className="w-full bg-transparent text-[12px] text-slate-300 placeholder:text-slate-600 focus:outline-none"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <button
          type="button"
          onClick={() => onSelectCategory("all")}
          className={`mb-1 flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[13px] font-medium transition-colors ${
            selectedCategoryId === "all" ? "bg-cyan-300/10 text-cyan-300" : "text-slate-200 hover:bg-white/5"
          }`}
        >
          <span>All Products</span>
          <span className="text-[11px] text-slate-500">{totalCount}</span>
        </button>
        {categoryTree.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
}
