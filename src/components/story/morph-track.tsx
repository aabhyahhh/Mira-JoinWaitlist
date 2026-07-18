"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { useScroll, type MotionValue } from "framer-motion";

import { BEAT_COUNT } from "@/components/story/motion";

const ProgressContext = createContext<MotionValue<number> | null>(null);

export function useMorphProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useMorphProgress must be used inside <MorphTrack>");
  return ctx;
}

/**
 * One tall scroll track (BEAT_COUNT viewport-heights) with a pinned 100vh
 * stage. scrollYProgress (0-1) maps linearly across the whole track and is
 * shared with every beat via context, so beats can crossfade against a
 * single source of truth instead of each running its own observer.
 */
export function MorphTrack({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={trackRef} style={{ height: `${BEAT_COUNT * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ProgressContext.Provider value={scrollYProgress}>{children}</ProgressContext.Provider>
      </div>
    </div>
  );
}
