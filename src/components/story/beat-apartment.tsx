"use client";

import { motion, useTransform } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { Window } from "@/components/story/window-motif";
import { ScrollHint } from "@/components/story/scroll-hint";

export function BeatApartment({ index }: { index: number }) {
  const { progress, start, end, span } = useBeatProgress(index);

  // Camera holds on the window, then pushes in slightly as the scene ends.
  const windowScale = useTransform(progress, [start, end], [1, 1.35]);
  const windowGlow = useTransform(progress, [start, start + span * 0.15], [0, 1]);

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

  return (
    <Beat index={index}>
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-10">
        <motion.div style={{ scale: windowScale }}>
          <Window glow={windowGlow} />
        </motion.div>

        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="max-w-md text-balance px-6 text-center text-3xl leading-snug text-parchment-100 sm:text-4xl"
        >
          One window. One business.
        </motion.h2>

        <ScrollHint opacity={hintOpacity} />
      </div>
    </Beat>
  );
}
