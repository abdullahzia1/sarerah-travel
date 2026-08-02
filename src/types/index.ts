export type DestinationSlug =
  | "hunza"
  | "skardu"
  | "naran"
  | "fairy-meadows"
  | "thailand"
  | "malaysia"
  | "sri-lanka"
  | "nepal"
  | "azerbaijan";

export type PackageType = "Adventure" | "Family" | "Honeymoon" | "Trekking" | "Road Trip" | "Group Tour";

export interface Destination {
  id: string;
  slug: DestinationSlug | string;
  name: string;
  region: "North Pakistan" | "International";
  shortDescription: string;
  description: string;
  image: string;
  imageAlt?: string;
  highlights: string[];
  bestSeason: string;
  packages: string[]; // package slugs
  seoTitle?: string;
  seoDescription?: string;
}

export interface PackageItineraryDay {
  id?: string;
  day: number;
  title: string;
  description: string;
}

export interface PackageImage {
  id?: string;
  url: string;
  alt?: string;
  sortOrder?: number;
}

export interface Package {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description?: string;
  destinationSlug: DestinationSlug | string;
  destinationName: string;
  type: PackageType[];
  durationDays: number;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Strenuous";
  groupSize: string;
  pickupCity: string;
  priceFromPkr: number;
  priceFromUsd?: number;
  currency?: "PKR" | "USD";
  images: string[];
  highlights: string[];
  itinerary: PackageItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  nextDepartures?: string[];
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  mapEmbedUrl?: string;
  whatToPack?: string[];
  bestSeason?: string;
  weather?: string;
  isFeatured?: boolean;
}

/** Sourced live from Google Places -- not stored in our database. */
export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  destination?: string;
  package?: string;
  budget?: string;
  dates?: string;
  travelers?: string;
  message?: string;
  sourcePage: string;
  timestamp: string;
}

export interface TrustBadge {
  label: string;
  sublabel?: string;
  icon?: string;
}

export interface SiteSettings {
  trustBadges: TrustBadge[];
  whatsappNumber: string;
  contactEmail: string;
}
