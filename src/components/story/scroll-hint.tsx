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
      className="pointer-events-none absolute bottom-10 flex w-full flex-col items-center gap-3 px-6 sm:bottom-12"
    >
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="max-w-[16rem] text-balance text-center text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-parchment-300/80 sm:max-w-none sm:text-[11px] sm:tracking-[0.3em]"
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
