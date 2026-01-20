import { Metadata } from "next";
import { PostForm } from "@/components/admin/PostForm";
import { getAllCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "New Lesson",
};

export default function NewPostPage() {
  const existingCourses = getAllCategories();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Create New Lesson</h1>
      <p className="text-muted mb-8">Add a new lesson to one of your courses</p>
      <PostForm mode="create" existingCourses={existingCourses} />
    </div>
  );
}
