"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/faq";
import { ViewportReveal } from "@/components/ui/animations";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pb-24 md:pb-12">
      <div className="border-b border-stone-200 bg-white py-10">
        <ViewportReveal className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-stone-600">
            Quick answers to common questions. Still have doubts? <Link href="/contact" className="font-medium text-teal-700 hover:underline">Contact us</Link>.
          </p>
        </ViewportReveal>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-smooth hover:shadow-md"
              initial={false}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-stone-900 transition-smooth hover:bg-stone-50 focus:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:ring-inset"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span>{faq.q}</span>
                <motion.span
                  className="shrink-0 text-stone-400"
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
                  aria-hidden
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
                    className="border-t border-stone-100"
                  >
                    <div className="px-5 py-4 text-stone-600">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <ViewportReveal className="mt-10 text-center">
          <Link href="/contact" className="link-underline font-medium text-teal-700 hover:text-teal-800">
            Contact us
          </Link>
        </ViewportReveal>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
