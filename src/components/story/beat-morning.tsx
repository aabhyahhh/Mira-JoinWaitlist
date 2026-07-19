"use client";

import { motion, useTransform } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Beat, useBeatProgress } from "@/components/story/beat";
import { Window } from "@/components/story/window-motif";

export function BeatMorning({ index }: { index: number }) {
  const { progress, start, end, span } = useBeatProgress(index);

  const windowGlow = useTransform(progress, [start, start + span * 0.35], [0.7, 1]);
  const windowScale = useTransform(progress, [start, end], [1, 1.6]);
  // Fades the window itself out as daylight (driven by RoomEnvironment) takes over.
  const windowFade = useTransform(progress, [end - span * 0.14, end - span * 0.02], [1, 0]);

  const cardOpacity = useTransform(
    progress,
    [start + span * 0.12, start + span * 0.28, end - span * 0.16, end - span * 0.06],
    [0, 1, 1, 0]
  );
  const cardY = useTransform(progress, [start + span * 0.12, start + span * 0.28], [16, 0]);

  const headlineOpacity = useTransform(progress, [start + span * 0.42, start + span * 0.58], [0, 1]);
  const headlineY = useTransform(progress, [start + span * 0.42, start + span * 0.58], [12, 0]);
  // Text crosses from light (dark room) to dark (lit room) as RoomEnvironment's
  // own dawn flood takes over, so it stays legible through the whole handoff.
  const headlineColor = useTransform(
    progress,
    [end - span * 0.14, end - span * 0.02],
    ["#fdfaf5", "#1a1714"]
  );

  return (
    <Beat index={index} holdAtEnd>
      <div className="relative flex flex-col items-center justify-center px-6">
        <motion.div style={{ scale: windowScale, opacity: windowFade }} className="relative">
          <Window glow={windowGlow} />
        </motion.div>

        <motion.div
          style={{ opacity: cardOpacity, y: cardY }}
          className="relative mt-8 flex items-center gap-3 rounded-2xl border border-parchment-300/30 bg-ink-900/40 px-5 py-4 backdrop-blur-sm"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-200" />
          <div className="text-left">
            <p className="text-sm font-medium text-parchment-50">New booking confirmed</p>
            <p className="text-xs text-parchment-300">Handled overnight — no calls needed.</p>
          </div>
        </motion.div>

        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY, color: headlineColor }}
          className="relative mt-10 max-w-md text-balance text-center text-3xl leading-snug sm:text-4xl"
        >
          Your guests still feel heard.
          <br />
          You finally get to breathe.
        </motion.h2>
      </div>
    </Beat>
  );
}
