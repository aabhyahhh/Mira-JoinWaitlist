"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useTransform } from "framer-motion";

import { Beat, useBeatProgress } from "@/components/story/beat";

const LINE = "Yes — free parking right outside the building.";

export function BeatMiraAnswers({ index }: { index: number }) {
  const { progress, start, span } = useBeatProgress(index);
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { amount: 0.6 });
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView) {
      setChars(0);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setChars(i);
      if (i >= LINE.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView]);

  const fadeOutStart = start + span * 0.82;
  const fadeOutEnd = start + span * 0.94;

  const badgeOpacity = useTransform(
    progress,
    [start + span * 0.06, start + span * 0.16, start + span * 0.56, start + span * 0.64],
    [0, 1, 1, 0]
  );
  const lineOpacity = useTransform(
    progress,
    [start + span * 0.28, start + span * 0.36, start + span * 0.56, start + span * 0.64],
    [0, 1, 1, 0]
  );
  // The emotional payoff gets its own uncontested moment once the
  // conversation has finished playing out.
  const closingOpacity = useTransform(
    progress,
    [start + span * 0.68, start + span * 0.76, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );

  return (
    <Beat index={index}>
      <div ref={sceneRef} className="relative flex flex-col items-center gap-8 px-6">
        <motion.p
          style={{ opacity: badgeOpacity }}
          className="absolute top-[38%] text-[11px] font-medium uppercase tracking-[0.35em] text-gold-300"
        >
          Mira answered
        </motion.p>

        <div className="relative mt-24 grid min-h-[3.5rem] max-w-sm place-items-center">
          <motion.p
            style={{ opacity: lineOpacity }}
            className="col-start-1 row-start-1 text-balance text-center font-display text-xl italic leading-relaxed text-parchment-100 sm:text-2xl"
          >
            {LINE.slice(0, chars)}
            <span className="animate-pulse text-gold-300">{chars < LINE.length ? "|" : ""}</span>
          </motion.p>
          <motion.p
            style={{ opacity: closingOpacity }}
            className="col-start-1 row-start-1 text-balance text-center text-2xl leading-snug text-parchment-100 sm:text-3xl"
          >
            Your business deserves your attention.
            <br />
            Not repetitive questions.
          </motion.p>
        </div>
      </div>
    </Beat>
  );
}
