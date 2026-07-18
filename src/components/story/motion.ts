export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Number of pinned morph beats inside the sticky track (waitlist follows separately). */
export const BEAT_COUNT = 6;

/** Each beat owns an equal slice of the shared scroll-progress track. */
export function beatRange(index: number): [number, number] {
  return [index / BEAT_COUNT, (index + 1) / BEAT_COUNT];
}

/**
 * A beat is visible while progress is inside its own range, plus a small
 * crossfade overlap into the neighboring beats so scenes dissolve into each
 * other instead of hard-cutting.
 */
export function crossfadeRange(index: number, overlap = 0.35): [number, number, number, number] {
  const [start, end] = beatRange(index);
  const span = end - start;
  const bleed = span * overlap;
  return [
    Math.max(0, start - bleed),
    start,
    end,
    Math.min(1, end + bleed),
  ];
}
