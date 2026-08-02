"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-session";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

function linesToArray(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function jsonArray<T>(value: FormDataEntryValue | null): T[] {
  try {
    const parsed = JSON.parse(String(value ?? "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function packageFromForm(formData: FormData) {
  const type = formData.getAll("type").map(String);
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    short_description: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    destination_id: String(formData.get("destinationId") ?? ""),
    type,
    duration_days: Number(formData.get("durationDays") ?? 0),
    difficulty: String(formData.get("difficulty") ?? "Easy"),
    group_size: String(formData.get("groupSize") ?? "").trim() || null,
    pickup_city: String(formData.get("pickupCity") ?? "").trim() || null,
    price_from_pkr: Number(formData.get("priceFromPkr") ?? 0),
    price_from_usd: formData.get("priceFromUsd") ? Number(formData.get("priceFromUsd")) : null,
    currency: String(formData.get("currency") ?? "PKR"),
    highlights: linesToArray(formData.get("highlights")),
    inclusions: linesToArray(formData.get("inclusions")),
    exclusions: linesToArray(formData.get("exclusions")),
    next_departures: linesToArray(formData.get("nextDepartures")),
    tags: linesToArray(formData.get("tags")),
    what_to_pack: linesToArray(formData.get("whatToPack")),
    map_embed_url: String(formData.get("mapEmbedUrl") ?? "").trim() || null,
    best_season: String(formData.get("bestSeason") ?? "").trim() || null,
    weather: String(formData.get("weather") ?? "").trim() || null,
    is_featured: formData.get("isFeatured") === "on",
  };
}

async function saveItineraryAndImages(packageId: string, formData: FormData) {
  const supabase = getSupabaseAdminClient();
  const itinerary = jsonArray<{ day: number; title: string; description: string }>(formData.get("itinerary"));
  const images = jsonArray<{ url: string; alt?: string }>(formData.get("images"));

  await supabase.from("package_itineraries").delete().eq("package_id", packageId);
  if (itinerary.length > 0) {
    const { error } = await supabase.from("package_itineraries").insert(
      itinerary.map((day, i) => ({
        package_id: packageId,
        day: day.day,
        title: day.title,
        description: day.description,
        sort_order: i,
      }))
    );
    if (error) throw new Error(error.message);
  }

  await supabase.from("package_images").delete().eq("package_id", packageId);
  if (images.length > 0) {
    const { error } = await supabase.from("package_images").insert(
      images.map((img, i) => ({ package_id: packageId, url: img.url, alt: img.alt || null, sort_order: i }))
    );
    if (error) throw new Error(error.message);
  }
}

function revalidatePackagePaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/packages");
  revalidatePath("/destinations");
  if (slug) revalidatePath(`/packages/${slug}`);
}

export async function createPackage(formData: FormData) {
  await requireAdminSession();
  const supabase = getSupabaseAdminClient();
  const values = packageFromForm(formData);
  const { data, error } = await supabase.from("packages").insert(values).select("id").single();
  if (error) throw new Error(error.message);
  await saveItineraryAndImages(data.id, formData);
  revalidatePackagePaths(values.slug);
  redirect("/admin/packages");
}

export async function updatePackage(id: string, formData: FormData) {
  await requireAdminSession();
  const supabase = getSupabaseAdminClient();
  const values = packageFromForm(formData);
  const { error } = await supabase.from("packages").update(values).eq("id", id);
  if (error) throw new Error(error.message);
  await saveItineraryAndImages(id, formData);
  revalidatePackagePaths(values.slug);
  redirect("/admin/packages");
}

export async function deletePackage(id: string) {
  await requireAdminSession();
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("packages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePackagePaths();
  redirect("/admin/packages");
}
