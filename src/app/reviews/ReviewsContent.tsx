"use client";

import { StaggerContainer, StaggerChild, ViewportReveal } from "@/components/ui/animations";
import { formatDate } from "@/lib/utils";
import type { Review } from "@/types";

interface ReviewsContentProps {
  reviews: Review[];
  rating: string;
  count: string;
  source: string;
}

export function ReviewsContent({ reviews, rating, count, source }: ReviewsContentProps) {
  return (
    <>
      <div className="border-b border-stone-200 bg-white py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ViewportReveal>
            <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Traveler Reviews</h1>
            <p className="mt-2 text-stone-600">Real feedback from people who traveled with us.</p>
            <ViewportReveal delay={0.1} className="mt-6">
              <div className="flex items-center gap-4 rounded-xl bg-amber-50 px-6 py-4 transition-smooth hover:shadow-md">
                <span className="font-display text-3xl font-bold text-stone-900">{rating}</span>
                <div>
                  <p className="font-medium text-stone-800">Rated excellent</p>
                  <p className="text-sm text-stone-600">{count}+ reviews · {source}</p>
                </div>
              </div>
            </ViewportReveal>
          </ViewportReveal>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <StaggerContainer className="space-y-8" staggerChildren={0.06}>
          {reviews.map((r) => (
            <StaggerChild key={r.id}>
              <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-smooth hover:-translate-y-0.5 hover:shadow-md md:p-8">
                <div className="flex gap-1 text-amber-500" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} aria-hidden className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-lg text-stone-700">&ldquo;{r.text}&rdquo;</p>
                <footer className="mt-4 flex flex-wrap items-center gap-2 text-sm text-stone-500">
                  <strong className="text-stone-800">{r.author}</strong>
                  {r.location && <span>{r.location}</span>}
                  <span>·</span>
                  <time dateTime={r.date}>{formatDate(r.date)}</time>
                </footer>
              </article>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>
    </>
  );
}
