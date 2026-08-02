import "server-only";
import type { Review } from "@/types";

interface GooglePlaceReviews {
  rating: number;
  reviewCount: number;
  reviews: Review[];
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

const FALLBACK: GooglePlaceReviews = { rating: 0, reviewCount: 0, reviews: [] };

/**
 * Fetches the business's Google rating and up to 5 reviews via the Places
 * API (legacy) Place Details endpoint. Google's terms cap this at 5
 * "most relevant" reviews chosen by their algorithm -- there is no way to
 * fetch more, filter, or sort them. Requires GOOGLE_PLACES_API_KEY and
 * GOOGLE_PLACES_PLACE_ID; returns an empty result if either is missing so
 * the site still renders (with no reviews shown) before setup is complete.
 */
export async function getGoogleReviews(): Promise<GooglePlaceReviews> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID;
  if (!apiKey || !placeId) return FALLBACK;

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "rating,user_ratings_total,reviews");
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) return FALLBACK;

    const data: GooglePlaceDetailsResponse = await res.json();
    if (data.status !== "OK" || !data.result) return FALLBACK;

    const reviews: Review[] = (data.result.reviews ?? []).map((r) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
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
