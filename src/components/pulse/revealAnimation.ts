import type { Transition } from "framer-motion";

type MotionTarget = Record<string, number | string>;

type RevealProps = {
  initial?: MotionTarget;
  animate?: MotionTarget;
  whileInView?: MotionTarget;
  viewport?: { once: boolean; margin?: string };
  transition?: Transition;
};

export function revealAnimation(
  reduceMotion: boolean,
  from: MotionTarget,
  to: MotionTarget,
  transition: Transition = { duration: 0.8, ease: "easeOut" }
): RevealProps {
  if (reduceMotion) {
    return { animate: to };
  }

  return {
    initial: from,
    whileInView: to,
    viewport: { once: true, margin: "-60px" },
    transition,
  };
}
