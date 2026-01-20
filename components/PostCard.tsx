import Link from "next/link";
import { PostMeta } from "@/types/post";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="card p-6">
      <Link href={`/posts/${post.slug}`} className="group">
        <h2 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
          {post.title}
        </h2>
      </Link>
      <div className="flex items-center gap-4 text-sm text-muted mb-3">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span>{post.readingTime}</span>
      </div>
      <p className="text-foreground/80 mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {post.categories.map((category) => (
          <Link
            key={category}
            href={`/courses/${encodeURIComponent(
              category.toLowerCase().replace(/\s+/g, "-")
            )}`}
            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm hover:bg-accent/20 transition-colors"
          >
            {category}
          </Link>
        ))}
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
            className="px-3 py-1 bg-foreground/5 text-muted rounded-full text-sm hover:bg-foreground/10 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
