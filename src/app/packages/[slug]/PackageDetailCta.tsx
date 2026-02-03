"use client";

export function PackageDetailCta({ packageName }: { packageName: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 hidden border-t border-stone-200 bg-white/95 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <p className="font-semibold text-stone-900">Ready to book?</p>
        <div className="flex gap-3">
          <a
            href="#itinerary-request"
            className="inline-flex items-center rounded-full bg-teal-600 px-5 py-2.5 font-semibold text-white hover:bg-teal-700"
          >
            Request itinerary
          </a>
          <a
            href="tel:+923001234567"
            className="inline-flex items-center rounded-full border border-stone-300 px-5 py-2.5 font-medium text-stone-700 hover:bg-stone-50"
          >
            Request callback
          </a>
        </div>
      </div>
    </div>
  );
}
