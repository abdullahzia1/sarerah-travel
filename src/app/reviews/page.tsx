import { getGoogleReviews } from "@/lib/google-reviews";
import type { Metadata } from "next";
import { ReviewsContent } from "./ReviewsContent";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read what travelers say about Sarerah Travel. Real reviews from Hunza, Skardu, Thailand, and more.",
};

export default async function ReviewsPage() {
  const { reviews, rating, reviewCount } = await getGoogleReviews();

  return (
    <div className="pb-24 md:pb-12">
      <ReviewsContent reviews={reviews} rating={rating} count={reviewCount} source="Google" />
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
