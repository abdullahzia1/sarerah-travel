import type { MetadataRoute } from "next";
import { getAllPackages } from "@/data/packages";
import { getAllDestinations } from "@/data/destinations";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarerahtravel.com";

// Reads live Supabase data -- don't attempt to generate this at build time.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, destinations] = await Promise.all([getAllPackages(), getAllDestinations()]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/packages`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/destinations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/plan`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const packagePages: MetadataRoute.Sitemap = packages.map((p) => ({
    url: `${BASE}/packages/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const destinationPages: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${BASE}/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...packagePages, ...destinationPages];
}
