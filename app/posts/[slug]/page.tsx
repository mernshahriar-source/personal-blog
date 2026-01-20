import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllPosts,
  getPostBySlug,
  getLessonNavigation,
  getCourseBySlug,
} from "@/lib/posts";
import { CourseContextBanner } from "@/components/CourseContextBanner";
import { LessonNavigation } from "@/components/LessonNavigation";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

interface PostPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ course?: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Lesson Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params, searchParams }: PostPageProps) {
  const { slug } = await params;
  const { course: courseSlug } = await searchParams;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get course context if available
  const course = courseSlug ? getCourseBySlug(courseSlug) : null;
  const navigation = courseSlug ? getLessonNavigation(slug, courseSlug) : null;

  return (
    <div className="page-transition">
      {/* Course context banner */}
      {course && navigation && (
        <CourseContextBanner course={course} currentLesson={navigation.current} />
      )}

      <article className="card-floating p-6 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>{post.readingTime}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <Link
                key={category}
                href={`/courses/${encodeURIComponent(
                  category.toLowerCase().replace(/\s+/g, "-")
                )}`}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm hover:bg-accent/20 transition-colors"
              >
                {category}
              </Link>
            ))}
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="px-3 py-1 bg-foreground/5 text-muted rounded-full text-sm hover:bg-foreground/10 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight, rehypeSlug],
              },
            }}
          />
        </div>
      </article>

      {/* Lesson navigation if in course context */}
      {navigation ? (
        <LessonNavigation navigation={navigation} />
      ) : (
        <footer className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-accent hover:underline">
            &larr; Back to all courses
          </Link>
        </footer>
      )}
    </div>
  );
}
