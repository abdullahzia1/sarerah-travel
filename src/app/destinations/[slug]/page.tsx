import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getDestinationBySlug } from "@/data/destinations";
import { getPackagesByDestination } from "@/data/packages";
import { DestinationDetailContent } from "./DestinationDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return { title: "Destination" };
  return {
    title: dest.seoTitle ?? `${dest.name} Tour Packages`,
    description: dest.seoDescription ?? dest.shortDescription,
    openGraph: {
      title: dest.seoTitle ?? dest.name,
      description: dest.seoDescription ?? dest.shortDescription,
      images: dest.image ? [dest.image] : undefined,
    },
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const packages = getPackagesByDestination(slug);
  const whatsappMessage = `Hi, I'm interested in ${dest.name}. Please share details.`;
  const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pb-24 md:pb-12">
      <section className="relative h-[50vh] min-h-[320px] bg-stone-200 md:min-h-[380px]">
        <Image
          src={dest.image}
          alt={dest.imageAlt ?? dest.name}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="overlay-dark absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-10">
          <span className="text-sm font-medium uppercase tracking-wider text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
            {dest.region}
          </span>
          <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl md:text-5xl [text-shadow:0_2px_8px_rgba(0,0,0,0.4),0_4px_16px_rgba(0,0,0,0.3)]">
            {dest.name}
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-white/95 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
            {dest.shortDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/plan"
              className="smooth-tap inline-flex items-center rounded-full bg-white px-5 py-2.5 font-semibold text-stone-900 shadow-lg transition-smooth hover:bg-stone-100 hover:shadow-xl"
            >
              Plan custom trip
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="smooth-tap inline-flex items-center rounded-full border-2 border-white/90 bg-white/10 px-5 py-2.5 font-medium text-white backdrop-blur transition-smooth hover:bg-white/20"
            >
              Chat
            </a>
          </div>
        </div>
      </section>

      <DestinationDetailContent dest={dest} packages={packages} whatsappUrl={whatsappUrl} />

      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
