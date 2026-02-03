import { trustBadges, reviewHighlight } from "@/data/trust";
import { ViewportReveal } from "@/components/ui/animations";

export function TrustBadges() {
  return (
    <section className="border-b border-stone-200 bg-white py-8">
      <ViewportReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" variant="fadeIn">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center text-center">
              <span className="font-display text-sm font-semibold text-stone-900">{badge.label}</span>
              {badge.sublabel && (
                <span className="mt-0.5 text-xs text-stone-500">{badge.sublabel}</span>
              )}
            </div>
          ))}
          <div className="flex flex-col items-center rounded-lg bg-amber-50 px-4 py-2">
            <div className="flex items-center gap-1">
              <span className="font-display text-lg font-bold text-stone-900">{reviewHighlight.rating}</span>
              <StarIcon className="h-5 w-5 text-amber-500" />
            </div>
            <span className="text-xs text-stone-600">
              {reviewHighlight.count}+ reviews · {reviewHighlight.source}
            </span>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-stone-600">
          No hidden charges · Support throughout your trip
        </p>
      </ViewportReveal>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
