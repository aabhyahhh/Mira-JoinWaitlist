"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { Window } from "@/components/story/window-motif";
import { useViewport } from "@/lib/use-viewport";
import { orbitPosition, type ViewportTier } from "@/lib/orbit";

const SKYLINE = [
  { angleDeg: -100, radiusFraction: 0.75, delay: 0.3 },
  { angleDeg: -20, radiusFraction: 0.8, delay: 0.36 },
  { angleDeg: -150, radiusFraction: 0.6, delay: 0.32 },
  { angleDeg: 25, radiusFraction: 0.7, delay: 0.38 },
  { angleDeg: -60, radiusFraction: 0.95, delay: 0.34 },
  { angleDeg: 70, radiusFraction: 0.95, delay: 0.4 },
  { angleDeg: -170, radiusFraction: 0.9, delay: 0.42 },
  { angleDeg: 130, radiusFraction: 0.75, delay: 0.44 },
] as const;

/** Fewer skyline windows on smaller screens — same "quality over quantity" rule as the floating thoughts. */
const SKYLINE_COUNT: Record<ViewportTier, number> = {
  desktop: 8,
  tablet: 6,
  mobile: 4,
};

/**
 * Mobile-only adjustments: with only 4 windows on a narrow screen, the
 * cluster reads better as a spread-out map than a tight huddle — windows
 * shrink so they don't dominate, and their orbit points push further out
 * so the connecting routes actually have room to read as lines instead of
 * short stubs. Desktop/tablet keep the original size and spread.
 */
const SKYLINE_SCALE_RANGE: Record<ViewportTier, [number, number]> = {
  desktop: [0.3, 0.45],
  tablet: [0.3, 0.45],
  mobile: [0.22, 0.32],
};
const SKYLINE_RADIUS_MULTIPLIER: Record<ViewportTier, number> = {
  desktop: 1,
  tablet: 1,
  mobile: 1.45,
};

function SkylineWindow({
  x,
  y,
  delay,
  progress,
  pullbackStart,
  pullbackEnd,
  fadeOutStart,
  fadeOutEnd,
  scaleRange,
}: {
  x: number;
  y: number;
  delay: number;
  progress: MotionValue<number>;
  pullbackStart: number;
  pullbackEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
  scaleRange: [number, number];
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
  const scale = useTransform(progress, [pullbackStart, pullbackEnd], scaleRange);
  const glow = useTransform(progress, [revealAt, revealAt + 0.05], [0, 0.8]);

  return (
    <motion.div style={{ x: posX, y: posY, scale, opacity, position: "absolute" }}>
      <Window glow={glow} className="opacity-90" />
    </motion.div>
  );
}

/**
 * A route line from the hub (center, where the persistent WindowTimeline
 * mark sits) out to each skyline window — reads as a map connecting
 * properties back to one dispatcher, not just a scatter of icons. Traces
 * in (via a dash-offset wipe) slightly after its window has already
 * appeared, so the eye registers "window arrives, then gets connected"
 * rather than the line racing ahead of its destination.
 */
function SkylineRoute({
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
  const revealAt = pullbackStart + (pullbackEnd - pullbackStart) * delay + 0.02;
  const traceProgress = useTransform(progress, [revealAt, revealAt + 0.05], [0, 1], {
    clamp: true,
  });
  const fadeOutOpacity = useTransform(progress, [fadeOutStart, fadeOutEnd], [1, 0]);
  const opacity = useTransform(
    [traceProgress, fadeOutOpacity],
    ([trace, fade]: number[]) => (trace > 0 ? 0.35 : 0) * fade
  );
  const x2 = useTransform(progress, [pullbackStart, pullbackEnd], [0, x]);
  const y2 = useTransform(progress, [pullbackStart, pullbackEnd], [0, y]);
  const pathLength = traceProgress;

  return (
    <motion.line
      x1={0}
      y1={0}
      x2={x2}
      y2={y2}
      style={{ opacity, pathLength }}
      stroke="rgb(230, 178, 110)"
      strokeWidth={1}
      strokeLinecap="round"
    />
  );
}

export function BeatScaling({ index }: { index: number }) {
  const { progress, start, end, span } = useBeatProgress(index);
  const viewport = useViewport();

  const visibleSkyline = SKYLINE.slice(0, SKYLINE_COUNT[viewport.tier]);

  const pullbackStart = start + span * 0.18;
  const pullbackEnd = start + span * 0.5;
  // Held well past when the last window/line settles, so the fully-formed
  // "map" — every window connected back to the hub — has real time to be
  // read before the next beat starts dissolving in on top of it, instead of
  // barely finishing its reveal before fading straight back out.
  const fadeOutStart = end - span * 0.06;
  const fadeOutEnd = end - span * 0.01;

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

        {(() => {
          const radiusMultiplier = SKYLINE_RADIUS_MULTIPLIER[viewport.tier];
          const scaleRange = SKYLINE_SCALE_RANGE[viewport.tier];
          const points = visibleSkyline.map((w) => {
            const p = orbitPosition(
              { angleDeg: w.angleDeg, radiusFraction: w.radiusFraction, elementHalfSize: { width: 40, height: 40 } },
              viewport
            );
            return { x: Math.round(p.x * radiusMultiplier), y: Math.round(p.y * radiusMultiplier) };
          });
          return (
            <>
              <svg
                className="pointer-events-none absolute left-1/2 top-1/2 overflow-visible"
                width="1"
                height="1"
              >
                {visibleSkyline.map((w, i) => (
                  <SkylineRoute
                    key={i}
                    x={points[i].x}
                    y={points[i].y}
                    delay={w.delay}
                    progress={progress}
                    pullbackStart={pullbackStart}
                    pullbackEnd={pullbackEnd}
                    fadeOutStart={fadeOutStart}
                    fadeOutEnd={fadeOutEnd}
                  />
                ))}
              </svg>

              {visibleSkyline.map((w, i) => (
                <SkylineWindow
                  key={i}
                  x={points[i].x}
                  y={points[i].y}
                  delay={w.delay}
                  progress={progress}
                  pullbackStart={pullbackStart}
                  pullbackEnd={pullbackEnd}
                  fadeOutStart={fadeOutStart}
                  fadeOutEnd={fadeOutEnd}
                  scaleRange={scaleRange}
                />
              ))}
            </>
          );
        })()}

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
