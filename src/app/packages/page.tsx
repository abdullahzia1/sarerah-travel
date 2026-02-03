import { Suspense } from "react";
import { PackagesList } from "./PackagesList";
import { PackagesFilters } from "./PackagesFilters";

export const metadata = {
  title: "Tour Packages",
  description:
    "Browse Hunza, Skardu, Naran, Fairy Meadows, Thailand, Malaysia, Sri Lanka, Nepal & Azerbaijan tour packages. Filter by destination, duration, budget.",
};

export default function PackagesPage() {
  return (
    <div className="pb-24 md:pb-12">
      <div className="border-b border-stone-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Tour Packages</h1>
          <p className="mt-2 text-stone-600">
            Hand-crafted itineraries for North Pakistan and international destinations.
          </p>
        </div>
      </div>
      <Suspense fallback={<div className="min-h-[120px] p-8 text-center text-stone-500">Loading…</div>}>
        <PackagesFilters />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <PackagesList />
        </div>
      </Suspense>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
