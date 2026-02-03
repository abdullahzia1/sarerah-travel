import { blogPosts } from "@/data/blog";
import type { Metadata } from "next";
import { BlogContent } from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog & Travel Guides",
  description: "Travel tips, destination guides, and trip planning advice for North Pakistan and Asia.",
};

export default function BlogPage() {
  return (
    <div className="pb-24 md:pb-12">
      <BlogContent posts={blogPosts} />
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
