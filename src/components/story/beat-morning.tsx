"use client";

import { motion, useTransform } from "framer-motion";
import { Coffee } from "lucide-react";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { beatRange } from "@/components/story/motion";

export function BeatMorning({ index }: { index: number }) {
  const { progress } = useBeatProgress(index);
  const [start, end] = beatRange(index);
  const span = end - start;

  const glowOpacity = useTransform(progress, [start, start + span * 0.3], [0, 1]);
  const cupOpacity = useTransform(progress, [start, start + span * 0.2], [0, 1]);
  const cupScale = useTransform(progress, [start, start + span * 0.2], [0.85, 1]);
  const pillOpacity = useTransform(progress, [start + span * 0.35, start + span * 0.45], [0, 1]);
  const pillY = useTransform(progress, [start + span * 0.35, start + span * 0.45], [10, 0]);
  const headlineOpacity = useTransform(progress, [start + span * 0.5, start + span * 0.6], [0, 1]);
  const headlineY = useTransform(progress, [start + span * 0.5, start + span * 0.6], [12, 0]);

  return (
    <Beat index={index} holdAtEnd>
      <div className="relative flex flex-col items-center justify-center px-6">
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-200/40 blur-3xl"
        />
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute -right-16 bottom-16 h-64 w-64 rounded-full bg-terracotta-100/50 blur-3xl"
        />

        <motion.div
          style={{ opacity: cupOpacity, scale: cupScale }}
          className="relative flex h-28 w-28 items-center justify-center rounded-full bg-card shadow-lg sm:h-32 sm:w-32"
        >
          <Coffee className="h-11 w-11 text-gold-500" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          style={{ opacity: pillOpacity, y: pillY }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm text-ink-600 shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta-400" />
          Mira handled everything.
        </motion.div>

        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="mt-10 max-w-md text-balance text-center text-3xl leading-snug text-ink-900 sm:text-4xl"
        >
          You got your time back.
        </motion.h2>
      </div>
    </Beat>
  );
}
