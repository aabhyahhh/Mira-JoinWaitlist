"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What languages does Mira speak?",
    answer:
      "Hindi, English, and Hinglish today, with more languages planned as we roll out to more regions.",
  },
  {
    question: "Do I need to change my phone number?",
    answer:
      "No — Mira plugs into your existing guest-facing number, so guests keep calling the number they already have.",
  },
  {
    question: "When can I start using Mira?",
    answer:
      "We're onboarding hosts in small batches from our pilot waitlist. Join now and we'll reach out as a spot opens up.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing is still being finalized with our pilot hosts. Waitlist members get first access and founder pricing.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-xl">
        <h2 className="page-title text-center text-ink-900">
          Questions, answered
        </h2>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question} className="px-5">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-medium text-ink-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-ink-400 transition-transform",
                      isOpen && "rotate-180 text-terracotta-500"
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-ink-600">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
