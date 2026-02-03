"use client";

import Link from "next/link";
import Image from "next/image";
import { StaggerContainer, StaggerChild, ViewportReveal } from "@/components/ui/animations";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface BlogContentProps {
  posts: BlogPost[];
}

export function BlogContent({ posts }: BlogContentProps) {
  return (
    <>
      <div className="border-b border-stone-200 bg-white py-10">
        <ViewportReveal className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-stone-900 sm:text-4xl">Blog & Guides</h1>
          <p className="mt-2 text-stone-600">
            Tips and guides for planning your trip to North Pakistan and beyond.
          </p>
        </ViewportReveal>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <StaggerContainer className="grid gap-8 md:grid-cols-2" staggerChildren={0.07}>
          {posts.map((post) => (
            <StaggerChild key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-smooth hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5">
                  <time className="text-sm text-stone-500" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-2 font-display text-xl font-semibold text-stone-900 transition-colors duration-200 group-hover:text-teal-700">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-stone-600 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            </StaggerChild>
          ))}
        </StaggerContainer>
      </div>
    </>
  );
}
