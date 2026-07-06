// src/components/opsystem/SkillTranscript.tsx
"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../pulse/usePrefersReducedMotion";
import { revealAnimation } from "../pulse/revealAnimation";
import TerminalFrame from "./TerminalFrame";
import { transcriptTitle, transcriptTurns } from "./content";

export default function SkillTranscript() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <TerminalFrame title={transcriptTitle}>
      <div className="flex flex-col gap-4">
        {transcriptTurns.map((turn, index) =>
          turn.type === "prompt" ? (
            <motion.p
              key={turn.text}
              className="text-emerald-400"
              {...revealAnimation(
                reduceMotion,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0 },
                { duration: 0.3, delay: index * 0.05 }
              )}
            >
              <span className="text-slate-500">❯ </span>
              {turn.text}
            </motion.p>
          ) : (
            <motion.div
              key={turn.lines[0]}
              className="flex flex-col gap-1 pl-4 text-slate-300"
              {...revealAnimation(
                reduceMotion,
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0 },
                { duration: 0.3, delay: index * 0.05 }
              )}
            >
              {turn.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </motion.div>
          )
        )}
      </div>
    </TerminalFrame>
  );
}
