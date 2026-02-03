import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "1",
    author: "Ayesha K.",
    location: "Lahore",
    rating: 5,
    text: "Our Hunza trip was beyond expectations. The guide was knowledgeable, accommodation was clean, and we felt safe throughout. WhatsApp coordination was seamless. Will definitely book again for Skardu!",
    date: "2025-01-15",
    packageSlug: "hunza-skillet-7d",
  },
  {
    id: "2",
    author: "Ahmed R.",
    location: "Karachi",
    rating: 5,
    text: "K2 Base Camp was a dream. Tough trek but the team made it manageable. No hidden charges — everything was as promised. Highly recommend for serious trekkers.",
    date: "2024-12-01",
    packageSlug: "skardu-k2-base-camp",
  },
  {
    id: "3",
    author: "Sara & Omar",
    location: "Islamabad",
    rating: 5,
    text: "Honeymoon in Thailand was perfect. They handled visa guidance and all transfers. Beach resort was stunning. Great value for what we got.",
    date: "2025-01-08",
    packageSlug: "thailand-honeymoon-6d",
  },
  {
    id: "4",
    author: "Bilal H.",
    location: "Rawalpindi",
    rating: 4,
    text: "Naran Kaghan 5-day tour was great for the family. Kids loved Saif ul Malook. Only minor issue was one hotel had limited hot water — but overall excellent.",
    date: "2024-11-20",
    packageSlug: "naran-kaghan-5d",
  },
  {
    id: "5",
    author: "Fatima M.",
    location: "Dubai (ex-Pakistan)",
    rating: 5,
    text: "Booked Sri Lanka circle tour from abroad. Communication via WhatsApp was smooth. Driver was professional, hotels were good. No surprises — transparent pricing.",
    date: "2024-12-18",
    packageSlug: "sri-lanka-circle-8d",
  },
  {
    id: "6",
    author: "Usman T.",
    location: "Faisalabad",
    rating: 5,
    text: "Fairy Meadows trek — unforgettable. Nanga Parbat at sunrise is something else. Team was experienced and safety-conscious. Worth every rupee.",
    date: "2024-10-05",
    packageSlug: "fairy-meadows-trek",
  },
];

export function getReviewsForPackage(packageSlug: string): Review[] {
  return reviews.filter((r) => r.packageSlug === packageSlug);
}

export function getRecentReviews(limit = 6): Review[] {
  return [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
