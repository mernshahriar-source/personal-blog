import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseBySlug } from "@/lib/posts";
import { CourseHeader } from "@/components/CourseHeader";
import { LessonList } from "@/components/LessonList";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: "Course Not Found" };
  }

  return {
    title: course.name,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="page-transition">
      <CourseHeader course={course} />
      <LessonList lessons={course.lessons} />
    </div>
  );
}
