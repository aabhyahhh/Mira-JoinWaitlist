"use client";

import { motion } from "framer-motion";

export function ProgressBar({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-ink-400">
        <span>
          Step {step} of {totalSteps}
        </span>
        <span>{Math.round((step / totalSteps) * 100)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
