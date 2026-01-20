import { Metadata } from "next";
import { getAllCourses } from "@/lib/posts";
import { CourseCard } from "@/components/CourseCard";

export const metadata: Metadata = {
  title: "All Courses",
  description: "Browse all available courses and start learning.",
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="page-transition">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Courses</h1>
        <p className="text-muted text-lg">
          Choose a course to start your learning journey.
        </p>
      </header>

      {courses.length === 0 ? (
        <p className="text-muted">No courses available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
