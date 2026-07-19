"use client";

import { motion, useTransform } from "framer-motion";

import { useMorphProgress } from "@/components/story/morph-track";

/**
 * The persistent world underneath every beat. Instead of each scene owning
 * its own background, one room exists for the entire pinned track and
 * continuously reacts to global scroll progress: it darkens through the
 * overwhelm beat, holds still and warm through the resolution, then floods
 * with morning light at the end. Three parallax planes at different depths
 * give scroll a sense of moving a camera through a space, not swapping
 * flat cards.
 */
export function RoomEnvironment() {
  const progress = useMorphProgress();

  // Ambient tone arcs across the whole journey: calm -> tense -> resolved -> radiant.
  const roomBrightness = useTransform(
    progress,
    [0, 0.14, 0.28, 0.4, 0.66, 0.82, 1],
    [0.55, 0.3, 0.22, 0.5, 0.55, 0.7, 1]
  );
  const vignetteOpacity = useTransform(
    progress,
    [0, 0.14, 0.28, 0.4, 0.82, 1],
    [0.15, 0.55, 0.6, 0.2, 0.15, 0]
  );

  // Parallax depth: far wall drifts slowest, mid layer faster, near grain fastest.
  const farY = useTransform(progress, [0, 1], [0, -60]);
  const midY = useTransform(progress, [0, 1], [0, -140]);
  const nearY = useTransform(progress, [0, 1], [0, -220]);
  const roomScale = useTransform(progress, [0, 0.28, 1], [1, 1.15, 1.04]);

  // Dawn flood: the room's base fill genuinely turns light by the end of
  // the morning beat (last 1/6 of progress), not just an overlay glow —
  // otherwise dark-on-dark text becomes illegible at the resolution.
  const dawnOpacity = useTransform(progress, [0.86, 0.98], [0, 1]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-900">
      <motion.div style={{ scale: roomScale }} className="absolute inset-0">
        {/* Far plane: soft wall gradient */}
        <motion.div
          style={{ y: farY, opacity: roomBrightness }}
          className="absolute inset-[-10%] bg-[radial-gradient(circle_at_50%_30%,theme(colors.gold.600/0.35),transparent_60%)]"
        />
        {/* Mid plane: warm room glow, breathing */}
        <motion.div style={{ y: midY }} className="absolute inset-0">
          <motion.div
            animate={{ opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ opacity: roomBrightness }}
            className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta-800/40 blur-3xl"
          />
        </motion.div>
        {/* Near plane: subtle floor glow for depth */}
        <motion.div
          style={{ y: nearY, opacity: roomBrightness }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-800/60 to-transparent"
        />
      </motion.div>

      {/* Vignette: tightens during overwhelm, opens up on resolution */}
      <motion.div
        style={{ opacity: vignetteOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_35%,theme(colors.ink.900)_100%)]"
      />

      {/* Dawn: the room itself turns to warm daylight for the final beat */}
      <motion.div
        style={{ opacity: dawnOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,theme(colors.parchment.100),theme(colors.gold.100)_60%,theme(colors.parchment.200)_100%)]"
      />
    </div>
  );
}
