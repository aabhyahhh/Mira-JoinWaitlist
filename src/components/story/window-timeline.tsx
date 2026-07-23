"use client";

import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";

import { useMorphProgress } from "@/components/story/morph-track";
import { Window } from "@/components/story/window-motif";

const LINE = "I've shared the property photos and details with you on WhatsApp. Please take a look.";

/**
 * The single persistent Mira mark for the whole pinned track. Every beat
 * used to mount its own <Window>, which meant two instances briefly
 * co-existed on screen during every crossfade — a visible double-logo
 * flicker. This component is the one and only instance, mounted once
 * alongside RoomEnvironment, with its scale/position/glow driven
 * continuously by the shared global progress value so it reads as one
 * object evolving rather than six objects handing off.
 */
export function WindowTimeline() {
  const progress = useMorphProgress();
  const [typedChars, setTypedChars] = useState(0);

  // Drive the typewriter effect off scroll position entering the
  // mira-answers beat's range (2/6-3/6), not a DOM inView ref, since this
  // component isn't nested inside that scene anymore.
  const [isInMiraAnswersRange, setIsInMiraAnswersRange] = useState(false);
  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      const start = 2 / 6;
      const end = 3 / 6;
      setIsInMiraAnswersRange(v >= start - 0.02 && v <= end + 0.02);
    });
    return unsubscribe;
  }, [progress]);

  useEffect(() => {
    if (!isInMiraAnswersRange) {
      setTypedChars(0);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTypedChars(i);
      if (i >= LINE.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [isInMiraAnswersRange]);

  // --- Scale: one continuous curve across the whole track ---
  const scale = useTransform(
    progress,
    [0, 1 / 6, 3 / 6, 3.68 / 6, 5 / 6, 1],
    [1, 1.35, 1, 0.45, 1, 1.6]
  );

  // --- Glow: dips during overwhelm's flicker window, rises for resolution,
  // fades out during the workflow beat (the traveling particle carries the
  // moment there instead), returns for morning, fades out at the very end
  // as the room's own dawn flood takes over.
  const glow = useTransform(
    progress,
    [0, 1 / 6, 1.08 / 6, 2 / 6, 2.2 / 6, 3.72 / 6, 4 / 6, 4.05 / 6, 4.95 / 6, 5 / 6, 5.35 / 6, 1 - 0.14 / 6, 1 - 0.02 / 6],
    [0, 1, 1, 0.35, 0.4, 0.85, 0.85, 0, 0, 0.7, 1, 1, 0]
  );

  // --- Position: static/centered for most beats, shakes during overwhelm ---
  const shakeX = useTransform(
    progress,
    [
      1 / 6 + (1 / 6) * 0.12,
      1 / 6 + (1 / 6) * 0.16,
      1 / 6 + (1 / 6) * 0.2,
      1 / 6 + (1 / 6) * 0.24,
      1 / 6 + (1 / 6) * 0.28,
    ],
    [0, -3, 3, -2, 0]
  );
  const pulse = useTransform(
    progress,
    [
      1 / 6 + (1 / 6) * 0.3,
      1 / 6 + (1 / 6) * 0.34,
      1 / 6 + (1 / 6) * 0.38,
      1 / 6 + (1 / 6) * 0.42,
    ],
    [1, 1.06, 1, 1.06]
  );
  const combinedScale = useTransform([scale, pulse], ([s, p]: number[]) => s * p);

  // --- Flicker only during the overwhelm beat ---
  const [flicker, setFlicker] = useState(false);
  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      setFlicker(v >= 1 / 6 - 0.02 && v <= 2 / 6 + 0.02);
    });
    return unsubscribe;
  }, [progress]);

  const speaking = isInMiraAnswersRange && typedChars < LINE.length;

  // Centered via real `top`/`left` percentages plus a `translate(-50%,-50%)`
  // baked into the same style object as the animated x/scale — NOT a
  // Tailwind -translate-x/y-1/2 class, which Motion's inline `transform`
  // silently overrides once any x/y/scale style is set. This was pushing
  // the logo (and everything positioned relative to it) down-and-right by
  // exactly half its own rendered size on every single scene.
  return (
    <motion.div
      style={{ top: "50%", left: "50%", x: shakeX, y: 0, scale: combinedScale, translateX: "-50%", translateY: "-50%" }}
      className="absolute"
    >
      <Window glow={glow} flicker={flicker} speaking={speaking} />
    </motion.div>
  );
}
