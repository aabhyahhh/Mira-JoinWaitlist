"use client";

import { motion, useTransform } from "framer-motion";
import { PhoneCall } from "lucide-react";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { beatRange } from "@/components/story/motion";

const BARS = [10, 22, 14, 30, 18, 26, 12, 20, 16, 24, 11, 19];

export function BeatCallInterface({ index }: { index: number }) {
  const { progress } = useBeatProgress(index);
  const [start, end] = beatRange(index);
  const growEnd = start + (end - start) * 0.35;

  const cardScale = useTransform(progress, [start, growEnd], [0.4, 1]);
  const cardY = useTransform(progress, [start, growEnd], [-260, 0]);
  const cardRadius = useTransform(progress, [start, growEnd], [28, 24]);
  const contentOpacity = useTransform(progress, [start, growEnd, end - 0.02], [0, 1, 1]);

  return (
    <Beat index={index}>
      <motion.div
        style={{ scale: cardScale, y: cardY, borderRadius: cardRadius }}
        className="flex w-full max-w-sm flex-col items-center gap-6 bg-ink-900 px-8 py-10 text-parchment-50 shadow-xl"
      >
        <motion.div style={{ opacity: contentOpacity }} className="flex flex-col items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-500/20 text-terracotta-300">
            <PhoneCall className="h-6 w-6" />
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.3em] text-parchment-300/70">
            Mira is listening
          </p>

          <div className="flex h-12 items-center gap-1">
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full bg-terracotta-400"
                animate={{ height: [h * 0.4, h, h * 0.4] }}
                transition={{
                  duration: 1.1 + (i % 3) * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.06,
                }}
              />
            ))}
          </div>

          <p className="text-center text-lg text-parchment-50 sm:text-xl">
            Every call, answered.
          </p>
        </motion.div>
      </motion.div>
    </Beat>
  );
}
