"use client";

import Link from "next/link";
import { getFeaturedPackages } from "@/data/packages";
import { PackageCard } from "@/components/packages/PackageCard";
import { StaggerContainer, StaggerChild, ViewportReveal } from "@/components/ui/animations";

export function FeaturedTrips() {
  const featured = getFeaturedPackages(6);

  return (
    <section className="bg-stone-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ViewportReveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Featured Trips</h2>
              <p className="mt-2 text-stone-600">Hand-picked adventures with confirmed departures and top ratings.</p>
            </div>
            <Link
              href="/packages"
              className="smooth-tap rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition-smooth hover:bg-stone-50 hover:shadow-md"
            >
              View all packages
            </Link>
          </div>
        </ViewportReveal>
        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.08}>
          {featured.map((pkg) => (
            <StaggerChild key={pkg.slug} className="h-full">
              <PackageCard pkg={pkg} />
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
