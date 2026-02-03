"use client";

import Link from "next/link";
import { StaggerContainer, StaggerChild, ViewportReveal } from "@/components/ui/animations";

const categories = [
  { label: "Trekking", href: "/packages?type=Trekking", icon: "🥾" },
  { label: "Road Trips", href: "/packages?type=Road Trip", icon: "🛣️" },
  { label: "Honeymoon", href: "/packages?type=Honeymoon", icon: "💑" },
  { label: "Family", href: "/packages?type=Family", icon: "👨‍👩‍👧‍👦" },
  { label: "Group Tours", href: "/packages?type=Group Tour", icon: "👥" },
];

export function AdventureCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ViewportReveal>
          <h2 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Adventure Categories</h2>
          <p className="mt-2 text-stone-600">Find trips that match your style.</p>
        </ViewportReveal>
        <StaggerContainer className="mt-10 flex flex-wrap justify-center gap-4" staggerChildren={0.05}>
          {categories.map((c) => (
            <StaggerChild key={c.label}>
              <Link
                href={c.href}
                className="smooth-tap flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-6 py-4 shadow-sm transition-smooth hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="font-semibold text-stone-800">{c.label}</span>
              </Link>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
