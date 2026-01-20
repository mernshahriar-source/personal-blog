import Link from "next/link";
import { getFeaturedCourses, getAllPostsMeta } from "@/lib/posts";
import { HeroSection } from "@/components/HeroSection";
import { CourseCard } from "@/components/CourseCard";
import { PostCard } from "@/components/PostCard";

export default function HomePage() {
  const courses = getFeaturedCourses(6);
  const recentPosts = getAllPostsMeta().slice(0, 3);

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Courses */}
      <section id="courses" className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <Link href="/courses" className="text-accent hover:underline text-sm">
            View All &rarr;
          </Link>
        </div>

        {courses.length === 0 ? (
          <p className="text-muted">No courses available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Recent Lessons */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Lessons</h2>
        {recentPosts.length === 0 ? (
          <p className="text-muted">No lessons yet. Check back soon!</p>
        ) : (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
