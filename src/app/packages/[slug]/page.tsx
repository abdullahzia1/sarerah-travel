import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPackageBySlug } from "@/data/packages";
import { getReviewsForPackage } from "@/data/reviews";
import { formatPricePkr, formatPriceUsd, formatDate } from "@/lib/utils";
import { TourPackageJsonLd } from "@/components/seo/JsonLd";
import { PackageDetailCta } from "./PackageDetailCta";
import { ItineraryRequestForm } from "./ItineraryRequestForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return { title: "Package" };
  return {
    title: pkg.name,
    description: pkg.shortDescription,
    openGraph: {
      title: pkg.name,
      description: pkg.shortDescription,
      images: pkg.images[0] ? [pkg.images[0]] : undefined,
    },
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const reviews = getReviewsForPackage(slug);
  const whatsappMessage = `Hi, I'm interested in ${pkg.name}. Please share details.`;
  const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(whatsappMessage)}`;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarerahtravel.com";

  return (
    <div className="pb-32 md:pb-12">
      <TourPackageJsonLd
        name={pkg.name}
        description={pkg.shortDescription}
        durationDays={pkg.durationDays}
        priceFromPkr={pkg.priceFromPkr}
        image={pkg.images[0] ?? ""}
        url={`${baseUrl}/packages/${pkg.slug}`}
      />
      {/* Hero gallery */}
      <section className="relative h-[50vh] min-h-[300px] bg-stone-200">
        <Image
          src={pkg.images[0] ?? ""}
          alt={pkg.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="overlay-dark absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-10">
          <span className="text-sm font-medium uppercase tracking-wider text-white/90">
            {pkg.destinationName}
          </span>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl md:text-5xl">{pkg.name}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span>{pkg.durationDays} days</span>
            <span>{pkg.difficulty}</span>
            <span>Group: {pkg.groupSize}</span>
            <span>Pickup: {pkg.pickupCity}</span>
            {pkg.rating != null && (
              <span className="flex items-center gap-1">
                ★ {pkg.rating} ({pkg.reviewCount ?? 0} reviews)
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <p className="text-lg text-stone-600">{pkg.description ?? pkg.shortDescription}</p>

            <section>
              <h2 className="font-display text-2xl font-bold text-stone-900">Highlights</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-stone-700">
                    <span className="text-teal-600">✓</span> {h}
                  </li>
                ))}
              </ul>
            </section>

            <section id="itinerary">
              <h2 className="font-display text-2xl font-bold text-stone-900">Itinerary</h2>
              <div className="mt-4 space-y-4">
                {pkg.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm"
                  >
                    <h3 className="font-semibold text-stone-900">Day {day.day}: {day.title}</h3>
                    <p className="mt-1 text-stone-600">{day.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-xl font-bold text-stone-900">Inclusions</h2>
                <ul className="mt-2 list-inside list-disc text-stone-600">
                  {pkg.inclusions.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-stone-900">Exclusions</h2>
                <ul className="mt-2 list-inside list-disc text-stone-600">
                  {pkg.exclusions.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </section>

            {pkg.whatToPack && pkg.whatToPack.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-bold text-stone-900">What to pack</h2>
                <p className="mt-2 text-stone-600">{pkg.whatToPack.join(", ")}</p>
              </section>
            )}

            {(pkg.bestSeason || pkg.weather) && (
              <section>
                <h2 className="font-display text-xl font-bold text-stone-900">Best season & weather</h2>
                <p className="mt-2 text-stone-600">
                  {[pkg.bestSeason, pkg.weather].filter(Boolean).join(" — ")}
                </p>
              </section>
            )}

            {reviews.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-stone-900">Reviews</h2>
                <div className="mt-4 space-y-4">
                  {reviews.slice(0, 3).map((r) => (
                    <blockquote key={r.id} className="rounded-lg border border-stone-200 p-4">
                      <p className="text-stone-700">&ldquo;{r.text}&rdquo;</p>
                      <footer className="mt-2 text-sm text-stone-500">
                        — {r.author}
                        {r.location && `, ${r.location}`} · {formatDate(r.date)}
                      </footer>
                    </blockquote>
                  ))}
                </div>
                <Link href="/reviews" className="mt-2 inline-block text-teal-700 font-medium hover:underline">
                  All reviews →
                </Link>
              </section>
            )}

            <section id="itinerary-request">
              <h2 className="font-display text-2xl font-bold text-stone-900">Request itinerary</h2>
              <p className="mt-2 text-stone-600">
                Get a detailed day-by-day itinerary and quote by email or phone.
              </p>
              <ItineraryRequestForm packageName={pkg.name} packageSlug={pkg.slug} />
            </section>
          </div>

          <div className="lg:col-span-1">
            <aside className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-stone-500">From</p>
                <p className="font-display text-3xl font-bold text-teal-700">
                  {formatPricePkr(pkg.priceFromPkr)}
                </p>
                {pkg.priceFromUsd != null && (
                  <p className="text-stone-600">≈ {formatPriceUsd(pkg.priceFromUsd)} USD</p>
                )}
                {pkg.nextDepartures && pkg.nextDepartures.length > 0 && (
                  <p className="mt-2 text-sm text-stone-500">
                    Next departures: {pkg.nextDepartures.slice(0, 2).map((d) => formatDate(d)).join(", ")}
                  </p>
                )}
                <div className="mt-6 space-y-3">
                  <a
                    href="#itinerary-request"
                    className="flex w-full items-center justify-center rounded-full bg-teal-600 py-3 font-semibold text-white hover:bg-teal-700"
                  >
                    Request itinerary
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-full border border-stone-300 py-3 font-medium text-stone-600 hover:bg-stone-50"
                  >
                    Chat
                  </a>
                  <a
                    href="tel:+923001234567"
                    className="flex w-full items-center justify-center rounded-full border border-stone-300 py-3 font-medium text-stone-600 hover:bg-stone-50"
                  >
                    Call
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <PackageDetailCta packageName={pkg.name} />
      <div className="h-24 md:hidden" aria-hidden />
    </div>
  );
}

