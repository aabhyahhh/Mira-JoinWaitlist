"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Instagram, Linkedin } from "lucide-react";

import { DemoVideo } from "@/components/waitlist/demo-video";

const DEMO_VIDEO_POSTER = "/demo-video-poster.svg";
const INSTAGRAM_URL = "https://www.instagram.com/miraoncall?igsh=MTczYjB3aTc4enIyNw==";
const LINKEDIN_URL = "https://www.linkedin.com/company/mira-on-call/";

export function SuccessScreen({ demoVideoUrl }: { demoVideoUrl: string }) {
  useEffect(() => {
    const duration = 1200;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.6 },
        colors: ["#f15a3c", "#ff7a5c", "#ffc7b8"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.6 },
        colors: ["#f15a3c", "#ff7a5c", "#ffc7b8"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <Check className="h-8 w-8" strokeWidth={3} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-6 text-2xl text-charcoal-900 sm:text-3xl"
      >
        You&apos;re on the Mira waitlist! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-3 max-w-sm text-base leading-relaxed text-charcoal-600"
      >
        We&apos;ll be in touch as we onboard hosts. In the meantime, here&apos;s
        Mira in action.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
        className="mt-8 w-full"
      >
        <DemoVideo src={demoVideoUrl} poster={DEMO_VIDEO_POSTER} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 flex items-center gap-4"
      >
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal-900 px-5 py-3 text-sm font-medium text-charcoal-900 transition-colors hover:bg-charcoal-900 hover:text-cream-50"
        >
          <Instagram className="h-4 w-4" />
          Instagram
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border-2 border-charcoal-900 px-5 py-3 text-sm font-medium text-charcoal-900 transition-colors hover:bg-charcoal-900 hover:text-cream-50"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </motion.div>
    </div>
  );
}
