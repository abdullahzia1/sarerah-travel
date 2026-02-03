import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug } from "@/data/blog";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="pb-24 md:pb-12">
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/blog" className="text-sm font-medium text-teal-700 hover:underline">
          ← Blog
        </Link>
        <header className="mt-4">
          <time className="text-sm text-stone-500">{formatDate(post.date)}</time>
          {post.author && <span className="ml-2 text-sm text-stone-500">by {post.author}</span>}
          <h1 className="mt-2 font-display text-3xl font-bold text-stone-900 sm:text-4xl">
            {post.title}
          </h1>
        </header>
        <div className="relative mt-6 aspect-video overflow-hidden rounded-xl bg-stone-200">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        <div className="mt-8 prose prose-stone max-w-none">
          <p className="text-lg text-stone-700">{post.excerpt}</p>
          <div className="mt-6 text-stone-700 whitespace-pre-line">
            {post.content.replace(/\*\*(.*?)\*\*/g, "$1").split("\n").map((p, i) => (
              <p key={i} className="mb-4">{p}</p>
            ))}
          </div>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/packages?destination=${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700 hover:bg-stone-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </article>
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
