import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "best-time-to-visit-hunza",
    title: "Best Time to Visit Hunza Valley",
    excerpt: "When to go for blossoms, clear skies, and comfortable trekking.",
    content: "Hunza is beautiful year-round, but the most popular times are **spring (March–May)** for apricot blossoms and **autumn (September–November)** for clear views and harvest. Summer is warm and great for road trips; winter can be cold but magical with snow.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    date: "2025-01-10",
    author: "Sarerah Travel",
    tags: ["Hunza", "North Pakistan", "Guides"],
  },
  {
    slug: "k2-base-camp-preparation",
    title: "How to Prepare for K2 Base Camp Trek",
    excerpt: "Fitness, gear, and what to expect on the Baltoro.",
    content: "The K2 Base Camp trek is strenuous. Focus on **cardio and leg strength** months before. Bring **quality trekking boots**, layers for cold, and a good sleeping bag. Acclimatization days are built into our itinerary. Travel insurance with high-altitude cover is essential.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    date: "2024-12-15",
    author: "Sarerah Travel",
    tags: ["Skardu", "Trekking", "K2"],
  },
  {
    slug: "thailand-visa-pakistan",
    title: "Thailand Visa for Pakistani Travelers",
    excerpt: "Visa on arrival and e-visa options explained.",
    content: "Pakistani passport holders can get **visa on arrival** at major Thai airports (e.g. Bangkok) for short stays, or apply for an **e-visa** in advance for a smoother entry. We assist with visa guidance when you book a Thailand package with us.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    date: "2024-11-20",
    author: "Sarerah Travel",
    tags: ["Thailand", "Visa", "International"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
