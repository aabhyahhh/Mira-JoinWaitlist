"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

import { useMorphProgress } from "@/components/story/morph-track";
import { beatRange, crossfadeRange } from "@/components/story/motion";

/**
 * A single full-screen layer in the morph sequence. Fades in/out based on
 * the shared scroll progress crossing its slice of the track, so it visually
 * dissolves against its neighbors rather than popping in/out.
 */
export function Beat({
  index,
  overlap = 0.12,
  holdAtEnd = false,
  children,
  className,
}: {
  index: number;
  overlap?: number;
  /** Skip the exit fade — used by the last beat in the track, which stays visible while the next section dissolves in on top of it. */
  holdAtEnd?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const progress = useMorphProgress();
  const [fadeInStart, fullIn, fullOut, fadeOutEnd] = crossfadeRange(index, overlap);

  const opacity = useTransform(
    progress,
    holdAtEnd ? [fadeInStart, fullIn] : [fadeInStart, fullIn, fullOut, fadeOutEnd],
    holdAtEnd ? [0, 1] : [0, 1, 1, 0]
  );
  // Keep the outgoing layer interactive-free once it's dissolved so it
  // doesn't eat clicks/scroll intent from the incoming layer underneath.
  const pointerEvents = useTransform(progress, (v) =>
    v >= fadeInStart && v <= fadeOutEnd ? "auto" : "none"
  );

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      className={`absolute inset-0 flex h-full w-full items-center justify-center ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/** Convenience hook for beats that need finer-grained transforms of the shared progress. */
export function useBeatProgress(index: number, overlap = 0.12) {
  const progress = useMorphProgress();
  const range = crossfadeRange(index, overlap);
  const [start, end] = beatRange(index);
  return { progress, range, start, end, span: end - start };
}

/**
 * Shared stagger-reveal transform: an item fades/scales/slides in as
 * progress crosses [revealAt, revealAt + revealSpan]. Every beat's
 * notification cards, chat bubbles, pipeline nodes, and property markers
 * use this same shape, so it lives here once instead of being
 * re-implemented per beat.
 */
export function useReveal(
  progress: MotionValue<number>,
  revealAt: number,
  revealSpan: number
) {
  const opacity = useTransform(progress, [revealAt, revealAt + revealSpan], [0, 1]);
  const scale = useTransform(progress, [revealAt, revealAt + revealSpan], [0.85, 1]);
  const y = useTransform(progress, [revealAt, revealAt + revealSpan], [12, 0]);
  return { opacity, scale, y };
}
