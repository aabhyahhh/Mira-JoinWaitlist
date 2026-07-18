"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Interstitial({
  submitting,
  onContinue,
  onSkip,
}: {
  submitting: boolean;
  onContinue: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="text-5xl"
      >
        🎉
      </motion.div>
      <h2 className="page-title mt-5 text-ink-900">Almost there</h2>
      <p className="mt-3 max-w-xs text-base leading-relaxed text-ink-600">
        Want a demo tailored to your property? Takes about 60 seconds.
      </p>

      <div className="mt-8 flex w-full flex-col gap-3">
        <Button
          size="lg"
          variant="soft"
          className="w-full"
          onClick={onContinue}
          disabled={submitting}
        >
          Continue
        </Button>
        <Button size="lg" className="w-full" onClick={onSkip} disabled={submitting}>
          {submitting && <Loader2 className="h-5 w-5 animate-spin" />}
          Skip, I&apos;m done →
        </Button>
      </div>
    </div>
  );
}
