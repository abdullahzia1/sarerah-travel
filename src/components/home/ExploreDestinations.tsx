"use client";

import Link from "next/link";
import { destinations } from "@/data/destinations";
import { DestinationTile } from "@/components/destinations/DestinationTile";
import { StaggerContainer, StaggerChild, ViewportReveal } from "@/components/ui/animations";

export function ExploreDestinations() {
  const northPakistan = destinations.filter((d) => d.region === "North Pakistan");
  const international = destinations.filter((d) => d.region === "International");

  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ViewportReveal>
          <h2 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Explore by Destination</h2>
          <p className="mt-2 max-w-2xl text-stone-600">
            North Pakistan's finest valleys and hand-picked international destinations.
          </p>
        </ViewportReveal>

        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">North Pakistan</h3>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerChildren={0.06}>
            {northPakistan.map((d) => (
              <StaggerChild key={d.slug}>
                <DestinationTile destination={d} />
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>

        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stone-500">International</h3>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" staggerChildren={0.06}>
            {international.map((d) => (
              <StaggerChild key={d.slug}>
                <DestinationTile destination={d} />
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>

        <ViewportReveal className="mt-10 text-center">
          <Link
            href="/destinations"
            className="smooth-tap inline-flex items-center rounded-full bg-teal-600 px-6 py-3 font-semibold text-white transition-smooth hover:scale-[1.02] hover:bg-teal-700 hover:shadow-lg"
          >
            View all destinations
          </Link>
        </ViewportReveal>
      </div>
    </section>
  );
}
