// src/components/catalog/ListView.tsx
import { Folder } from "lucide-react";
import type { CategoryNode, Product } from "./content";

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
  if (categories.length > 0) {
    return (
      <div className="flex flex-col">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategorySingleClick(category.id)}
            onDoubleClick={() => onCategoryDoubleClick(category.id)}
            className="flex items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-white/5"
          >
            <Folder aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan-300" />
            <span className="flex-1 truncate text-[13px] text-slate-200">{category.name}</span>
            <span className="text-[11px] text-slate-500">{category.productCount} products</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[1.6fr_0.7fr_0.9fr_0.7fr_0.8fr_0.9fr] gap-2 border-b border-white/10 px-2 pb-2 text-[10px] uppercase tracking-wide text-slate-500">
        <span>Product</span>
        <span className="text-right">Interest</span>
        <span className="text-right">Revenue</span>
        <span className="text-right">Sales</span>
        <span className="text-right">Views</span>
        <span className="text-right">Cart Abandons</span>
      </div>
      {products.map((product) => (
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
