"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { packages as allPackages } from "@/data/packages";
import { PackageCard } from "@/components/packages/PackageCard";

export function PackagesList() {
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    let list = [...allPackages];
    const destination = searchParams.get("destination");
    const duration = searchParams.get("duration");
    const budget = searchParams.get("budget");
    const type = searchParams.get("type");

    if (destination) list = list.filter((p) => p.destinationSlug === destination);
    if (type) list = list.filter((p) => p.type.includes(type as never));
    if (duration) {
      const [min, max] = duration === "11+" ? [11, 999] : duration.split("-").map(Number);
      list = list.filter((p) => p.durationDays >= min && (max ? p.durationDays <= max : true));
    }
    if (budget) {
      const maxBudget = Number(budget) * 1000;
      list = list.filter((p) => p.priceFromPkr <= maxBudget);
    }
    return list;
  }, [searchParams]);

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-12 text-center">
        <p className="text-stone-600">No packages match your filters. Try adjusting them.</p>
        <a href="/packages" className="mt-4 inline-block text-teal-700 font-medium hover:underline">
          Clear filters
        </a>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((pkg) => (
        <PackageCard key={pkg.slug} pkg={pkg} />
      ))}
    </div>
  );
}
