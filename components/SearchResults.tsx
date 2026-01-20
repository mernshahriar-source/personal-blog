"use client";

import { useState } from "react";
import Link from "next/link";
import { PostMeta } from "@/types/post";

interface SearchResultsProps {
  posts: PostMeta[];
}

export function SearchResults({ posts }: SearchResultsProps) {
  const [query, setQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const searchQuery = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
      post.categories.some((cat) => cat.toLowerCase().includes(searchQuery))
    );
  });

  return (
    <div>
      <div className="mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          autoFocus
        />
      </div>

      {query && (
        <p className="text-muted mb-6">
          {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"}{" "}
          for &quot;{query}&quot;
        </p>
      )}

      {query && filteredPosts.length === 0 ? (
        <p className="text-muted">
          No posts found. Try a different search term.
        </p>
      ) : (
        <div className="space-y-6">
          {(query ? filteredPosts : posts).map((post) => (
            <article
              key={post.slug}
              className="border-b border-border pb-6 last:border-b-0"
            >
              <Link href={`/posts/${post.slug}`} className="group">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center gap-4 text-sm text-muted mb-2">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <span>{post.readingTime}</span>
              </div>
              <p className="text-foreground/80">{post.excerpt}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
