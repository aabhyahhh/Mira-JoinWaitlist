"use client";

import { motion, useTransform } from "framer-motion";
import type { ReactNode } from "react";

import { useMorphProgress } from "@/components/story/morph-track";
import { crossfadeRange } from "@/components/story/motion";

/**
 * A single full-screen layer in the morph sequence. Fades in/out based on
 * the shared scroll progress crossing its slice of the track, so it visually
 * dissolves against its neighbors rather than popping in/out.
 */
export function Beat({
  index,
  overlap = 0.35,
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
export function useBeatProgress(index: number, overlap = 0.35) {
  const progress = useMorphProgress();
  const range = crossfadeRange(index, overlap);
  return { progress, range };
}
