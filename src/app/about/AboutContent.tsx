"use client";

import Link from "next/link";
import { ViewportReveal } from "@/components/ui/animations";

export function AboutContent() {
  return (
    <>
      <div className="border-b border-stone-200 bg-white py-10">
        <ViewportReveal className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">About Sarerah Travel</h1>
          <p className="mt-2 text-lg text-stone-600">
            Luxury adventure at excellent value — that&apos;s what we stand for.
          </p>
        </ViewportReveal>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <ViewportReveal delay={0.1}>
          <div className="prose prose-stone max-w-none">
            <p className="text-lg text-stone-700">
              We&apos;re a Pakistan-based travel company focused on North Pakistan — Hunza, Skardu, Naran,
              Fairy Meadows — and hand-picked international destinations like Thailand, Malaysia, Sri Lanka,
              Nepal, and Azerbaijan.
            </p>
            <p className="text-stone-700">
              Our trips are designed to feel premium: small groups, experienced local guides, and transparent
              pricing. We don&apos;t believe in hidden charges or last-minute surprises. From the moment you
              inquire until you return home, we&apos;re available on WhatsApp to support you.
            </p>
            <p className="text-stone-700">
              Whether you want a ready-made package or a fully custom itinerary, we&apos;ll help you plan a
              trip that matches your pace and budget. Get in touch via WhatsApp or the contact form — we
              typically reply within a few hours.
            </p>
          </div>
        </ViewportReveal>

        <ViewportReveal delay={0.2}>
          <h2 className="mt-12 font-display text-xl font-bold text-stone-900">Why book with us</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Licensed and registered travel company",
              "Experienced guides on every trip",
              "No hidden charges — clear quotes",
              "Support throughout your journey",
              "Thousands of happy travelers",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-stone-700 transition-smooth hover:translate-x-1"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </ViewportReveal>

        <ViewportReveal delay={0.25} className="mt-14">
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center sm:p-8">
            <p className="font-display text-lg font-semibold text-stone-900">Ready to plan your trip?</p>
            <p className="mt-1 text-sm text-stone-600">Get in touch via the form or by phone.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="smooth-tap inline-flex items-center rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-smooth hover:bg-teal-700 hover:shadow-md"
              >
                Contact us
              </Link>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-stone-600 underline hover:text-stone-900"
              >
                or WhatsApp
              </a>
            </div>
          </div>
        </ViewportReveal>
      </div>
    </>
  );
}
