import "server-only";

export interface GoogleReviewRaw {
  author: string;
  rating: number;
  text: string;
  time: number; // unix seconds -- stable across fetches, used as a de-dupe key
  date: string; // ISO
  avatar?: string;
}

export interface GooglePlaceData {
  rating: number;
  reviewCount: number;
  reviews: GoogleReviewRaw[];
}

interface GooglePlaceDetailsReview {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time: number;
}

interface GooglePlaceDetailsResponse {
  status: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: GooglePlaceDetailsReview[];
  };
}

const FALLBACK: GooglePlaceData = { rating: 0, reviewCount: 0, reviews: [] };

/**
 * Fetches the business's Google rating and up to 5 reviews via the Places
 * API (legacy) Place Details endpoint. Google's terms cap this at 5
 * "most relevant" reviews chosen by their algorithm -- there is no way to
 * fetch more, filter, or sort them. Only called from the weekly sync job
 * (src/lib/reviews-sync.ts) or its manual admin trigger, never on public
 * page renders. Requires GOOGLE_PLACES_API_KEY and GOOGLE_PLACES_PLACE_ID.
 */
export async function fetchGooglePlaceData(): Promise<GooglePlaceData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;
  if (!apiKey || !placeId) return FALLBACK;

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "rating,user_ratings_total,reviews");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return FALLBACK;

    const data: GooglePlaceDetailsResponse = await res.json();
    if (data.status !== "OK" || !data.result) return FALLBACK;

    const reviews: GoogleReviewRaw[] = (data.result.reviews ?? []).map((r) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.time,
      date: new Date(r.time * 1000).toISOString(),
      avatar: r.profile_photo_url,
    }));

    return {
      rating: data.result.rating ?? 0,
      reviewCount: data.result.user_ratings_total ?? 0,
      reviews,
    };
  } catch {
    return FALLBACK;
  }
}
