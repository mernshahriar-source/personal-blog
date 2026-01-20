import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCourseWithLessons } from "@/lib/courses";
import { CourseIcon } from "@/components/Icons";

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CourseDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseWithLessons(id);

  return {
    title: course ? course.name : "Course Not Found",
  };
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = getCourseWithLessons(id);

  if (!course) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className={`p-4 rounded-xl bg-gradient-to-br ${course.gradient} text-white`}
          >
            <CourseIcon icon={course.icon} className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{course.name}</h1>
            <p className="text-muted mt-1">{course.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/courses/${course.id}/edit`}
            className="px-4 py-2 rounded-lg border border-border hover:bg-foreground/5 transition-colors"
          >
            Edit Course
          </Link>
          <Link
            href={`/admin/courses/${course.id}/lessons/new`}
            className="px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
          >
            + Add Lesson
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-4">
          <p className="text-sm text-muted">Lessons</p>
          <p className="text-2xl font-bold">{course.lessonCount}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-muted">Total Time</p>
          <p className="text-2xl font-bold">{course.totalReadingTime} min</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-muted">Status</p>
          <p className="text-2xl font-bold">
            {course.lessonCount > 0 ? "Active" : "Empty"}
          </p>
        </div>
      </div>

      {/* Lessons List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Lessons</h2>

        {course.lessons.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-muted mb-4">No lessons in this course yet.</p>
            <Link
              href={`/admin/courses/${course.id}/lessons/new`}
              className="inline-block px-6 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
            >
              Create your first lesson
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {course.lessons.map((lesson) => (
              <div key={lesson.slug} className="card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-medium">
                      {lesson.lessonNumber}
                    </div>
                    <div>
                      <Link
                        href={`/admin/posts/${lesson.slug}/edit`}
                        className="font-medium hover:text-accent transition-colors"
                      >
                        {lesson.title}
                      </Link>
                      <p className="text-sm text-muted">
                        {new Date(lesson.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        {" "}&bull;{" "}
                        {lesson.readingTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/posts/${lesson.slug}?course=${course.id}`}
                      target="_blank"
                      className="px-3 py-1 text-sm rounded-lg border border-border hover:bg-foreground/5 transition-colors"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/posts/${lesson.slug}/edit`}
                      className="px-3 py-1 text-sm rounded-lg border border-border hover:bg-foreground/5 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="mt-8 pt-8 border-t border-border">
        <Link href="/admin" className="text-accent hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
