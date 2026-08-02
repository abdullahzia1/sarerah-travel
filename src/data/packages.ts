import { getSupabaseClient } from "@/lib/supabase/client";
import type { Package, PackageItineraryDay, PackageType } from "@/types";

interface PackageRow {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string | null;
  type: string[];
  duration_days: number;
  difficulty: Package["difficulty"];
  group_size: string | null;
  pickup_city: string | null;
  price_from_pkr: number;
  price_from_usd: number | null;
  currency: "PKR" | "USD" | null;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  next_departures: string[];
  rating: number | null;
  review_count: number | null;
  tags: string[];
  map_embed_url: string | null;
  what_to_pack: string[];
  best_season: string | null;
  weather: string | null;
  is_featured: boolean;
  destinations: { slug: string; name: string } | null;
}

const PACKAGE_SELECT = "*, destinations(slug, name)";

async function getItinerariesAndImages(packageIds: string[]) {
  const itineraryMap = new Map<string, PackageItineraryDay[]>();
  const imageMap = new Map<string, string[]>();
  if (packageIds.length === 0) return { itineraryMap, imageMap };

  const supabase = getSupabaseClient();
  const [{ data: itineraryRows }, { data: imageRows }] = await Promise.all([
    supabase
      .from("package_itineraries")
      .select("*")
      .in("package_id", packageIds)
      .order("sort_order")
      .order("day"),
    supabase.from("package_images").select("*").in("package_id", packageIds).order("sort_order"),
  ]);

  for (const row of itineraryRows ?? []) {
    const list = itineraryMap.get(row.package_id) ?? [];
    list.push({ id: row.id, day: row.day, title: row.title, description: row.description ?? "" });
    itineraryMap.set(row.package_id, list);
  }
  for (const row of imageRows ?? []) {
    const list = imageMap.get(row.package_id) ?? [];
    list.push(row.url);
    imageMap.set(row.package_id, list);
  }
  return { itineraryMap, imageMap };
}

function mapPackage(row: PackageRow, itinerary: PackageItineraryDay[], images: string[]): Package {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description ?? undefined,
    destinationSlug: row.destinations?.slug ?? "",
    destinationName: row.destinations?.name ?? "",
    type: (row.type ?? []) as PackageType[],
    durationDays: row.duration_days,
    difficulty: row.difficulty,
    groupSize: row.group_size ?? "",
    pickupCity: row.pickup_city ?? "",
    priceFromPkr: row.price_from_pkr,
    priceFromUsd: row.price_from_usd ?? undefined,
    currency: row.currency ?? undefined,
    images,
    highlights: row.highlights ?? [],
    itinerary,
    inclusions: row.inclusions ?? [],
    exclusions: row.exclusions ?? [],
    nextDepartures: row.next_departures ?? undefined,
    rating: row.rating ?? undefined,
    reviewCount: row.review_count ?? undefined,
    tags: row.tags ?? undefined,
    mapEmbedUrl: row.map_embed_url ?? undefined,
    whatToPack: row.what_to_pack ?? undefined,
    bestSeason: row.best_season ?? undefined,
    weather: row.weather ?? undefined,
    isFeatured: row.is_featured,
  };
}

async function mapPackageRows(data: PackageRow[]): Promise<Package[]> {
  const { itineraryMap, imageMap } = await getItinerariesAndImages(data.map((p) => p.id));
  return data.map((row) => mapPackage(row, itineraryMap.get(row.id) ?? [], imageMap.get(row.id) ?? []));
}

export async function getAllPackages(): Promise<Package[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("packages").select(PACKAGE_SELECT).order("name");
  if (error || !data) return [];
  return mapPackageRows(data as unknown as PackageRow[]);
}

export async function getPackageBySlug(slug: string): Promise<Package | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("packages").select(PACKAGE_SELECT).eq("slug", slug).maybeSingle();
  if (error || !data) return undefined;
  const [pkg] = await mapPackageRows([data as unknown as PackageRow]);
  return pkg;
}

export async function getPackagesByDestination(destinationSlug: string): Promise<Package[]> {
  const supabase = getSupabaseClient();
  const { data: dest } = await supabase.from("destinations").select("id").eq("slug", destinationSlug).maybeSingle();
  if (!dest) return [];
  const { data, error } = await supabase
    .from("packages")
    .select(PACKAGE_SELECT)
    .eq("destination_id", dest.id)
    .order("name");
  if (error || !data) return [];
  return mapPackageRows(data as unknown as PackageRow[]);
}

export async function getFeaturedPackages(limit = 6): Promise<Package[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("packages")
    .select(PACKAGE_SELECT)
    .order("is_featured", { ascending: false })
    .order("rating", { ascending: false, nullsFirst: false })
    .limit(limit);
  if (error || !data) return [];
  return mapPackageRows(data as unknown as PackageRow[]);
}
