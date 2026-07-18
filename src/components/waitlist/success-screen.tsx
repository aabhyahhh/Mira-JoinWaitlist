"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Instagram, Linkedin } from "lucide-react";

import { DemoVideo } from "@/components/waitlist/demo-video";
import { EASE_OUT_EXPO } from "@/components/story/motion";

const DEMO_VIDEO_POSTER = "/demo-video-poster.svg";
const INSTAGRAM_URL = "https://www.instagram.com/miraoncall?igsh=MTczYjB3aTc4enIyNw==";
const LINKEDIN_URL = "https://www.linkedin.com/company/mira-on-call/";

export function SuccessScreen({ demoVideoUrl }: { demoVideoUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const duration = 1200;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.6 },
        colors: ["#d9513f", "#e17465", "#c9a882", "#f1bdb7"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.6 },
        colors: ["#d9513f", "#e17465", "#c9a882", "#f1bdb7"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-40 bg-ink-900/95"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: isPlaying ? 0.5 : 1,
          opacity: isPlaying ? 0 : 1,
        }}
        transition={
          isPlaying
            ? { duration: 0.4, ease: EASE_OUT_EXPO }
            : { type: "spring", stiffness: 260, damping: 18 }
        }
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <Check className="h-8 w-8" strokeWidth={3} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isPlaying ? 0 : 1, y: 0 }}
        transition={{ delay: isPlaying ? 0 : 0.15, duration: 0.4, ease: EASE_OUT_EXPO }}
        className="mt-6 text-2xl text-ink-900 sm:text-3xl"
      >
        You&apos;re on the Mira waitlist! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isPlaying ? 0 : 1, y: 0 }}
        transition={{ delay: isPlaying ? 0 : 0.25, duration: 0.4, ease: EASE_OUT_EXPO }}
        className="mt-3 max-w-sm text-base leading-relaxed text-ink-600"
      >
        We&apos;ll be in touch as we onboard hosts. In the meantime, here&apos;s
        Mira in action.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.9, filter: "blur(6px)" }}
        animate={{
          opacity: 1,
          y: 0,
          scale: isPlaying ? 1.15 : 1,
          filter: "blur(0px)",
        }}
        transition={
          isPlaying
            ? { duration: 0.7, ease: EASE_OUT_EXPO }
            : { delay: 0.35, duration: 0.5, ease: EASE_OUT_EXPO }
        }
        className={
          isPlaying
            ? "relative z-50 mt-8 w-full max-w-sm"
            : "relative z-10 mt-8 w-full"
        }
      >
        <DemoVideo
          src={demoVideoUrl}
          poster={DEMO_VIDEO_POSTER}
          onPlayStateChange={setIsPlaying}
        />
        {isPlaying && (
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-parchment-200/70">
            Real Guest · Real Property · Real Conversation
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 0 : 1 }}
        transition={{ delay: isPlaying ? 0 : 0.5, duration: 0.4, ease: EASE_OUT_EXPO }}
        className="mt-8 flex items-center gap-4"
      >
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900 px-5 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-ink-900 hover:text-parchment-50"
        >
          <Instagram className="h-4 w-4" />
          Instagram
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-ink-900 px-5 py-3 text-sm font-medium text-ink-900 transition-colors hover:bg-ink-900 hover:text-parchment-50"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </motion.div>
    </div>
  );
}
