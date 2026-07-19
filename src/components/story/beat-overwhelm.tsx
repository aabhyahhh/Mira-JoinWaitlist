"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { Window } from "@/components/story/window-motif";

// A host's day, building gradually from routine to overwhelming — not
// dumped all at once, so it reads as relatable rather than chaotic.
const FRAGMENTS = [
  { text: "Cleaning crew running late.", x: -32, y: -22 },
  { text: "Guest calling.", x: 30, y: -24 },
  { text: "What time is check-in?", x: -34, y: 12 },
  { text: "Housekeeping needs the code.", x: 32, y: 10 },
  { text: "Can we get late checkout?", x: -22, y: -32 },
  { text: "Payment question.", x: 24, y: 26 },
  { text: "Guest can't find the property.", x: -30, y: 28 },
  { text: "Another booking inquiry.", x: 0, y: -34 },
] as const;

function Fragment({
  text,
  x,
  y,
  progress,
  revealAt,
  revealSpan,
}: {
  text: string;
  x: number;
  y: number;
  progress: MotionValue<number>;
  revealAt: number;
  revealSpan: number;
}) {
  const opacity = useTransform(
    progress,
    [revealAt, revealAt + revealSpan * 0.25, revealAt + revealSpan],
    [0, 1, 0.35]
  );
  // Drifts in from its own edge position rather than sweeping through the
  // center, so nothing crosses behind the logo.
  const posX = useTransform(progress, [revealAt, revealAt + revealSpan * 0.3], [x * 1.15, x]);

  return (
    <motion.span
      style={{ opacity, x: useTransform(posX, (v) => `${v}vw`), y: `${y}vh` }}
      className="absolute max-w-[11rem] text-sm font-medium leading-snug text-parchment-200 sm:max-w-none sm:text-base"
    >
      {text}
    </motion.span>
  );
}

export function BeatOverwhelm({ index }: { index: number }) {
  const { progress, start, span } = useBeatProgress(index);

  const windowGlow = useTransform(
    progress,
    [start, start + span * 0.08, start + span * 0.62, start + span * 0.72],
    [1, 1, 1, 0.35]
  );
  const windowShake = useTransform(
    progress,
    [start + span * 0.12, start + span * 0.16, start + span * 0.2, start + span * 0.24, start + span * 0.28],
    [0, -3, 3, -2, 0]
  );
  // The phone vibrates faster and shorter as the day piles up, echoing
  // "phone keeps vibrating" without a literal phone illustration.
  const windowPulse = useTransform(
    progress,
    [start + span * 0.3, start + span * 0.34, start + span * 0.38, start + span * 0.42],
    [1, 1.06, 1, 1.06]
  );

  // The line gets a dedicated, uncontested window: it appears once the
  // fragments have made their point and holds well clear of the crossfade
  // zone (which begins around local progress 0.65 with the default overlap).
  const headlineOpacity = useTransform(
    progress,
    [start + span * 0.45, start + span * 0.52, start + span * 0.62],
    [0, 1, 1]
  );
  const headlineY = useTransform(progress, [start + span * 0.45, start + span * 0.52], [10, 0]);

  return (
    <Beat index={index}>
      <div className="relative flex h-full w-full items-center justify-center">
        {FRAGMENTS.map((f, i) => (
          <Fragment
            key={f.text}
            text={f.text}
            x={f.x}
            y={f.y}
            progress={progress}
            revealAt={start + span * (0.04 + i * 0.05)}
            revealSpan={span * 0.35}
          />
        ))}

        <motion.div style={{ x: windowShake, scale: windowPulse }}>
          <Window glow={windowGlow} flicker />
        </motion.div>

        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="absolute bottom-[18%] max-w-xs px-6 text-balance text-center text-2xl leading-snug text-parchment-100 sm:text-3xl"
        >
          Every guest needs you. Every hour.
        </motion.h2>
      </div>
    </Beat>
  );
}
