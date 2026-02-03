import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/types";

interface DestinationTileProps {
  destination: Destination;
  size?: "default" | "large";
}

export function DestinationTile({ destination, size = "default" }: DestinationTileProps) {
  const isLarge = size === "large";

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-stone-200 bg-stone-100 shadow-sm transition-smooth hover:-translate-y-1 hover:shadow-xl"
    >
      <div className={isLarge ? "aspect-[3/2]" : "aspect-[4/3]"}>
        <Image
          src={destination.image}
          alt={destination.imageAlt ?? destination.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        />
        <div className="overlay-dark absolute inset-0" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
          <span className="text-xs font-medium uppercase tracking-wider text-white/80">{destination.region}</span>
          <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">{destination.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/90">{destination.shortDescription}</p>
          <span className="mt-2 inline-flex items-center text-sm font-medium text-white transition-transform duration-200 group-hover:translate-x-0.5">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}
