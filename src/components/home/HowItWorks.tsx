"use client";

import Link from "next/link";
import { StaggerContainer, StaggerChild, ViewportReveal } from "@/components/ui/animations";

const steps = [
  {
    step: 1,
    title: "Share your plan",
    description: "Tell us where you want to go, dates, and group size via WhatsApp or the form.",
  },
  {
    step: 2,
    title: "Get your itinerary",
    description: "We send a custom itinerary and quote within 24 hours. No obligation.",
  },
  {
    step: 3,
    title: "Confirm your seat",
    description: "Book with a small deposit. We handle permits, stays, and transport.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ViewportReveal>
          <h2 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">How It Works</h2>
          <p className="mt-2 text-stone-600">Three simple steps from dream to departure.</p>
        </ViewportReveal>
        <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-3" staggerChildren={0.1}>
          {steps.map((s) => (
            <StaggerChild key={s.step}>
              <div className="relative transition-smooth hover:-translate-y-0.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-lg font-bold text-white shadow-md">
                  {s.step}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-stone-900">{s.title}</h3>
                <p className="mt-2 text-stone-600">{s.description}</p>
                {s.step < 3 && (
                  <div className="absolute -right-4 top-6 hidden text-stone-300 md:block">
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </div>
                )}
              </div>
            </StaggerChild>
          ))}
        </StaggerContainer>
        <ViewportReveal className="mt-10 text-center">
          <Link
            href="/plan"
            className="smooth-tap inline-flex items-center rounded-full bg-teal-600 px-6 py-3 font-semibold text-white transition-smooth hover:scale-[1.02] hover:bg-teal-700 hover:shadow-lg"
          >
            Get a custom itinerary
          </Link>
        </ViewportReveal>
      </div>
    </section>
  );
}
