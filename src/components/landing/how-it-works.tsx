"use client";

import { motion } from "framer-motion";
import { PhoneIncoming, MessagesSquare, CalendarCheck } from "lucide-react";

const STEPS = [
  {
    icon: PhoneIncoming,
    title: "Guest calls, anytime",
    description:
      "A booking question, a check-in hiccup, a late-night ask — Mira picks up in seconds, day or night.",
  },
  {
    icon: MessagesSquare,
    title: "Mira handles the conversation",
    description:
      "In Hindi, English, or Hinglish. FAQs, directions, pricing, availability — answered like your best front-desk hire.",
  },
  {
    icon: CalendarCheck,
    title: "You get the summary",
    description:
      "Every call logged and summarized, with anything urgent flagged straight to you on WhatsApp.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-xl">
        <h2 className="page-title text-center text-ink-900">How it works</h2>
        <div className="mt-10 space-y-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-600">
                <step.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink-900">
                  {i + 1}. {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
