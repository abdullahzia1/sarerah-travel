import { getSupabaseClient } from "@/lib/supabase/client";
import type { SiteSettings } from "@/types";

const DEFAULT_SETTINGS: SiteSettings = {
  trustBadges: [
    { label: "Licensed", sublabel: "Registered travel company" },
    { label: "Experienced Guides", sublabel: "Local experts on every trip" },
    { label: "Thousands Served", sublabel: "Happy travelers since 2018" },
    { label: "No Hidden Charges", sublabel: "Transparent pricing" },
    { label: "Support Throughout", sublabel: "From booking to return" },
  ],
  whatsappNumber: "92355569982",
  contactEmail: "hello@sarerahtravel.com",
};

/** Falls back to sane defaults if Supabase isn't reachable or unseeded yet. */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("site_settings").select("key, value");
    if (error || !data) return DEFAULT_SETTINGS;

    const map = new Map<string, unknown>(data.map((row) => [row.key, row.value]));
    return {
      trustBadges: (map.get("trust_badges") as SiteSettings["trustBadges"]) ?? DEFAULT_SETTINGS.trustBadges,
      whatsappNumber: (map.get("whatsapp_number") as string) ?? DEFAULT_SETTINGS.whatsappNumber,
      contactEmail: (map.get("contact_email") as string) ?? DEFAULT_SETTINGS.contactEmail,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}
