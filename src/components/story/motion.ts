export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Number of pinned morph beats inside the sticky track (waitlist follows separately). */
export const BEAT_COUNT = 6;

/**
 * Scroll distance (in viewport-heights) given to each beat. Bumped above
 * 100 so every transition has more physical scroll to resolve over —
 * slower, smoother dissolves instead of feeling rushed.
 */
export const VH_PER_BEAT = 140;

/** Each beat owns an equal slice of the shared scroll-progress track. */
export function beatRange(index: number): [number, number] {
  return [index / BEAT_COUNT, (index + 1) / BEAT_COUNT];
}

/**
 * A beat is visible while progress is inside its own range, plus a short
 * crossfade that bleeds only a little way into the neighboring beat's range
 * so scenes dissolve into each other right at the boundary instead of hard-
 * cutting. Unlike a symmetric bleed around both edges of the *own* range,
 * this keeps the transition confined to a small window centered on the
 * boundary — so a beat spends the vast majority of its range fully opaque
 * and un-transitioning, and the next beat only starts appearing once the
 * previous one is almost entirely scrolled past (not at the halfway point).
 * `overlap` is that window's size, as a fraction of the beat's own span.
 */
export function crossfadeRange(index: number, overlap = 0.12): [number, number, number, number] {
  const [start, end] = beatRange(index);
  const span = end - start;
  const bleed = span * overlap;
  return [
    Math.max(0, start - bleed),
    start + bleed,
    end - bleed,
    Math.min(1, end + bleed),
  ];
}
