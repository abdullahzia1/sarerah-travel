import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Trip Planner",
  description: "Get a custom itinerary and quote. Tell us your destination, dates, and preferences — we'll reply within 24 hours.",
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return children;
}