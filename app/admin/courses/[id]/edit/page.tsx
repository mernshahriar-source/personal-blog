import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseConfigById } from "@/lib/courses";
import { CourseForm } from "@/components/admin/CourseForm";

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditCoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseConfigById(id);

  return {
    title: course ? `Edit: ${course.name}` : "Course Not Found",
  };
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params;
  const course = getCourseConfigById(id);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Edit Course</h1>
      <p className="text-muted mb-8">Update course details</p>
      <CourseForm course={course} mode="edit" />
    </div>
  );
}
