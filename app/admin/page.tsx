import Link from "next/link";
import { getAllCoursesWithLessons } from "@/lib/courses";
import { CourseIcon } from "@/components/Icons";

export default function AdminDashboard() {
  const courses = getAllCoursesWithLessons();
  const totalLessons = courses.reduce((acc, c) => acc + c.lessonCount, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted mt-1">Manage your courses and lessons</p>
        </div>
        <Link
          href="/admin/courses/new"
          className="px-4 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
        >
          + New Course
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-6">
          <p className="text-sm text-muted mb-1">Total Courses</p>
          <p className="text-3xl font-bold">{courses.length}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted mb-1">Total Lessons</p>
          <p className="text-3xl font-bold">{totalLessons}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted mb-1">Total Reading Time</p>
          <p className="text-3xl font-bold">
            {courses.reduce((acc, c) => acc + c.totalReadingTime, 0)} min
          </p>
        </div>
      </div>

      {/* Courses */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Courses</h2>

        {courses.length === 0 ? (
          <div className="card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CourseIcon icon="book" className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">No courses yet</h3>
            <p className="text-muted mb-4">
              Create your first course to start adding lessons
            </p>
            <Link
              href="/admin/courses/new"
              className="inline-block px-6 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
            >
              Create Your First Course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/admin/courses/${course.id}`}
                className="card p-6 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${course.gradient} text-white shrink-0`}
                  >
                    <CourseIcon icon={course.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold group-hover:text-accent transition-colors truncate">
                      {course.name}
                    </h3>
                    <p className="text-sm text-muted">
                      {course.lessonCount}{" "}
                      {course.lessonCount === 1 ? "lesson" : "lessons"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted line-clamp-2 mb-4">
                  {course.description || "No description"}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted">
                    {course.totalReadingTime} min total
                  </span>
                  <span className="text-sm text-accent">
                    Manage &rarr;
                  </span>
                </div>
              </Link>
            ))}

            {/* Add Course Card */}
            <Link
              href="/admin/courses/new"
              className="card p-6 border-dashed flex flex-col items-center justify-center text-center min-h-[200px] hover:border-accent hover:text-accent transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center mb-3">
                <span className="text-2xl">+</span>
              </div>
              <span className="font-medium">Add New Course</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
