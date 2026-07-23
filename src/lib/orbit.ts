export type { ViewportTier } from "@/lib/use-viewport";
import type { ViewportTier } from "@/lib/use-viewport";

/**
 * Outer orbit radius as a fraction of the smaller viewport dimension, per
 * breakpoint. Tight on mobile (large central focus, minimal clutter),
 * wide on desktop (cinematic spacing) — this is the one number that makes
 * every orbiting element move closer together as the viewport shrinks,
 * instead of every position being independently guessed per breakpoint.
 */
const ORBIT_RADIUS_FRACTION: Record<ViewportTier, number> = {
  desktop: 0.35,
  tablet: 0.28,
  mobile: 0.2,
};

/** Minimum pixels kept clear from every edge, so orbiting elements never touch the safe area. */
const EDGE_PADDING: Record<ViewportTier, number> = {
  desktop: 32,
  tablet: 24,
  mobile: 16,
};

/** Half the logo's on-screen footprint per breakpoint (BASE_SIZE_PX * LOGO_SCALE / 2), kept in sync with window-motif.tsx. */
const LOGO_HALF_SIZE: Record<ViewportTier, number> = {
  desktop: 40,
  tablet: 40,
  mobile: 40,
};

/** Extra clearance beyond the logo's edge before anything is allowed to orbit. */
const LOGO_CLEARANCE = 24;

export interface OrbitPoint {
  /** Angle in degrees, 0 = right, 90 = down (screen coordinates), measured clockwise. */
  angleDeg: number;
  /** 0-1, fraction of this breakpoint's outer orbit radius. 1 = on the outer ring. */
  radiusFraction?: number;
  /** Approximate half-width/half-height of the element being placed, in px — used to keep it inside the safe area. */
  elementHalfSize?: { width: number; height: number };
}

/**
 * Converts a polar coordinate (angle + radius fraction) into a pixel
 * offset from screen center, sized for the current viewport/breakpoint and
 * clamped so the element's bounding box never crosses the safe-area edge
 * NOR the logo itself. This is the one positioning system every orbiting
 * element (floating thoughts, skyline windows) goes through, instead of
 * each scene hand-picking vw/vh coordinates that happen to work at one
 * screen size.
 */
export function orbitPosition(
  point: OrbitPoint,
  viewport: { width: number; height: number; tier: ViewportTier }
): { x: number; y: number } {
  const { angleDeg, radiusFraction = 1, elementHalfSize = { width: 60, height: 24 } } = point;
  const { width, height, tier } = viewport;

  const outerRadius = Math.min(width, height) * ORBIT_RADIUS_FRACTION[tier];
  // Never orbit closer than the logo's own edge plus a fixed clearance —
  // the outer radius fraction sets the "far" end, this sets the "near" end.
  const innerRadius = LOGO_HALF_SIZE[tier] + LOGO_CLEARANCE;
  const radius = Math.max(innerRadius, outerRadius * radiusFraction);

  const rad = (angleDeg * Math.PI) / 180;
  let x = Math.cos(rad) * radius;
  let y = Math.sin(rad) * radius;

  const padding = EDGE_PADDING[tier];
  const maxX = width / 2 - elementHalfSize.width - padding;
  const maxY = height / 2 - elementHalfSize.height - padding;

  x = Math.max(-maxX, Math.min(maxX, x));
  y = Math.max(-maxY, Math.min(maxY, y));

  // Rounded to whole pixels: sub-pixel precision is invisible here, and
  // avoids a React hydration mismatch warning from last-digit floating
  // point differences between the server's and browser's Math.cos/sin.
  return { x: Math.round(x), y: Math.round(y) };
}

/** How many floating-thought elements to show at each breakpoint — fewer on smaller screens, per the "never overwhelmed" rule. */
export const FRAGMENT_COUNT: Record<ViewportTier, number> = {
  desktop: 8,
  tablet: 6,
  mobile: 6,
};

/** Relative logo scale multiplier per breakpoint — kept at 1 everywhere so the mark's proportions stay consistent across devices. */
export const LOGO_SCALE: Record<ViewportTier, number> = {
  desktop: 1,
  tablet: 1,
  mobile: 1,
};
