"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getRecentReviews } from "@/data/reviews";
import { formatDate } from "@/lib/utils";
import { ViewportReveal } from "@/components/ui/animations";

const reviews = getRecentReviews(6);

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ViewportReveal>
          <h2 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">What Travelers Say</h2>
          <p className="mt-2 text-stone-600">Real feedback from people who traveled with us.</p>
        </ViewportReveal>

        <div className="mt-10 overflow-hidden" style={{ width: "100%" }}>
          <motion.div
            className="flex"
            animate={{ x: `-${active * (100 / reviews.length)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ width: `${reviews.length * 100}%` }}
          >
            {reviews.map((r) => (
              <div
                key={r.id}
                className="flex-shrink-0 px-2 md:px-3"
                style={{ width: `${100 / reviews.length}%` }}
              >
                <blockquote className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-smooth hover:shadow-md md:p-10">
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5" />
                    ))}
                  </div>
                  <p className="mt-4 text-lg text-stone-700">&ldquo;{r.text}&rdquo;</p>
                  <footer className="mt-6 flex items-center justify-between">
                    <div>
                      <cite className="font-semibold not-italic text-stone-900">{r.author}</cite>
                      {r.location && (
                        <span className="ml-2 text-sm text-stone-500">{r.location}</span>
                      )}
                    </div>
                    <time className="text-sm text-stone-500">{formatDate(r.date)}</time>
                  </footer>
                </blockquote>
              </div>
            ))}
          </motion.div>
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <motion.button
                key={i}
                type="button"
                aria-label={`Review ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-smooth ${
                  i === active ? "w-8 bg-teal-600" : "w-2 bg-stone-300 hover:bg-stone-400"
                }`}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/reviews"
            className="text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            Read all reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
