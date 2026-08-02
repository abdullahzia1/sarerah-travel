import { getSupabaseClient } from "@/lib/supabase/client";
import type { Destination } from "@/types";

interface DestinationRow {
  id: string;
  slug: string;
  name: string;
  region: "North Pakistan" | "International";
  short_description: string;
  description: string;
  image_url: string;
  image_alt: string | null;
  highlights: string[];
  best_season: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

function mapDestination(row: DestinationRow, packageSlugs: string[]): Destination {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    region: row.region,
    shortDescription: row.short_description,
    description: row.description,
    image: row.image_url,
    imageAlt: row.image_alt ?? undefined,
    highlights: row.highlights ?? [],
    bestSeason: row.best_season ?? "",
    packages: packageSlugs,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
  };
}

async function getPackageSlugsByDestination(destinationIds: string[]): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  if (destinationIds.length === 0) return map;
  const supabase = getSupabaseClient();
  const { data } = await supabase.from("packages").select("slug, destination_id").in("destination_id", destinationIds);
  for (const row of data ?? []) {
    const list = map.get(row.destination_id) ?? [];
    list.push(row.slug);
    map.set(row.destination_id, list);
  }
  return map;
}

export async function getAllDestinations(): Promise<Destination[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("destinations").select("*").order("name");
  if (error || !data) return [];
  const slugMap = await getPackageSlugsByDestination(data.map((d) => d.id));
  return data.map((row) => mapDestination(row, slugMap.get(row.id) ?? []));
}

export async function getDestinationBySlug(slug: string): Promise<Destination | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("destinations").select("*").eq("slug", slug).maybeSingle();
  if (error || !data) return undefined;
  const slugMap = await getPackageSlugsByDestination([data.id]);
  return mapDestination(data, slugMap.get(data.id) ?? []);
}
