import type { Metadata } from "next";
import { AboutContent } from "@/app/about/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Sarerah Travel is a Pakistan-based travel agency specializing in North Pakistan and Asia. Licensed, experienced guides, no hidden charges.",
};

export default function AboutPage() {
  return (
    <div className="pb-24 md:pb-12">
      <AboutContent />
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
