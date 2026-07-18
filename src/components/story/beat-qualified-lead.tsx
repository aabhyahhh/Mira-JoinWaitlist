"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { beatRange } from "@/components/story/motion";

const ITEMS = ["Dates confirmed", "Guests: 2", "Late check-in noted"] as const;

function ChecklistRow({
  label,
  progress,
  revealAt,
  revealSpan,
}: {
  label: string;
  progress: MotionValue<number>;
  revealAt: number;
  revealSpan: number;
}) {
  const opacity = useTransform(progress, [revealAt, revealAt + revealSpan], [0, 1]);
  const x = useTransform(progress, [revealAt, revealAt + revealSpan], [-10, 0]);

  return (
    <motion.div style={{ opacity, x }} className="flex items-center gap-3">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terracotta-500 text-parchment-50">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      <span className="text-sm text-ink-700">{label}</span>
    </motion.div>
  );
}

export function BeatQualifiedLead({ index }: { index: number }) {
  const { progress } = useBeatProgress(index);
  const [start, end] = beatRange(index);
  const span = end - start;

  const cardOpacity = useTransform(progress, [start, start + span * 0.15], [0, 1]);
  const cardScale = useTransform(progress, [start, start + span * 0.15], [0.92, 1]);
  const badgeOpacity = useTransform(progress, [start + span * 0.55, start + span * 0.65], [0, 1]);
  const badgeScale = useTransform(progress, [start + span * 0.55, start + span * 0.68], [0.8, 1]);

  return (
    <Beat index={index}>
      <motion.div
        style={{ opacity: cardOpacity, scale: cardScale }}
        className="flex w-full max-w-sm flex-col gap-5 rounded-3xl border border-border bg-card px-8 py-9 shadow-lg"
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-terracotta-500">
          Booking Qualified
        </p>

        <div className="flex flex-col gap-3">
          {ITEMS.map((label, i) => (
            <ChecklistRow
              key={label}
              label={label}
              progress={progress}
              revealAt={start + span * (0.2 + i * 0.12)}
              revealSpan={span * 0.08}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity: badgeOpacity, scale: badgeScale }}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-terracotta-50 px-4 py-2 text-sm font-medium text-terracotta-700"
        >
          Ready for the host
        </motion.div>
      </motion.div>
    </Beat>
  );
}
