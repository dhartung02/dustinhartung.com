// src/components/catalog/AnalyticsPanel.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { allCategories, allProducts } from "./content";
import InsightsTab from "./InsightsTab";
import AttributesTab from "./AttributesTab";
import VariantsTab from "./VariantsTab";
import type { SelectedEntity } from "./ProductCatalogApp";

type AnalyticsPanelProps = {
  entity: SelectedEntity;
  onClose: () => void;
};

type Tab = "insights" | "attributes" | "variants";

export default function AnalyticsPanel({ entity, onClose }: AnalyticsPanelProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [activeTab, setActiveTab] = useState<Tab>("insights");

  const product = entity?.type === "product" ? allProducts.find((p) => p.id === entity.id) : undefined;
  const category = entity?.type === "category" ? allCategories.find((c) => c.id === entity.id) : undefined;

  const tabs: { id: Tab; label: string }[] =
    entity?.type === "product"
      ? [
          { id: "insights", label: "Insights" },
          { id: "attributes", label: "Attributes" },
          { id: "variants", label: "Variants" },
        ]
      : [{ id: "insights", label: "Insights" }];

  return (
    <AnimatePresence onExitComplete={() => setActiveTab("insights")}>
      {entity && (
        <motion.div
          className="absolute inset-y-0 right-0 z-20 flex w-80 flex-col border-l border-white/10 bg-neutral-950 shadow-2xl"
          initial={reduceMotion ? { opacity: 1 } : { x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { x: "100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 border-b border-white/10 p-3">
            <span
              className="h-10 w-10 shrink-0 rounded"
              style={{ backgroundColor: product?.swatchColor ?? "#22d3ee" }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-slate-100">{product?.name ?? category?.name}</p>
              <p className="text-[11px] text-slate-500">
                {product ? `${product.sales} sales · In Stock` : `${category?.productCount ?? 0} products`}
              </p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close analytics panel">
              <X aria-hidden="true" className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          <div className="flex border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`flex-1 py-2 text-[11px] font-medium uppercase tracking-wide transition-colors ${
                  activeTab === tab.id ? "border-b-2 border-cyan-300 text-cyan-300" : "text-slate-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {activeTab === "insights" && entity && <InsightsTab entity={entity} />}
            {activeTab === "attributes" && product && <AttributesTab product={product} />}
            {activeTab === "variants" && product && <VariantsTab product={product} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
