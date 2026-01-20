import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseConfigById, getAllCourseConfigs } from "@/lib/courses";
import { PostForm } from "@/components/admin/PostForm";

interface NewLessonPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NewLessonPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseConfigById(id);

  return {
    title: course ? `New Lesson - ${course.name}` : "Course Not Found",
  };
}

export default async function NewLessonPage({ params }: NewLessonPageProps) {
  const { id } = await params;
  const course = getCourseConfigById(id);
  const allCourses = getAllCourseConfigs();

  if (!course) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Add Lesson to {course.name}</h1>
      <p className="text-muted mb-8">Create a new lesson for this course</p>
      <PostForm
        mode="create"
        existingCourses={allCourses.map((c) => c.name)}
        preselectedCourse={course.name}
      />
    </div>
  );
}
