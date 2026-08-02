import { getSupabaseClient } from "@/lib/supabase/client";
import type { Review } from "@/types";

interface ReviewRow {
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar_url: string | null;
}

function mapReview(row: ReviewRow): Review {
  return {
    author: row.author,
    rating: row.rating,
    text: row.text,
    date: row.date,
    avatar: row.avatar_url ?? undefined,
  };
}

const REVIEW_COLUMNS = "author, rating, text, date, avatar_url";

/** RLS restricts this to non-hidden rows -- no manual filtering needed. */
export async function getAllReviews(): Promise<Review[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("reviews").select(REVIEW_COLUMNS).order("date", { ascending: false });
  if (error || !data) return [];
  return data.map(mapReview);
}

export async function getRecentReviews(limit = 6): Promise<Review[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("reviews")
    .select(REVIEW_COLUMNS)
    .order("date", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map(mapReview);
}

export interface GoogleRatingCache {
  rating: number;
  reviewCount: number;
  syncedAt: string | null;
}

const DEFAULT_RATING_CACHE: GoogleRatingCache = { rating: 0, reviewCount: 0, syncedAt: null };

/** Cached by the weekly sync job -- never calls the Google API directly. */
export async function getCachedGoogleRating(): Promise<GoogleRatingCache> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "google_rating_cache")
      .maybeSingle();
    if (error || !data) return DEFAULT_RATING_CACHE;
    return data.value as GoogleRatingCache;
  } catch {
    return DEFAULT_RATING_CACHE;
  }
}
