"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * The opening nudge: an animated line plus a bouncing chevron pair, both
 * fading out together as soon as the visitor starts scrolling (driven by
 * the same progress value that pins the whole story, so it reacts to
 * mouse wheel, trackpad, touch, and keyboard scroll alike — no separate
 * event listener needed).
 */
export function ScrollHint({ opacity }: { opacity: MotionValue<number> }) {
  const y = useTransform(opacity, [0, 1], [4, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute bottom-12 flex flex-col items-center gap-3"
    >
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="text-[11px] font-medium uppercase tracking-[0.3em] text-parchment-300/80"
      >
        Scroll to experience a day in an Airbnb host&apos;s life
      </motion.p>
      <div className="flex flex-col items-center gap-1">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, 6, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
          >
            <ChevronDown className="h-4 w-4 text-parchment-300/80" strokeWidth={1.5} />
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
