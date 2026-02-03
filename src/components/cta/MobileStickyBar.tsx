"use client";

import Link from "next/link";

export function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-2 border-t border-stone-200 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden safe-bottom">
      <Link
        href="/plan"
        className="smooth-tap flex flex-1 items-center justify-center rounded-full bg-teal-600 py-3 text-sm font-semibold text-white transition-smooth active:scale-[0.98]"
      >
        Plan trip
      </Link>
      <a
        href="tel:+923001234567"
        className="smooth-tap flex flex-1 items-center justify-center rounded-full border border-stone-300 bg-white py-3 text-sm font-medium text-stone-700 transition-smooth active:scale-[0.98]"
      >
        Call
      </a>
      <a
        href="https://wa.me/923001234567"
        target="_blank"
        rel="noopener noreferrer"
        className="smooth-tap flex flex-1 items-center justify-center rounded-full border border-stone-300 bg-white py-3 text-sm font-medium text-stone-700 transition-smooth active:scale-[0.98]"
      >
        Chat
      </a>
    </div>
  );
}

