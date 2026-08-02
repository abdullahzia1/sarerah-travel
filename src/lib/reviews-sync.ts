import "server-only";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchGooglePlaceData } from "@/lib/google-reviews";

export interface ReviewsSyncResult {
  ok: boolean;
  count: number;
  error?: string;
}

/**
 * Pulls the latest rating + up to 5 reviews from Google, caches them in the
 * `reviews` table, and drops any cached reviews Google no longer returns
 * (keeps the cache honest with Google's current "most relevant" set). Admin
 * hide/show state is preserved for reviews that persist across syncs.
 * Called by the weekly cron job and the admin "Sync now" button.
 */
export async function syncGoogleReviews(): Promise<ReviewsSyncResult> {
  const { rating, reviewCount, reviews } = await fetchGooglePlaceData();

  if (reviews.length === 0) {
    return {
      ok: false,
      count: 0,
      error: "No reviews returned from Google. Check GOOGLE_PLACES_API_KEY / GOOGLE_PLACES_PLACE_ID.",
    };
  }

  const supabase = getSupabaseAdminClient();

  const rows = reviews.map((r) => ({
    google_key: `${r.author}::${r.time}`,
    author: r.author,
    rating: r.rating,
    text: r.text,
    date: r.date,
    avatar_url: r.avatar ?? null,
    synced_at: new Date().toISOString(),
  }));

  const { error: upsertError } = await supabase
    .from("reviews")
    .upsert(rows, { onConflict: "google_key" });
  if (upsertError) return { ok: false, count: 0, error: upsertError.message };

  const keepKeys = rows.map((r) => r.google_key);
  const { error: pruneError } = await supabase
    .from("reviews")
    .delete()
    .not("google_key", "in", `(${keepKeys.map((k) => `"${k}"`).join(",")})`);
  if (pruneError) return { ok: false, count: rows.length, error: pruneError.message };

  const { error: settingsError } = await supabase.from("site_settings").upsert(
    {
      key: "google_rating_cache",
      value: { rating, reviewCount, syncedAt: new Date().toISOString() },
    },
    { onConflict: "key" }
  );
  if (settingsError) return { ok: false, count: rows.length, error: settingsError.message };

  return { ok: true, count: rows.length };
}
