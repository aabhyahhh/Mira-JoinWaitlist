"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { beatRange } from "@/components/story/motion";

const STATS = [
  { label: "Calls answered", value: "12" },
  { label: "Bookings qualified", value: "5" },
  { label: "Guest messages sent", value: "9" },
] as const;

function StatRow({
  label,
  value,
  progress,
  revealAt,
  revealSpan,
}: {
  label: string;
  value: string;
  progress: MotionValue<number>;
  revealAt: number;
  revealSpan: number;
}) {
  const opacity = useTransform(progress, [revealAt, revealAt + revealSpan], [0, 1]);
  const y = useTransform(progress, [revealAt, revealAt + revealSpan], [12, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="flex items-center justify-between border-b border-border/60 py-3 last:border-none"
    >
      <span className="text-sm text-ink-600">{label}</span>
      <span className="font-display text-2xl text-ink-900">{value}</span>
    </motion.div>
  );
}

export function BeatDashboard({ index }: { index: number }) {
  const { progress } = useBeatProgress(index);
  const [start, end] = beatRange(index);
  const span = end - start;

  const cardOpacity = useTransform(progress, [start, start + span * 0.15], [0, 1]);
  const cardScale = useTransform(progress, [start, start + span * 0.15], [0.94, 1]);
  const headOpacity = useTransform(progress, [start + span * 0.05, start + span * 0.15], [0, 1]);

  return (
    <Beat index={index}>
      <motion.div
        style={{ opacity: cardOpacity, scale: cardScale }}
        className="flex w-full max-w-sm flex-col gap-1 rounded-3xl border border-border bg-card px-8 py-9 shadow-lg"
      >
        <motion.p
          style={{ opacity: headOpacity }}
          className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-terracotta-500"
        >
          While you were away
        </motion.p>

        {STATS.map((stat, i) => (
          <StatRow
            key={stat.label}
            label={stat.label}
            value={stat.value}
            progress={progress}
            revealAt={start + span * (0.2 + i * 0.14)}
            revealSpan={span * 0.1}
          />
        ))}
      </motion.div>
    </Beat>
  );
}
