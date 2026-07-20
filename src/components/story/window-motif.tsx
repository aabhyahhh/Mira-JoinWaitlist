"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, useTransform, useMotionValue, type MotionValue } from "framer-motion";

import { useViewport } from "@/lib/use-viewport";
import { LOGO_SCALE } from "@/lib/orbit";

const BASE_SIZE_PX = 80;

/**
 * The one object that carries the whole story: the Mira mark, lit against
 * the dark room. It starts as a single calm point of light, flickers under
 * pressure, ripples while it "speaks," goes still during resolution,
 * multiplies into a skyline for scale, and finally floods with dawn. Every
 * beat reuses this same object so the throughline reads as one thing
 * changing state, not six different illustrations.
 *
 * Its base size is breakpoint-driven (LOGO_SCALE), not just a single
 * Tailwind sm: jump — on mobile the mark should dominate the frame, not
 * shrink proportionally with everything else.
 */
export function Window({
  glow,
  flicker = false,
  speaking = false,
  className,
}: {
  glow: MotionValue<number>;
  flicker?: boolean;
  /** A soft outward ripple, like a voice waveform, while Mira is "talking." */
  speaking?: boolean;
  className?: string;
}) {
  const { tier } = useViewport();
  const sizePx = Math.round(BASE_SIZE_PX * LOGO_SCALE[tier]);
  const flickerMultiplier = useMotionValue(1);

  useEffect(() => {
    if (!flicker) return;
    let cancelled = false;
    (async function loop() {
      while (!cancelled) {
        for (const v of [1, 0.4, 1, 0.6, 1]) {
          if (cancelled) break;
          flickerMultiplier.set(v);
          await new Promise((r) => setTimeout(r, 90));
        }
        await new Promise((r) => setTimeout(r, 1200));
      }
    })();
    return () => {
      cancelled = true;
      flickerMultiplier.set(1);
    };
  }, [flicker, flickerMultiplier]);

  const opacity = useTransform([glow, flickerMultiplier], ([g, f]: number[]) => g * f);
  const boxShadow = useTransform(
    opacity,
    (v) => `0 0 ${36 * v}px ${10 * v}px rgba(230, 178, 110, ${0.45 * v})`
  );

  return (
    <div className="relative flex items-center justify-center">
      {speaking &&
        [0, 1].map((i) => (
          <motion.span
            key={i}
            style={{ height: sizePx, width: sizePx }}
            className="pointer-events-none absolute rounded-full border border-gold-200/40"
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 1 }}
          />
        ))}

      <motion.div
        style={{ opacity, boxShadow, height: sizePx, width: sizePx }}
        // A near-imperceptible idle breathing scale — the mark is never
        // perfectly static, even when nothing else is happening on screen.
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className={`relative flex items-center justify-center rounded-full bg-ink-900 ${className ?? ""}`}
      >
        <Image
          src="/logo.png"
          alt=""
          width={sizePx}
          height={sizePx}
          className="h-full w-full rounded-full object-cover"
        />
      </motion.div>
    </div>
  );
}
