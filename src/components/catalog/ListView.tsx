// src/components/catalog/ListView.tsx
import { Folder } from "lucide-react";
import { kpisByScope, type CategoryNode, type Product } from "./content";

type ListViewProps = {
  categories: CategoryNode[];
  products: Product[];
  onCategoryDoubleClick: (id: string) => void;
  onCategorySingleClick: (id: string) => void;
  onProductClick: (id: string) => void;
};

export default function ListView({
  categories,
  products,
  onCategoryDoubleClick,
  onCategorySingleClick,
  onProductClick,
}: ListViewProps) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[1.6fr_0.7fr_0.9fr_0.7fr_0.8fr_0.9fr] gap-2 border-b border-white/10 px-2 pb-2 text-[10px] uppercase tracking-wide text-slate-500">
        <span>{categories.length > 0 ? "Category" : "Product"}</span>
        <span className="text-right">Interest</span>
        <span className="text-right">Revenue</span>
        <span className="text-right">Sales</span>
        <span className="text-right">Views</span>
        <span className="text-right">Cart Abandons</span>
      </div>
      {categories.length > 0
        ? categories.map((category) => {
            const kpis = kpisByScope[category.id] ?? kpisByScope.all;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategorySingleClick(category.id)}
                onDoubleClick={() => onCategoryDoubleClick(category.id)}
                className="grid grid-cols-[1.6fr_0.7fr_0.9fr_0.7fr_0.8fr_0.9fr] items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-white/5"
              >
                <span className="flex items-center gap-2 truncate text-[13px] text-slate-200">
                  <Folder aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-300" />
                  <span className="truncate">{category.name}</span>
                </span>
                <span className="text-right text-[12px] text-slate-300">{kpis.interestScore}</span>
                <span className="text-right text-[12px] text-slate-300">${(kpis.revenue.value / 1000).toFixed(1)}K</span>
                <span className="text-right text-[12px] text-slate-300">{kpis.purchases.value.toLocaleString()}</span>
                <span className="text-right text-[12px] text-slate-300">{(kpis.views.value / 1000).toFixed(1)}K</span>
                <span className="text-right text-[12px] text-slate-300">{kpis.cartAbandons.value.toLocaleString()}</span>
              </button>
            );
          })
        : products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => onProductClick(product.id)}
              className="grid grid-cols-[1.6fr_0.7fr_0.9fr_0.7fr_0.8fr_0.9fr] items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-white/5"
            >
              <span className="flex items-center gap-2 truncate text-[13px] text-slate-200">
                <span className="h-6 w-6 shrink-0 rounded" style={{ backgroundColor: product.swatchColor }} />
                <span className="truncate">{product.name}</span>
              </span>
              <span className="text-right text-[12px] text-slate-300">{product.interestScore}</span>
              <span className="text-right text-[12px] text-slate-300">${(product.revenue / 1000).toFixed(1)}K</span>
              <span className="text-right text-[12px] text-slate-300">{product.sales}</span>
              <span className="text-right text-[12px] text-slate-300">{(product.views / 1000).toFixed(1)}K</span>
              <span className="text-right text-[12px] text-slate-300">{product.cartAbandons}</span>
            </button>
          ))}
    </div>
  );
}
