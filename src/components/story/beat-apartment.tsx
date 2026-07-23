"use client";

import { motion, useTransform } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { ScrollHint } from "@/components/story/scroll-hint";
import { useViewport } from "@/lib/use-viewport";

export function BeatApartment({ index }: { index: number }) {
  const { progress, start, span } = useBeatProgress(index);
  const viewport = useViewport();

  const headlineOpacity = useTransform(
    progress,
    [start + span * 0.1, start + span * 0.22, start + span * 0.55, start + span * 0.72],
    [0, 1, 1, 0]
  );
  const headlineY = useTransform(progress, [start + span * 0.1, start + span * 0.22], [10, 0]);
  // Visible immediately on load, gone as soon as the visitor scrolls at
  // all — the hint's job is to prove this is interactive, not to linger.
  const hintOpacity = useTransform(
    progress,
    [start, start + span * 0.02, start + span * 0.07],
    [1, 1, 0]
  );

  // Tethered close to the logo (which sits at true 50%), not floated
  // toward the bottom of the screen — the very first frame a visitor
  // sees needs its one focal point centered, not bottom-heavy. Same
  // ~14% pattern used everywhere else the headline follows the logo.
  const headlineTopPx = viewport.height / 2 + viewport.height * 0.14;

  return (
    <Beat index={index}>
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY, top: headlineTopPx, translateY: "-50%" }}
          className="absolute max-w-md text-balance px-6 text-center text-3xl leading-snug text-parchment-100 sm:text-4xl"
        >
          Your business deserves better than a missed call...
        </motion.h2>

        <ScrollHint opacity={hintOpacity} />
      </div>
    </Beat>
  );
}
