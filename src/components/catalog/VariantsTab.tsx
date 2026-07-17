// src/components/catalog/VariantsTab.tsx
import type { Product } from "./content";

type VariantsTabProps = { product: Product };

export default function VariantsTab({ product }: VariantsTabProps) {
  return (
    <div className="flex flex-col gap-3">
      {product.variants.map((variant) => (
        <div key={variant.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="mb-2 text-[12px] font-semibold text-slate-200">{variant.name}</p>
          <div className="flex flex-col gap-1">
            {variant.attributes.map((attribute) => (
              <div key={attribute.name} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{attribute.name}</span>
                <span className="text-slate-300">{attribute.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
