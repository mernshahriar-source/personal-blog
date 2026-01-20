import { NextRequest, NextResponse } from "next/server";
import {
  getAllPostsAdmin,
  getPostBySlugAdmin,
  createPost,
} from "@/lib/posts";
import { isValidSlug, sanitizeSlug } from "@/lib/auth";

export async function GET() {
  const posts = getAllPostsAdmin();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Generate slug from title if not provided
    const slug = data.slug
      ? sanitizeSlug(data.slug)
      : sanitizeSlug(data.title);

    if (!isValidSlug(slug)) {
      return NextResponse.json(
        { error: "Invalid slug format" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = getPostBySlugAdmin(slug);
    if (existing) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    const postData = {
      slug,
      title: data.title,
      date: data.date || new Date().toISOString().split("T")[0],
      excerpt: data.excerpt || "",
      content: data.content || "",
      categories: data.categories || [],
      tags: data.tags || [],
      draft: data.draft ?? true,
    };

    const success = createPost(postData);

    if (success) {
      return NextResponse.json({ success: true, slug });
    }

    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
