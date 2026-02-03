"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { destinations } from "@/data/destinations";
import { FadeInUp } from "@/components/ui/animations";

const heroImages = [
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
];

const CAROUSEL_INTERVAL_MS = 6000;
const CROSSFADE_DURATION = 0.9;

const chipDestinations = destinations.slice(0, 8).map((d) => ({ slug: d.slug, name: d.name }));

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % heroImages.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + heroImages.length) % heroImages.length);
    setProgress(0);
  }, []);

  // Auto-advance with pause support; progress drives indicator
  useEffect(() => {
    if (isPaused) return;
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / CAROUSEL_INTERVAL_MS, 1);
      setProgress(p);
      if (p >= 1) setActiveIndex((i) => (i + 1) % heroImages.length);
    }, 80);
    return () => clearInterval(id);
  }, [activeIndex, isPaused]);

  // Pause when tab is hidden (optional, saves CPU and avoids confusion)
  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section
      className="relative min-h-[85vh] overflow-hidden md:min-h-[90vh]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Crossfade: all slides in DOM, opacity driven by activeIndex */}
      {heroImages.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : CROSSFADE_DURATION, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ pointerEvents: i === activeIndex ? "auto" : "none" }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
          <div className="overlay-hero absolute inset-0" />
        </motion.div>
      ))}

      <div className="relative z-10 flex min-h-[85vh] flex-col justify-center px-4 py-24 md:min-h-[90vh] md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <FadeInUp delay={0.2}>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl [text-shadow:0_1px_2px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3),0_4px_16px_rgba(0,0,0,0.2)]">
              Luxury Adventure, Without the Luxury Price
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.35}>
            <p className="mt-4 max-w-2xl text-lg text-white sm:text-xl [text-shadow:0_1px_3px_rgba(0,0,0,0.5),0_2px_6px_rgba(0,0,0,0.3)]">
              North Pakistan & Asia — Curated trips, seamless experience. Licensed guides, no hidden charges.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/packages"
                className="smooth-tap inline-flex items-center rounded-full bg-white px-6 py-3.5 text-base font-semibold text-stone-900 shadow-lg transition-smooth hover:scale-[1.02] hover:shadow-xl"
              >
                Explore packages
              </Link>
              <Link
                href="/plan"
                className="smooth-tap inline-flex items-center rounded-full border-2 border-white bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition-smooth hover:bg-white/20"
              >
                Plan a custom trip
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
              Prefer to chat? Use the{" "}
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
                chat button
              </a>{" "}
              in the corner.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.65}>
            <div className="mt-10">
              <p className="mb-3 text-sm font-medium text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">Quick select destination</p>
              <div className="flex flex-wrap gap-2">
                {chipDestinations.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/destinations/${d.slug}`}
                    className="smooth-tap rounded-full border border-white/60 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-smooth hover:bg-white/30 hover:scale-105 [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Prev/Next — subtle, keyboard-friendly */}
      <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-2 md:pl-4">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => prev()}
          className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-2 md:pr-4">
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => next()}
          className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots with progress fill */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2 md:bottom-6">
        {heroImages.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === activeIndex ? "true" : undefined}
            onClick={() => goTo(i)}
            className="relative h-1.5 w-6 overflow-hidden rounded-full bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-white"
              style={{
                width: i === activeIndex ? `${progress * 100}%` : "0%",
                transition: "width 80ms linear",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

