import { NextRequest, NextResponse } from "next/server";
import {
  getPostBySlugAdmin,
  updatePost,
  deletePost,
} from "@/lib/posts";
import { isValidSlug, sanitizeSlug } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;
  const post = getPostBySlugAdmin(slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug: oldSlug } = await params;
    const data = await request.json();

    const existing = getPostBySlugAdmin(oldSlug);
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Handle slug change
    const newSlug = data.slug ? sanitizeSlug(data.slug) : oldSlug;

    if (!isValidSlug(newSlug)) {
      return NextResponse.json(
        { error: "Invalid slug format" },
        { status: 400 }
      );
    }

    // Check if new slug conflicts with another post
    if (newSlug !== oldSlug) {
      const slugExists = getPostBySlugAdmin(newSlug);
      if (slugExists) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const postData = {
      slug: newSlug,
      title: data.title ?? existing.title,
      date: data.date ?? existing.date,
      excerpt: data.excerpt ?? existing.excerpt,
      content: data.content ?? existing.content,
      categories: data.categories ?? existing.categories,
      tags: data.tags ?? existing.tags,
      draft: data.draft ?? existing.draft,
    };

    const success = updatePost(oldSlug, postData);

    if (success) {
      return NextResponse.json({ success: true, slug: newSlug });
    }

    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const existing = getPostBySlugAdmin(slug);
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const success = deletePost(slug);

    if (success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
