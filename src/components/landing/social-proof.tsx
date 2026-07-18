"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function SocialProof() {
  return (
    <section className="px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-xl rounded-2xl bg-ink-900 px-6 py-8 text-center text-parchment-50"
      >
        <Sparkles className="mx-auto h-6 w-6 text-terracotta-300" />
        <p className="mt-4 text-lg leading-relaxed">
          &ldquo;We&apos;re piloting Mira with a handful of hosts in Goa and
          Jaipur before opening up more broadly.&rdquo;
        </p>
        <p className="mt-3 text-sm text-parchment-100/70">
          — Early pilot cohort, 2026
        </p>
      </motion.div>
    </section>
  );
}
