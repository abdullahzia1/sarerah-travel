import { getGoogleReviews } from "@/lib/google-reviews";
import type { Review } from "@/types";

export async function getAllReviews(): Promise<Review[]> {
  const { reviews } = await getGoogleReviews();
  return reviews;
}

export async function getRecentReviews(limit = 6): Promise<Review[]> {
  const { reviews } = await getGoogleReviews();
  return reviews.slice(0, limit);
}
