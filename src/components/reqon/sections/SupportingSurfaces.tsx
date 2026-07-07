// src/components/reqon/sections/SupportingSurfaces.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ChromeExtensionIllustration from "../ChromeExtensionIllustration";
import { usePrefersReducedMotion } from "../../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../../pulse/revealAnimation";

export default function SupportingSurfaces() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <motion.div className="mb-10" {...revealAnimation(reduceMotion, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })}>
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Companion Surfaces</p>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">The same board, wherever you need it</h2>
        <p className="max-w-2xl leading-7 text-slate-300">
          The Chrome extension captures postings and scores them inline while you browse. The mobile companion
          keeps the same pipeline available for a quick review, synced to the same self-hosted board.
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <motion.div
          className="flex flex-col items-center gap-3"
          {...revealAnimation(reduceMotion, { opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
        >
          <ChromeExtensionIllustration />
          <p className="text-[13px] text-slate-500">Reqon Clip — Chrome extension (recreated, synthetic data)</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-3"
          {...revealAnimation(reduceMotion, { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { delay: 0.1 })}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
            <Image
              src="/reqon/mobile-companion.png"
              alt="Reqon mobile companion app showing today's pipeline summary"
              width={1320}
              height={2868}
              className="h-auto w-full max-w-[280px]"
            />
          </div>
          <p className="text-[13px] text-slate-500">iOS/iPadOS companion app (real screenshot)</p>
        </motion.div>
      </div>
    </section>
  );
}
