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

function destinationFromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    region: String(formData.get("region") ?? "North Pakistan"),
    short_description: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    image_url: String(formData.get("image") ?? "").trim(),
    image_alt: String(formData.get("imageAlt") ?? "").trim() || null,
    highlights: linesToArray(formData.get("highlights")),
    best_season: String(formData.get("bestSeason") ?? "").trim() || null,
    seo_title: String(formData.get("seoTitle") ?? "").trim() || null,
    seo_description: String(formData.get("seoDescription") ?? "").trim() || null,
  };
}

function revalidateDestinationPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/destinations");
  revalidatePath("/packages");
  if (slug) revalidatePath(`/destinations/${slug}`);
}

export async function createDestination(formData: FormData) {
  await requireAdminSession();
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("destinations").insert(destinationFromForm(formData));
  if (error) throw new Error(error.message);
  revalidateDestinationPaths();
  redirect("/admin/destinations");
}

export async function updateDestination(id: string, formData: FormData) {
  await requireAdminSession();
  const supabase = getSupabaseAdminClient();
  const values = destinationFromForm(formData);
  const { error } = await supabase.from("destinations").update(values).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateDestinationPaths(values.slug);
  redirect("/admin/destinations");
}

export async function deleteDestination(id: string) {
  await requireAdminSession();
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("destinations").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateDestinationPaths();
  redirect("/admin/destinations");
}
