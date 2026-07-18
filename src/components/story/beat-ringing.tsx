"use client";

import { motion, useTransform } from "framer-motion";
import { PhoneCall } from "lucide-react";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { beatRange } from "@/components/story/motion";

export function BeatRinging({ index }: { index: number }) {
  const { progress } = useBeatProgress(index);
  const [start, end] = beatRange(index);
  const mid = start + (end - start) * 0.55;

  const scale = useTransform(progress, [start, mid, end], [1, 1, 0.4]);
  const y = useTransform(progress, [start, mid, end], [0, 0, -260]);
  const radius = useTransform(progress, [mid, end], [999, 28]);
  const labelOpacity = useTransform(progress, [start, start + 0.02, mid], [0, 1, 1]);
  const headlineOpacity = useTransform(progress, [start + 0.03, start + 0.08, mid, end], [0, 1, 1, 0]);
  const headlineY = useTransform(progress, [start + 0.03, start + 0.08], [16, 0]);
  const ringOpacity = useTransform(progress, [start, mid], [1, 0]);

  return (
    <Beat index={index}>
      <div className="relative flex flex-col items-center justify-center gap-10 px-6">
        <motion.p
          style={{ opacity: labelOpacity }}
          className="text-xs font-medium uppercase tracking-[0.3em] text-terracotta-500"
        >
          Incoming Call
        </motion.p>

        <div className="relative flex items-center justify-center">
          <motion.span
            style={{ opacity: ringOpacity }}
            className="absolute h-24 w-24 rounded-full bg-terracotta-200/50 sm:h-28 sm:w-28"
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            style={{ opacity: ringOpacity }}
            className="absolute h-24 w-24 rounded-full bg-terracotta-200/50 sm:h-28 sm:w-28"
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
          />

          <motion.div
            style={{ scale, y, borderRadius: radius }}
            className="relative flex h-24 w-24 items-center justify-center bg-ink-900 text-parchment-50 shadow-lg sm:h-28 sm:w-28"
          >
            <PhoneCall className="h-9 w-9" />
          </motion.div>
        </div>

        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="max-w-lg text-balance text-center text-3xl leading-snug text-ink-900 sm:text-4xl"
        >
          Your guest needs an answer.
        </motion.h2>
      </div>
    </Beat>
  );
}
