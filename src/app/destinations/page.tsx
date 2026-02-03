import Link from "next/link";
import { destinations } from "@/data/destinations";
import { DestinationTile } from "@/components/destinations/DestinationTile";

export const metadata = {
  title: "Destinations",
  description:
    "Explore North Pakistan (Hunza, Skardu, Naran, Fairy Meadows) and international destinations: Thailand, Malaysia, Sri Lanka, Nepal, Azerbaijan.",
};

export default function DestinationsPage() {
  const northPakistan = destinations.filter((d) => d.region === "North Pakistan");
  const international = destinations.filter((d) => d.region === "International");

  return (
    <div className="pb-24 md:pb-12">
      <div className="border-b border-stone-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Destinations</h1>
          <p className="mt-2 max-w-2xl text-stone-600">
            North Pakistan&apos;s finest valleys and hand-picked international trips.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section>
          <h2 className="mb-6 font-display text-xl font-semibold text-stone-900">North Pakistan</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {northPakistan.map((d) => (
              <DestinationTile key={d.slug} destination={d} />
            ))}
          </div>
        </section>
        <section className="mt-14">
          <h2 className="mb-6 font-display text-xl font-semibold text-stone-900">International</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {international.map((d) => (
              <DestinationTile key={d.slug} destination={d} />
            ))}
          </div>
        </section>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
