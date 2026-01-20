"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Post } from "@/types/post";

interface PostFormProps {
  post?: Post;
  mode: "create" | "edit";
  existingCourses: string[];
  preselectedCourse?: string;
}

export function PostForm({ post, mode, existingCourses, preselectedCourse }: PostFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    date: post?.date?.split("T")[0] || new Date().toISOString().split("T")[0],
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    course: preselectedCourse || post?.categories?.[0] || "",
    tags: post?.tags?.join(", ") || "",
    draft: post?.draft ?? true,
  });

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleTitleChange(title: string) {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: mode === "create" && !prev.slug ? generateSlug(title) : prev.slug,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!formData.course) {
      setError("Please select a course for this lesson");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        date: formData.date,
        excerpt: formData.excerpt,
        content: formData.content,
        categories: [formData.course],
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        draft: formData.draft,
      };

      const url =
        mode === "create"
          ? "/api/admin/posts"
          : `/api/admin/posts/${post?.slug}`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save lesson");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
          {error}
        </div>
      )}

      {/* Course Selection */}
      <div className="card p-6 bg-gradient-to-r from-accent/5 to-accent/10">
        <label className="block text-sm font-medium mb-3">
          Course *
          <span className="text-muted font-normal ml-2">
            (Which course does this lesson belong to?)
          </span>
        </label>

        {existingCourses.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted mb-3">No courses available yet.</p>
            <Link
              href="/admin/courses/new"
              className="inline-block px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
            >
              Create a Course First
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {existingCourses.map((course) => (
              <button
                key={course}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, course }))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  formData.course === course
                    ? "bg-accent text-white shadow-md"
                    : "bg-background border border-border hover:border-accent hover:text-accent"
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        )}

        {formData.course && (
          <p className="mt-3 text-sm text-muted">
            Selected: <span className="text-accent font-medium">{formData.course}</span>
          </p>
        )}
      </div>

      {/* Title and Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Lesson Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="e.g., Getting Started with React"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">URL Slug *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, slug: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="getting-started-with-react"
            required
          />
        </div>
      </div>

      {/* Date and Draft */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Publish Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <p className="mt-1 text-xs text-muted">
            Lessons are ordered by date within a course (oldest first)
          </p>
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.draft}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, draft: e.target.checked }))
              }
              className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
            />
            <span>
              <span className="font-medium">Draft</span>
              <span className="text-muted text-sm block">Not visible to public</span>
            </span>
          </label>
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Excerpt / Description
        </label>
        <textarea
          value={formData.excerpt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
          }
          rows={2}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Brief description shown in lesson previews..."
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Tags
          <span className="text-muted font-normal ml-2">(comma-separated)</span>
        </label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, tags: e.target.value }))
          }
          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="react, javascript, tutorial"
        />
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <label className="text-sm font-medium">Lesson Content</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                activeTab === "edit"
                  ? "bg-accent text-white"
                  : "bg-foreground/5 hover:bg-foreground/10"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                activeTab === "preview"
                  ? "bg-accent text-white"
                  : "bg-foreground/5 hover:bg-foreground/10"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {activeTab === "edit" ? (
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, content: e.target.value }))
            }
            rows={20}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Write your lesson content in Markdown..."
          />
        ) : (
          <div className="prose prose-lg dark:prose-invert max-w-none p-4 rounded-lg border border-border bg-background min-h-[400px]">
            <PreviewContent content={formData.content} />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <button
          type="submit"
          disabled={isLoading || existingCourses.length === 0}
          className="px-6 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {isLoading
            ? "Saving..."
            : mode === "create"
              ? "Create Lesson"
              : "Update Lesson"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg border border-border hover:bg-foreground/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function PreviewContent({ content }: { content: string }) {
  if (!content) {
    return <p className="text-muted">Nothing to preview yet...</p>;
  }

  const html = content
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br />");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
