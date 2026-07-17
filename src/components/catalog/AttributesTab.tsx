// src/components/catalog/AttributesTab.tsx
import type { Product } from "./content";

type AttributesTabProps = { product: Product };

export default function AttributesTab({ product }: AttributesTabProps) {
  return (
    <div className="flex flex-col gap-2">
      {product.attributes.map((attribute) => (
        <div key={attribute.name} className="flex items-center justify-between border-b border-white/5 py-2">
          <span className="text-[12px] text-slate-400">{attribute.name}</span>
          <span className="text-[12px] font-medium text-slate-200">{attribute.value}</span>
        </div>
      ))}
    </div>
  );
}
