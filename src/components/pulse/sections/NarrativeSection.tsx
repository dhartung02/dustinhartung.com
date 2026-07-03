// src/components/pulse/sections/NarrativeSection.tsx
"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import PhoneFrame from "../PhoneFrame";
import { usePrefersReducedMotion } from "../usePrefersReducedMotion";
import { revealAnimation } from "../revealAnimation";

type NarrativeSectionProps = {
  eyebrow: string;
  title: string;
  bullets: string[];
  phoneLabel: string;
  reverse?: boolean;
  children: ReactNode;
};

export default function NarrativeSection({
  eyebrow,
  title,
  bullets,
  phoneLabel,
  reverse = false,
  children,
}: NarrativeSectionProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          className={reverse ? "lg:order-2" : undefined}
          {...revealAnimation(reduceMotion, { opacity: 0, x: reverse ? 16 : -16 }, { opacity: 1, x: 0 })}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">{eyebrow}</p>
          <h2 className="mb-5 text-3xl font-semibold md:text-4xl">{title}</h2>
          <ul className="flex flex-col gap-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 leading-7 text-slate-300">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className={reverse ? "lg:order-1" : undefined}
          {...revealAnimation(reduceMotion, { opacity: 0, x: reverse ? -16 : 16 }, { opacity: 1, x: 0 })}
        >
          <PhoneFrame label={phoneLabel}>{children}</PhoneFrame>
        </motion.div>
      </div>
    </section>
  );
}
