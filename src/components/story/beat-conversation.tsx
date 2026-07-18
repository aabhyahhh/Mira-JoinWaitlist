"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { beatRange } from "@/components/story/motion";

const MESSAGES = [
  { from: "guest", text: "Is late check-in possible tonight?" },
  { from: "mira", text: "Yes — I've noted 11 PM arrival for you." },
  { from: "guest", text: "Perfect, thank you!" },
] as const;

function Bubble({
  from,
  text,
  progress,
  revealAt,
  revealSpan,
}: {
  from: string;
  text: string;
  progress: MotionValue<number>;
  revealAt: number;
  revealSpan: number;
}) {
  const opacity = useTransform(progress, [revealAt, revealAt + revealSpan], [0, 1]);
  const y = useTransform(progress, [revealAt, revealAt + revealSpan], [14, 0]);
  const isGuest = from === "guest";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
        isGuest ? "self-start bg-card text-ink-800" : "self-end bg-ink-900 text-parchment-50"
      }`}
    >
      {text}
    </motion.div>
  );
}

export function BeatConversation({ index }: { index: number }) {
  const { progress } = useBeatProgress(index);
  const [start, end] = beatRange(index);
  const span = end - start;

  return (
    <Beat index={index}>
      <div className="flex w-full max-w-sm flex-col gap-3 px-6">
        {MESSAGES.map((msg, i) => (
          <Bubble
            key={i}
            from={msg.from}
            text={msg.text}
            progress={progress}
            revealAt={start + span * (0.15 + i * 0.2)}
            revealSpan={span * 0.08}
          />
        ))}
      </div>
    </Beat>
  );
}
