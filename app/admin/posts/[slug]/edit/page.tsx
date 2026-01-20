import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlugAdmin, getAllCategories } from "@/lib/posts";
import { PostForm } from "@/components/admin/PostForm";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EditPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlugAdmin(slug);

  return {
    title: post ? `Edit: ${post.title}` : "Lesson Not Found",
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlugAdmin(slug);
  const existingCourses = getAllCategories();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Edit Lesson</h1>
      <p className="text-muted mb-8">Update lesson content and settings</p>
      <PostForm post={post} mode="edit" existingCourses={existingCourses} />
    </div>
  );
}
