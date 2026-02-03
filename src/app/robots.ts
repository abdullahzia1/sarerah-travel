import type { MetadataRoute } from "next";

const BASE = "https://sarerahtravel.com"; // Replace with your domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
