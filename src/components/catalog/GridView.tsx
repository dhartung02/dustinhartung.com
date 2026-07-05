// src/components/catalog/GridView.tsx
import { Folder, Eye, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { kpisByScope, type CategoryNode, type Product } from "./content";

type GridViewProps = {
  categories: CategoryNode[];
  products: Product[];
  onCategoryDoubleClick: (id: string) => void;
  onCategorySingleClick: (id: string) => void;
  onProductClick: (id: string) => void;
};

export default function GridView({
  categories,
  products,
  onCategoryDoubleClick,
  onCategorySingleClick,
  onProductClick,
}: GridViewProps) {
  if (categories.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category) => {
          const kpis = kpisByScope[category.id] ?? kpisByScope.all;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategorySingleClick(category.id)}
              onDoubleClick={() => onCategoryDoubleClick(category.id)}
              className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-left hover:bg-white/5"
            >
              <span className="flex h-16 w-full shrink-0 items-center justify-center rounded bg-white/[0.05]">
                <Folder aria-hidden="true" className="h-7 w-7 text-cyan-300" />
              </span>
              <span className="truncate text-[12px] font-medium text-slate-200">{category.name}</span>
              <div className="grid grid-cols-2 gap-1.5">
                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <TrendingUp aria-hidden="true" className="h-3 w-3 text-emerald-400" />
                  <span className="sr-only">Interest score </span>
                  {kpis.interestScore}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <DollarSign aria-hidden="true" className="h-3 w-3 text-cyan-300" />
                  <span className="sr-only">Revenue </span>
                  {(kpis.revenue.value / 1000).toFixed(1)}K
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Eye aria-hidden="true" className="h-3 w-3 text-slate-400" />
                  <span className="sr-only">Views </span>
                  {(kpis.views.value / 1000).toFixed(1)}K
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <ShoppingCart aria-hidden="true" className="h-3 w-3 text-amber-400" />
                  <span className="sr-only">Cart abandons </span>
                  {kpis.cartAbandons.value.toLocaleString()}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {products.map((product) => (
        <button
          key={product.id}
          type="button"
          onClick={() => onProductClick(product.id)}
          className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-left hover:bg-white/5"
        >
          <span className="h-16 w-full shrink-0 rounded" style={{ backgroundColor: product.swatchColor }} />
          <span className="truncate text-[12px] font-medium text-slate-200">{product.name}</span>
          <div className="grid grid-cols-2 gap-1.5">
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <TrendingUp aria-hidden="true" className="h-3 w-3 text-emerald-400" />
              <span className="sr-only">Interest score </span>
              {product.interestScore}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <DollarSign aria-hidden="true" className="h-3 w-3 text-cyan-300" />
              <span className="sr-only">Revenue </span>
              {(product.revenue / 1000).toFixed(1)}K
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <Eye aria-hidden="true" className="h-3 w-3 text-slate-400" />
              <span className="sr-only">Views </span>
              {(product.views / 1000).toFixed(1)}K
            </span>
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <ShoppingCart aria-hidden="true" className="h-3 w-3 text-amber-400" />
              <span className="sr-only">Cart abandons </span>
              {product.cartAbandons}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
