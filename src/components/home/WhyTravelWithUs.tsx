"use client";

import { StaggerContainer, StaggerChild, ViewportReveal } from "@/components/ui/animations";

const benefits = [
  {
    title: "Licensed & insured",
    description: "Fully registered travel company with proper permits for northern areas and international tours.",
    icon: "✓",
  },
  {
    title: "Expert local guides",
    description: "Every trip is led by experienced, knowledgeable guides who know the terrain and culture.",
    icon: "🧭",
  },
  {
    title: "No hidden charges",
    description: "Transparent pricing. What we quote is what you pay — no surprise fees on the road.",
    icon: "💰",
  },
  {
    title: "Support throughout",
    description: "From the moment you inquire until you return home, we're available on WhatsApp.",
    icon: "📱",
  },
  {
    title: "Small groups",
    description: "Comfortable group sizes so you get a personal experience, not a cattle run.",
    icon: "👥",
  },
  {
    title: "Best value",
    description: "Premium experiences at fair prices — luxury adventure without the luxury markup.",
    icon: "⭐",
  },
];

export function WhyTravelWithUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ViewportReveal>
          <h2 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Why Travel With Us</h2>
          <p className="mt-2 max-w-2xl text-stone-600">
            We combine professional operations with a personal touch so your trip is smooth and memorable.
          </p>
        </ViewportReveal>
        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
          {benefits.map((b) => (
            <StaggerChild key={b.title}>
              <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-smooth hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-lg text-teal-700">
                  {b.icon}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-stone-900">{b.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{b.description}</p>
              </div>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
