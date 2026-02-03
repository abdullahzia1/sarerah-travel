"use client";

import Link from "next/link";
import { PackageCard } from "@/components/packages/PackageCard";
import { ViewportReveal, StaggerContainer, StaggerChild } from "@/components/ui/animations";
import type { Destination } from "@/types";
import type { Package } from "@/types";

interface DestinationDetailContentProps {
  dest: Destination;
  packages: Package[];
  whatsappUrl: string;
}

export function DestinationDetailContent({ dest, packages, whatsappUrl }: DestinationDetailContentProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ViewportReveal>
        <p className="text-lg leading-relaxed text-stone-600">{dest.description}</p>
      </ViewportReveal>

      <ViewportReveal delay={0.1}>
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-stone-900">Highlights</h2>
          <StaggerContainer className="mt-3 flex flex-wrap gap-3" staggerChildren={0.04}>
            {dest.highlights.map((h) => (
              <StaggerChild key={h}>
                <span className="inline-block rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-800 transition-smooth hover:bg-teal-100 hover:text-teal-800">
                  {h}
                </span>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </section>
      </ViewportReveal>

      <ViewportReveal delay={0.15}>
        <section className="mt-10 rounded-xl border border-stone-200 bg-stone-50/50 px-5 py-4">
          <p className="text-stone-600">
            <strong className="text-stone-800">Best season:</strong> {dest.bestSeason}
          </p>
        </section>
      </ViewportReveal>

      <section className="mt-14">
        <ViewportReveal>
          <h2 className="font-display text-2xl font-bold text-stone-900">Packages in {dest.name}</h2>
          <p className="mt-2 text-stone-600">Choose a ready-made itinerary or ask for a custom one.</p>
        </ViewportReveal>
        {packages.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.slug} className="h-full">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        ) : (
          <ViewportReveal delay={0.1} className="mt-8">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center">
              <p className="text-stone-600">No ready-made packages for this destination yet.</p>
              <p className="mt-1 text-stone-600">We can create a custom itinerary for you.</p>
              <Link
                href="/plan"
                className="mt-6 inline-flex rounded-full bg-teal-600 px-6 py-3 font-semibold text-white transition-smooth hover:bg-teal-700"
              >
                Get custom itinerary
              </Link>
            </div>
          </ViewportReveal>
        )}
      </section>

      <ViewportReveal className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/plan"
          className="smooth-tap rounded-full bg-teal-600 px-6 py-3 font-semibold text-white transition-smooth hover:bg-teal-700 hover:shadow-md"
        >
          Get custom itinerary
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="smooth-tap rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-600 transition-smooth hover:bg-stone-50"
        >
          Chat
        </a>
      </ViewportReveal>
    </div>
  );
}
