import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Post, PostMeta, Course, LessonMeta, LessonNavigation, CourseConfig } from "@/types/post";
import { getAllCourseConfigs } from "./courses";

const postsDirectory = path.join(process.cwd(), "content/posts");

function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));
}

export function getAllPosts(): Post[] {
  const fileNames = getPostFiles();

  const posts = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const post: Post = {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        content,
        categories: data.categories || [],
        tags: data.tags || [],
        readingTime: readingTime(content).text,
        draft: data.draft || false,
      };

      return post;
    })
    .filter((post) => !post.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content, draft, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  posts.forEach((post) =>
    post.categories.forEach((cat) => categories.add(cat))
  );
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) =>
    post.categories.map((c) => c.toLowerCase()).includes(category.toLowerCase())
  );
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

// Admin functions - include drafts

export function getAllPostsAdmin(): Post[] {
  const fileNames = getPostFiles();

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || "",
        content,
        categories: data.categories || [],
        tags: data.tags || [],
        readingTime: readingTime(content).text,
        draft: data.draft || false,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlugAdmin(slug: string): Post | null {
  const posts = getAllPostsAdmin();
  return posts.find((post) => post.slug === slug) || null;
}

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  categories: string[];
  tags: string[];
  draft: boolean;
}

export function createPost(postData: PostData): boolean {
  try {
    const frontmatter = {
      title: postData.title,
      date: postData.date || new Date().toISOString().split("T")[0],
      excerpt: postData.excerpt || "",
      categories: postData.categories || [],
      tags: postData.tags || [],
      draft: postData.draft ?? true,
    };

    const markdown = matter.stringify(postData.content || "", frontmatter);
    const filePath = path.join(postsDirectory, `${postData.slug}.md`);

    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    fs.writeFileSync(filePath, markdown, "utf8");
    return true;
  } catch (error) {
    console.error("Failed to create post:", error);
    return false;
  }
}

export function updatePost(oldSlug: string, postData: PostData): boolean {
  try {
    const oldPath = path.join(postsDirectory, `${oldSlug}.md`);
    const newPath = path.join(postsDirectory, `${postData.slug}.md`);

    const existing = getPostBySlugAdmin(oldSlug);
    if (!existing) return false;

    const frontmatter = {
      title: postData.title ?? existing.title,
      date: postData.date ?? existing.date,
      excerpt: postData.excerpt ?? existing.excerpt,
      categories: postData.categories ?? existing.categories,
      tags: postData.tags ?? existing.tags,
      draft: postData.draft ?? existing.draft,
    };

    const content = postData.content ?? existing.content;
    const markdown = matter.stringify(content, frontmatter);

    // If slug changed, delete old file
    if (oldSlug !== postData.slug && fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }

    fs.writeFileSync(newPath, markdown, "utf8");
    return true;
  } catch (error) {
    console.error("Failed to update post:", error);
    return false;
  }
}

export function deletePost(slug: string): boolean {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return false;
    }

    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    console.error("Failed to delete post:", error);
    return false;
  }
}

// Default course config for fallback
const DEFAULT_COURSE_CONFIG = {
  gradient: "from-gray-500 to-slate-400",
  icon: "book",
  description: "Explore lessons in this course.",
};

function getCourseConfigByName(name: string): CourseConfig | null {
  const courses = getAllCourseConfigs();
  return courses.find(c => c.name.toLowerCase() === name.toLowerCase()) || null;
}

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function getAllCourses(): Course[] {
  // Get all course configs from JSON
  const courseConfigs = getAllCourseConfigs();
  const posts = getAllPosts();

  // Build courses from course configs
  return courseConfigs.map((config) => {
    // Find posts that belong to this course (category name matches course name)
    const coursePosts = posts.filter(post =>
      post.categories.some(cat => cat.toLowerCase() === config.name.toLowerCase())
    );

    const sortedPosts = coursePosts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const totalMinutes = sortedPosts.reduce((acc, post) => {
      const minutes = parseInt(post.readingTime) || 5;
      return acc + minutes;
    }, 0);

    const slug = config.id;

    return {
      ...config,
      slug,
      lessonCount: sortedPosts.length,
      totalReadingTime: totalMinutes,
      lessons: sortedPosts.map((post, index) => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        categories: post.categories,
        tags: post.tags,
        readingTime: post.readingTime,
        lessonNumber: index + 1,
        courseSlug: slug,
        courseName: config.name,
      })),
    };
  }).sort((a, b) => a.order - b.order);
}

export function getCourseBySlug(slug: string): Course | null {
  const courses = getAllCourses();
  return courses.find((c) => c.slug === slug) || null;
}

export function getLessonNavigation(
  lessonSlug: string,
  courseSlug: string
): LessonNavigation | null {
  const course = getCourseBySlug(courseSlug);
  if (!course) return null;

  const lessonIndex = course.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex === -1) return null;

  return {
    previous: lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null,
    next:
      lessonIndex < course.lessons.length - 1
        ? course.lessons[lessonIndex + 1]
        : null,
    current: course.lessons[lessonIndex],
    course,
  };
}

export function getFeaturedCourses(limit: number = 6): Course[] {
  return getAllCourses()
    .sort((a, b) => b.lessonCount - a.lessonCount)
    .slice(0, limit);
}
