"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Sits in normal document flow immediately after the pinned MorphTrack. Its
 * own tall + sticky wrapper (same mechanism as MorphTrack) guarantees enough
 * scroll runway for the dissolve to fully resolve before the page runs out
 * of height — a plain min-h-screen section wasn't tall enough once the
 * waitlist card itself is short, which left the reveal stuck mid-blur at
 * the bottom of the document.
 */
export function WaitlistReveal({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const clipInset = useTransform(scrollYProgress, [0, 0.7], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.92, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.7], [10, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const clipPath = useTransform(clipInset, (v) => `inset(${v}% round 32px)`);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <div ref={trackRef} className="relative" style={{ height: "180vh" }}>
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-6">
        <motion.div style={{ clipPath, scale, filter, opacity }} className="w-full max-w-md">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
