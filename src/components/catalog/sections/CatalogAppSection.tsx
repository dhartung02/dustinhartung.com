// src/components/catalog/sections/CatalogAppSection.tsx
"use client";

import { motion } from "framer-motion";
import ProductCatalogApp from "../ProductCatalogApp";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";

export default function CatalogAppSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        className="mb-10 text-center"
        {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Try It</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Browse a category. Open a product.</h2>
        <p className="mx-auto max-w-2xl leading-7 text-slate-300">
          Click through the category tree on the left, switch between list and grid view, or click any product to
          open its analytics panel — everything below is a working, original recreation of the interaction model,
          running on synthetic data.
        </p>
      </motion.div>

      <motion.div {...revealAnimation(reduceMotion, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1 })}>
        <ProductCatalogApp />
      </motion.div>
    </section>
  );
}
