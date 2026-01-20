"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Post } from "@/types/post";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  const router = useRouter();
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to delete this lesson?")) {
      return;
    }

    setDeletingSlug(slug);

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to delete lesson");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setDeletingSlug(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 card">
        <p className="text-muted mb-4">No lessons yet.</p>
        <Link
          href="/admin/posts/new"
          className="inline-block px-6 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
        >
          Create your first lesson
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div key={post.slug} className="card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link
                  href={`/admin/posts/${post.slug}/edit`}
                  className="font-medium hover:text-accent transition-colors truncate"
                >
                  {post.title}
                </Link>
                <span
                  className={`shrink-0 px-2 py-0.5 text-xs rounded ${
                    post.draft
                      ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      : "bg-green-500/10 text-green-600 dark:text-green-400"
                  }`}
                >
                  {post.draft ? "Draft" : "Published"}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted">
                {post.categories.length > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    {post.categories[0]}
                  </span>
                )}
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span>{post.readingTime}</span>
              </div>

              {post.excerpt && (
                <p className="text-sm text-muted mt-2 line-clamp-1">
                  {post.excerpt}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/posts/${post.slug}`}
                target="_blank"
                className="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-foreground/5 transition-colors"
              >
                View
              </Link>
              <Link
                href={`/admin/posts/${post.slug}/edit`}
                className="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-foreground/5 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.slug)}
                disabled={deletingSlug === post.slug}
                className="px-3 py-1.5 text-sm rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
              >
                {deletingSlug === post.slug ? "..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
