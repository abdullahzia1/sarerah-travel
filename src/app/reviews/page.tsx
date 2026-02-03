import { reviews } from "@/data/reviews";
import { reviewHighlight } from "@/data/trust";
import type { Metadata } from "next";
import { ReviewsContent } from "./ReviewsContent";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Read what travelers say about Sarerah Travel. Real reviews from Hunza, Skardu, Thailand, and more.",
};

export default function ReviewsPage() {
  return (
    <div className="pb-24 md:pb-12">
      <ReviewsContent
        reviews={reviews}
        rating={reviewHighlight.rating}
        count={reviewHighlight.count}
        source={reviewHighlight.source}
      />
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
