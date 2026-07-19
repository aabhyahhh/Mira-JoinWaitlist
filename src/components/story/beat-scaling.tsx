"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { Window } from "@/components/story/window-motif";

const SKYLINE = [
  { x: -38, y: -8, delay: 0.3 },
  { x: -24, y: 10, delay: 0.36 },
  { x: -12, y: -14, delay: 0.32 },
  { x: 14, y: 12, delay: 0.38 },
  { x: 26, y: -10, delay: 0.34 },
  { x: 38, y: 6, delay: 0.4 },
  { x: -32, y: 22, delay: 0.42 },
  { x: 20, y: 24, delay: 0.44 },
] as const;

function SkylineWindow({
  x,
  y,
  delay,
  progress,
  pullbackStart,
  pullbackEnd,
  fadeOutStart,
  fadeOutEnd,
}: {
  x: number;
  y: number;
  delay: number;
  progress: MotionValue<number>;
  pullbackStart: number;
  pullbackEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
}) {
  const revealAt = pullbackStart + (pullbackEnd - pullbackStart) * delay;
  const revealOpacity = useTransform(progress, [revealAt, revealAt + 0.03], [0, 1]);
  const fadeOutOpacity = useTransform(progress, [fadeOutStart, fadeOutEnd], [1, 0]);
  const opacity = useTransform(
    [revealOpacity, fadeOutOpacity],
    ([reveal, fade]: number[]) => reveal * fade
  );
  const posX = useTransform(progress, [pullbackStart, pullbackEnd], [0, x]);
  const posY = useTransform(progress, [pullbackStart, pullbackEnd], [0, y]);
  const x_ = useTransform(posX, (v) => `${v}vw`);
  const y_ = useTransform(posY, (v) => `${v}vh`);
  const scale = useTransform(progress, [pullbackStart, pullbackEnd], [0.3, 0.45]);
  const glow = useTransform(progress, [revealAt, revealAt + 0.05], [0, 0.8]);

  return (
    <motion.div style={{ x: x_, y: y_, scale, opacity, position: "absolute" }}>
      <Window glow={glow} className="opacity-90" />
    </motion.div>
  );
}

export function BeatScaling({ index }: { index: number }) {
  const { progress, start, end, span } = useBeatProgress(index);

  const pullbackStart = start + span * 0.22;
  const pullbackEnd = start + span * 0.68;
  const fadeOutStart = end - span * 0.16;
  const fadeOutEnd = end - span * 0.04;

  const heroScale = useTransform(progress, [pullbackStart, pullbackEnd], [1, 0.45]);
  const heroGlowBase = useTransform(progress, [start, end], [1, 0.85]);
  const heroFadeOut = useTransform(progress, [fadeOutStart, fadeOutEnd], [1, 0]);
  const heroGlow = useTransform(
    [heroGlowBase, heroFadeOut],
    ([base, fade]: number[]) => base * fade
  );

  const headlineOpacity = useTransform(
    progress,
    [start + span * 0.02, start + span * 0.14, start + span * 0.22, start + span * 0.3],
    [0, 1, 1, 0]
  );
  const captionOpacity = useTransform(
    progress,
    [pullbackEnd, pullbackEnd + span * 0.14, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );

  return (
    <Beat index={index}>
      <div className="relative flex h-full w-full items-center justify-center">
        <motion.h2
          style={{ opacity: headlineOpacity }}
          className="absolute top-[24%] max-w-sm px-6 text-balance text-center text-2xl leading-snug text-parchment-100 sm:text-3xl"
        >
          It was never just one window.
        </motion.h2>

        {SKYLINE.map((w, i) => (
          <SkylineWindow
            key={i}
            {...w}
            progress={progress}
            pullbackStart={pullbackStart}
            pullbackEnd={pullbackEnd}
            fadeOutStart={fadeOutStart}
            fadeOutEnd={fadeOutEnd}
          />
        ))}

        <motion.div style={{ scale: heroScale, opacity: heroFadeOut }} className="relative z-10">
          <Window glow={heroGlow} />
        </motion.div>

        <motion.p
          style={{ opacity: captionOpacity }}
          className="absolute bottom-[20%] text-sm font-medium text-parchment-300"
        >
          One Mira. Every property.
        </motion.p>
      </div>
    </Beat>
  );
}
