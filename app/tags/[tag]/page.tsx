import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Posts tagged "${decodedTag}"`,
    description: `All posts tagged with ${decodedTag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  const displayTag =
    posts[0]?.tags.find((t) => t.toLowerCase() === decodedTag.toLowerCase()) ||
    decodedTag;

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Tag: #{displayTag}</h1>
        <p className="text-muted">
          {posts.length} {posts.length === 1 ? "post" : "posts"} with this tag
        </p>
      </header>

      <div>
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={{
              slug: post.slug,
              title: post.title,
              date: post.date,
              excerpt: post.excerpt,
              categories: post.categories,
              tags: post.tags,
              readingTime: post.readingTime,
            }}
          />
        ))}
      </div>
    </div>
  );
}
