"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPricePkr } from "@/lib/utils";
import { getPackageWhatsAppMessage } from "@/lib/whatsapp";
import type { Package } from "@/types";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230d9488'/%3E%3Cstop offset='100%25' style='stop-color:%230f766e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='400' height='300'/%3E%3Cpath fill='%23fff' fill-opacity='0.2' d='M200 120c-22 0-40 18-40 40s18 40 40 40 40-18 40-40-18-40-40-40zm0 65c-14 0-25-11-25-25s11-25 25-25 25 11 25 25-11 25-25 25z'/%3E%3C/svg%3E";

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  const [imgError, setImgError] = useState(false);
  const whatsappMessage = getPackageWhatsAppMessage(pkg.name);
  const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(whatsappMessage)}`;
  const imageSrc = pkg.images?.[0];
  const useFallback = !imageSrc || imgError;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-smooth hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/packages/${pkg.slug}`} className="relative block aspect-[4/3] shrink-0 overflow-hidden bg-stone-200">
        {useFallback ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${FALLBACK_IMAGE})` }}
          />
        ) : (
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
        <div className="overlay-card absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <span className="text-xs font-medium uppercase tracking-wider opacity-90">{pkg.destinationName}</span>
          {pkg.tags && pkg.tags.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {pkg.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="rounded bg-white/20 px-2 py-0.5 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {pkg.rating != null && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-sm font-medium text-stone-800 shadow-sm">
            <StarIcon className="h-4 w-4 text-amber-500" />
            {pkg.rating}
            {pkg.reviewCount != null && (
              <span className="text-xs text-stone-500">({pkg.reviewCount})</span>
            )}
          </div>
        )}
      </Link>
      <div className="flex min-h-0 flex-1 flex-col p-4">
        <h2 className="min-h-[2.75rem] font-display text-lg font-semibold leading-tight text-stone-900 line-clamp-2">
          <Link href={`/packages/${pkg.slug}`} className="transition-smooth hover:text-teal-700">
            {pkg.name}
          </Link>
        </h2>
        <p className="mt-2 min-h-[2.5rem] line-clamp-2 text-sm leading-snug text-stone-600">{pkg.shortDescription}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-500">
          <span>{pkg.durationDays} days</span>
          <span>·</span>
          <span>{pkg.difficulty}</span>
          <span>·</span>
          <span>From {pkg.pickupCity}</span>
        </div>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
          <div>
            <span className="text-xs text-stone-500">From</span>
            <p className="font-display text-xl font-bold text-teal-700">{formatPricePkr(pkg.priceFromPkr)}</p>
            {pkg.priceFromUsd != null && (
              <p className="text-xs text-stone-500">≈ ${pkg.priceFromUsd} USD</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/packages/${pkg.slug}#itinerary-request`}
              className="smooth-tap inline-flex min-h-[44px] items-center rounded-full bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-smooth hover:bg-teal-700 hover:shadow-md"
            >
              Request itinerary
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="smooth-tap inline-flex min-h-[44px] items-center rounded-full border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-600 transition-smooth hover:bg-stone-50"
            >
              Chat
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

