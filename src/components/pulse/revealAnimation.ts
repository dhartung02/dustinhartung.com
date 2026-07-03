import type { Transition } from "framer-motion";

type MotionTarget = Partial<Record<
  "opacity" | "x" | "y" | "scale" | "scaleX" | "scaleY" | "strokeDashoffset",
  number
>>;

type RevealProps = {
  initial?: MotionTarget;
  animate?: MotionTarget;
  whileInView?: MotionTarget;
  viewport?: { once: boolean; margin?: string };
  transition?: Transition;
};

/**
 * When `reduceMotion` is true, returns the final state immediately with no
 * transition (skips `initial`/`whileInView`/`viewport`). Callers should only
 * pass transform/opacity-family properties — see `MotionTarget` above.
 */
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
    // Negative viewport margin delays the reveal trigger until the element is
    // 60px inside the viewport, rather than firing right at the edge.
    viewport: { once: true, margin: "-60px" },
    transition,
  };
}
