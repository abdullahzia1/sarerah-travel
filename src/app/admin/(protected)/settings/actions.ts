"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-session";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

function jsonArray<T>(value: FormDataEntryValue | null): T[] {
  try {
    const parsed = JSON.parse(String(value ?? "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function updateSiteSettings(formData: FormData) {
  await requireAdminSession();
  const supabase = getSupabaseAdminClient();

  const whatsappNumber = String(formData.get("whatsappNumber") ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? "").trim();
  const trustBadges = jsonArray<{ label: string; sublabel?: string }>(formData.get("trustBadges"));

  const { error } = await supabase.from("site_settings").upsert(
    [
      { key: "whatsapp_number", value: whatsappNumber },
      { key: "contact_email", value: contactEmail },
      { key: "trust_badges", value: trustBadges },
    ],
    { onConflict: "key" }
  );
  if (error) throw new Error(error.message);

  revalidatePath("/", "layout");
  redirect("/admin/settings");
}
