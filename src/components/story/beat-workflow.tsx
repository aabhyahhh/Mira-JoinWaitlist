"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";

const WAYPOINTS = [
  { label: "Guest", x: -36, y: 10 },
  { label: "Call", x: -18, y: -14 },
  { label: "Mira", x: 0, y: 12 },
  { label: "WhatsApp", x: 18, y: -14 },
  { label: "Host", x: 36, y: 10 },
] as const;

function pathAt(t: number): { x: number; y: number } {
  const segments = WAYPOINTS.length - 1;
  const pos = t * segments;
  const i = Math.min(Math.floor(pos), segments - 1);
  const localT = pos - i;
  const a = WAYPOINTS[i];
  const b = WAYPOINTS[i + 1];
  return {
    x: a.x + (b.x - a.x) * localT,
    // Slight arc: the particle rises between waypoints instead of moving in a straight line.
    y: a.y + (b.y - a.y) * localT - Math.sin(localT * Math.PI) * 6,
  };
}

function WaypointLabel({
  label,
  x,
  y,
  progress,
  litAt,
}: {
  label: string;
  x: number;
  y: number;
  progress: MotionValue<number>;
  litAt: number;
}) {
  const opacity = useTransform(progress, [litAt - 0.03, litAt], [0.35, 1]);
  const dotOpacity = useTransform(progress, [litAt - 0.03, litAt], [0.3, 1]);
  const dotScale = useTransform(progress, [litAt - 0.03, litAt, litAt + 0.03], [1, 1.6, 1]);

  return (
    <div className="absolute flex flex-col items-center gap-2" style={{ left: `${50 + x}%`, top: `${50 + y}%` }}>
      <motion.span style={{ opacity: dotOpacity, scale: dotScale }} className="h-2 w-2 rounded-full bg-gold-300" />
      <motion.span style={{ opacity }} className="text-xs font-medium text-parchment-200 sm:text-sm">
        {label}
      </motion.span>
    </div>
  );
}

export function BeatWorkflow({ index }: { index: number }) {
  const { progress, start, span } = useBeatProgress(index);

  const travelStart = start + span * 0.12;
  const travelEnd = start + span * 0.78;
  const fadeOutStart = start + span * 0.84;
  const fadeOutEnd = start + span * 0.95;

  const headlineOpacity = useTransform(
    progress,
    [start, start + span * 0.08, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  const sceneFadeOut = useTransform(progress, [fadeOutStart, fadeOutEnd], [1, 0]);

  const particleT = useTransform(progress, [travelStart, travelEnd], [0, 1], { clamp: true });
  const particlePos = useTransform(particleT, (t) => pathAt(t));
  const particleX = useTransform(particlePos, (p) => `${50 + p.x}%`);
  const particleY = useTransform(particlePos, (p) => `${50 + p.y}%`);

  return (
    <Beat index={index}>
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-16">
        <motion.h2
          style={{ opacity: headlineOpacity }}
          className="max-w-xs text-balance px-6 text-center text-2xl leading-snug text-parchment-100 sm:max-w-none sm:text-3xl"
        >
          More hosting. Less firefighting.
        </motion.h2>

        <motion.div style={{ opacity: sceneFadeOut }} className="relative h-40 w-full max-w-lg">
          {WAYPOINTS.map((w, i) => (
            <WaypointLabel
              key={w.label}
              label={w.label}
              x={w.x}
              y={w.y}
              progress={progress}
              litAt={travelStart + ((travelEnd - travelStart) * i) / (WAYPOINTS.length - 1)}
            />
          ))}

          <motion.div
            style={{ left: particleX, top: particleY }}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-200 shadow-[0_0_16px_6px_rgba(230,178,110,0.6)]"
          />
        </motion.div>
      </div>
    </Beat>
  );
}
