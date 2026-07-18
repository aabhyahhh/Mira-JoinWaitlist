"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex items-center justify-center px-4 pt-6 sm:justify-start sm:px-6"
    >
      <div className="flex items-center gap-2.5">
        <Image
          src="/logo.png"
          alt="Mira"
          width={32}
          height={32}
          priority
          className="h-8 w-8 rounded-full"
        />
        <span className="font-display text-lg tracking-tight text-ink-900">
          Mira
        </span>
      </div>
    </motion.header>
  );
}
