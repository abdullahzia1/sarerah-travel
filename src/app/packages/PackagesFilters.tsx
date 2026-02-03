"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { destinations } from "@/data/destinations";

const DURATIONS = [
  { value: "", label: "Any" },
  { value: "1-5", label: "1–5 days" },
  { value: "6-10", label: "6–10 days" },
  { value: "11+", label: "11+ days" },
];

const BUDGETS = [
  { value: "", label: "Any" },
  { value: "50", label: "Under 50k PKR" },
  { value: "100", label: "Under 100k PKR" },
  { value: "200", label: "Under 200k PKR" },
  { value: "300", label: "200k+ PKR" },
];

const TYPES = [
  "Adventure",
  "Family",
  "Honeymoon",
  "Trekking",
  "Road Trip",
  "Group Tour",
];

export function PackagesFilters() {
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      return next.toString();
    },
    [searchParams]
  );

  const destination = searchParams.get("destination") ?? "";
  const duration = searchParams.get("duration") ?? "";
  const budget = searchParams.get("budget") ?? "";
  const type = searchParams.get("type") ?? "";

  return (
    <div className="sticky top-16 z-30 border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-stone-500">Destination</span>
            <select
              value={destination}
              onChange={(e) => (window.location.href = `/packages?${setParam("destination", e.target.value)}`)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">All</option>
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-stone-500">Duration</span>
            <select
              value={duration}
              onChange={(e) => (window.location.href = `/packages?${setParam("duration", e.target.value)}`)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            >
              {DURATIONS.map((o) => (
                <option key={o.value || "any"} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-stone-500">Budget</span>
            <select
              value={budget}
              onChange={(e) => (window.location.href = `/packages?${setParam("budget", e.target.value)}`)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            >
              {BUDGETS.map((o) => (
                <option key={o.value || "any"} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-stone-500">Type</span>
            <select
              value={type}
              onChange={(e) => (window.location.href = `/packages?${setParam("type", e.target.value)}`)}
              className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">All</option>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          {(destination || duration || budget || type) && (
            <a
              href="/packages"
              className="text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              Clear filters
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
