"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { useViewport } from "@/lib/use-viewport";
import { orbitPosition, FRAGMENT_COUNT, LOGO_SCALE } from "@/lib/orbit";

// A host's day, building gradually from routine to overwhelming — not
// dumped all at once, so it reads as relatable rather than chaotic.
// Ordered by priority: mobile shows the first FRAGMENT_COUNT.mobile lines,
// tablet the first .tablet, desktop all of them.
const FRAGMENTS = [
  "Guest calling.",
  "Cleaning crew running late.",
  "What time is check-in?",
  "Another booking inquiry.",
  "Housekeeping needs the code.",
  "Can we get late checkout?",
  "Payment question.",
  "Guest can't find the property.",
] as const;

/**
 * Fixed row/side slots rather than continuous angle math: each fragment
 * gets one of 4 rows on either the left or right side of the logo, with
 * a fixed pixel row height (below) sized to clear a two-line-wrapped
 * fragment — guaranteeing vertical separation by construction instead of
 * relying on angle math that then needs clamping into a safe zone.
 */
const SLOTS = [
  { side: "right", row: -2 },
  { side: "left", row: -1 },
  { side: "right", row: -1 },
  { side: "left", row: 0 },
  { side: "right", row: 1 },
  { side: "left", row: -2 },
  { side: "right", row: 2 },
  { side: "left", row: 1 },
] as const;

function Fragment({
  text,
  x,
  y,
  side,
  maxWidth,
  progress,
  revealAt,
  revealSpan,
}: {
  text: string;
  x: number;
  y: number;
  side: "left" | "right";
  maxWidth: number;
  progress: MotionValue<number>;
  revealAt: number;
  revealSpan: number;
}) {
  const opacity = useTransform(
    progress,
    [revealAt, revealAt + revealSpan * 0.25, revealAt + revealSpan],
    [0, 1, 0.35]
  );
  // Drifts inward from slightly outside its resting position rather than
  // sweeping through the center, so nothing crosses behind the logo.
  const driftIn = useTransform(progress, [revealAt, revealAt + revealSpan * 0.3], [1.15, 1]);
  const xPx = useTransform(driftIn, (v) => x * v);
  const yPx = useTransform(driftIn, (v) => y * v);

  // Anchored to true center via a real `top` and a real `left` OR `right`
  // (never both) — never a transform-based -translate-1/2, because Motion
  // fully owns the `transform` property once any x/y style is set, which
  // silently drops any -translate-x/y Tailwind class. Using `right: 50%`
  // for left-side items instead makes the box grow away from center
  // (left-ward) without needing a transform at all, so its bounding box
  // — not just its anchor point — actually clears the logo and the
  // viewport edge.
  return (
    <motion.span
      style={{
        opacity,
        top: "50%",
        [side === "left" ? "right" : "left"]: "50%",
        x: xPx,
        y: yPx,
        translateY: "-50%",
        maxWidth,
      }}
      className={`absolute text-xs font-medium leading-snug text-parchment-200 sm:text-sm lg:text-base ${
        side === "left" ? "text-right" : "text-left"
      }`}
    >
      {text}
    </motion.span>
  );
}

export function BeatOverwhelm({ index }: { index: number }) {
  const { progress, start, span } = useBeatProgress(index);
  const viewport = useViewport();

  const count = FRAGMENT_COUNT[viewport.tier];
  const visibleFragments = FRAGMENTS.slice(0, count);

  // The line appears once the fragments have made their point and holds
  // for a long, uncontested stretch — well past where the fragments
  // themselves have settled — so it has time to actually be read before
  // the next scene's crossfade begins.
  const headlineOpacity = useTransform(
    progress,
    [start + span * 0.42, start + span * 0.5, start + span * 0.94, start + span * 1],
    [0, 1, 1, 0]
  );
  // Tethered to the logo, not the viewport: ~14% of viewport height below
  // center, where the logo sits — so it always reads as "the logo's line,"
  // never as a caption pinned to the bottom of the screen.
  const headlineTopPx = viewport.height / 2 + viewport.height * 0.14;
  const headlineY = useTransform(progress, [start + span * 0.42, start + span * 0.5], [10, 0]);

  // Fixed pixel row height, sized to clear the TALLEST fragment's
  // rendered block at this breakpoint, not an average — measured
  // empirically. On the narrowest mobile widths, the longest fragment
  // ("Cleaning crew running late.") can wrap to 3 lines (~66px) once the
  // available width is squeezed by the logo-clearance floor, so mobile's
  // row height needs real margin over that, not just over a typical
  // 2-line block. A fractional/viewport-relative gap isn't reliable here
  // since text height doesn't scale with viewport the way spacing does.
  const rowHeightPx = viewport.tier === "desktop" ? 60 : viewport.tier === "tablet" ? 54 : 74;
  // Horizontal offset scales with the orbit's outer radius, so it still
  // shrinks toward a "tight orbit" on mobile per the responsive system.
  const { x: baseX } = orbitPosition(
    { angleDeg: 0, radiusFraction: 1, elementHalfSize: { width: 56, height: 24 } },
    viewport
  );
  // On short viewports (landscape phone), the outer orbit radius can be
  // small enough that a near-center row still overlaps the logo's own
  // footprint diagonally, even though baseX alone clears it horizontally.
  // Push each point's x further out, keeping the same row/y, until its
  // distance from center clears the logo — same idea as orbitPosition's
  // inner-radius floor, applied to this scene's row-based x/y instead of
  // pure polar coordinates.
  const logoRadius = 40 * LOGO_SCALE[viewport.tier] + 24;
  // Cap each fragment's box to whatever room is actually left between its
  // anchor point and the viewport edge — a fixed max-width class can't
  // know how much space `x` already used up, so on narrow viewports it
  // could (and did) overflow past the screen edge.
  const edgePadding = 28;
  const idealMaxWidth = viewport.tier === "desktop" ? 176 : viewport.tier === "tablet" ? 176 : 120;

  return (
    <Beat index={index} overlap={0.08}>
      <div className="relative flex h-full w-full items-center justify-center">
        {visibleFragments.map((text, i) => {
          const slot = SLOTS[i];
          const y = slot.row * rowHeightPx;
          const minX = Math.sqrt(Math.max(0, logoRadius * logoRadius - y * y));
          const absX = Math.round(Math.max(baseX, minX));
          const x = slot.side === "right" ? absX : -absX;
          // Floor(), not round(), for the available-width math: rounding
          // up here is what let a handful of specific widths clip by a
          // single pixel — erring narrow is invisible, erring wide isn't.
          const availableWidth = Math.floor(viewport.width / 2 - absX - edgePadding);
          const maxWidth = Math.max(60, Math.min(idealMaxWidth, availableWidth));
          return (
            <Fragment
              key={text}
              text={text}
              x={x}
              y={y}
              side={slot.side}
              maxWidth={maxWidth}
              progress={progress}
              revealAt={start + span * (0.04 + i * 0.05)}
              revealSpan={span * 0.35}
            />
          );
        })}

        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY, top: headlineTopPx, translateY: "-50%" }}
          className="absolute max-w-xs text-balance px-6 text-center text-xl leading-snug text-parchment-100 sm:text-2xl lg:max-w-sm lg:text-3xl"
        >
          Every guest needs you. Every hour.
        </motion.h2>
      </div>
    </Beat>
  );
}
