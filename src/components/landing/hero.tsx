"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:pt-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-terracotta-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-40 h-56 w-56 rounded-full bg-terracotta-100/60 blur-3xl" />

      <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-terracotta-100 px-4 py-2 text-sm font-medium text-terracotta-700"
        >
          <PhoneCall className="h-4 w-4" />
          Now piloting with hosts across India
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-4xl leading-[1.1] text-ink-900 sm:text-5xl"
        >
          Your front desk never sleeps.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mt-5 text-lg leading-relaxed text-ink-600"
        >
          Mira answers every guest call in Hindi, English, or Hinglish — so
          you never lose a booking to a missed call again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-9 w-full"
        >
          <Button
            size="lg"
            onClick={onCtaClick}
            className="w-full sm:w-auto"
          >
            Join the Waitlist
          </Button>
          <p className="mt-4 text-sm text-ink-400">
            Takes 20 seconds. No credit card, no spam.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
