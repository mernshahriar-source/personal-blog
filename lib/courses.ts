import fs from "fs";
import path from "path";
import { CourseConfig, Course, LessonMeta } from "@/types/post";
import { getAllPosts } from "./posts";

const coursesFilePath = path.join(process.cwd(), "content/courses.json");

interface CoursesData {
  courses: CourseConfig[];
}

function readCoursesFile(): CoursesData {
  if (!fs.existsSync(coursesFilePath)) {
    return { courses: [] };
  }
  const content = fs.readFileSync(coursesFilePath, "utf8");
  return JSON.parse(content);
}

function writeCoursesFile(data: CoursesData): void {
  const dir = path.dirname(coursesFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(coursesFilePath, JSON.stringify(data, null, 2), "utf8");
}

// Get all course configs (without lesson data)
export function getAllCourseConfigs(): CourseConfig[] {
  const data = readCoursesFile();
  return data.courses.sort((a, b) => a.order - b.order);
}

// Get a course config by ID
export function getCourseConfigById(id: string): CourseConfig | null {
  const courses = getAllCourseConfigs();
  return courses.find((c) => c.id === id) || null;
}

// Get all courses with lesson data
export function getAllCoursesWithLessons(): Course[] {
  const configs = getAllCourseConfigs();
  const posts = getAllPosts();

  return configs.map((config) => {
    // Find posts that belong to this course (by matching category name)
    const coursePosts = posts.filter((post) =>
      post.categories.some(
        (cat) => cat.toLowerCase() === config.name.toLowerCase()
      )
    );

    // Sort by date (oldest first for course progression)
    const sortedPosts = coursePosts.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Calculate total reading time
    const totalMinutes = sortedPosts.reduce((acc, post) => {
      const minutes = parseInt(post.readingTime) || 5;
      return acc + minutes;
    }, 0);

    // Create lesson metadata
    const lessons: LessonMeta[] = sortedPosts.map((post, index) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      categories: post.categories,
      tags: post.tags,
      readingTime: post.readingTime,
      lessonNumber: index + 1,
      courseSlug: config.id,
      courseName: config.name,
    }));

    return {
      ...config,
      slug: config.id,
      lessonCount: lessons.length,
      totalReadingTime: totalMinutes,
      lessons,
    };
  });
}

// Get a single course with lessons
export function getCourseWithLessons(id: string): Course | null {
  const courses = getAllCoursesWithLessons();
  return courses.find((c) => c.id === id) || null;
}

// Create a new course
export function createCourse(
  course: Omit<CourseConfig, "createdAt" | "updatedAt" | "order">
): CourseConfig {
  const data = readCoursesFile();

  // Generate order (add to end)
  const maxOrder = data.courses.reduce((max, c) => Math.max(max, c.order), 0);

  const newCourse: CourseConfig = {
    ...course,
    order: maxOrder + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.courses.push(newCourse);
  writeCoursesFile(data);

  return newCourse;
}

// Update a course
export function updateCourse(
  id: string,
  updates: Partial<Omit<CourseConfig, "id" | "createdAt">>
): CourseConfig | null {
  const data = readCoursesFile();
  const index = data.courses.findIndex((c) => c.id === id);

  if (index === -1) {
    return null;
  }

  data.courses[index] = {
    ...data.courses[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  writeCoursesFile(data);
  return data.courses[index];
}

// Delete a course
export function deleteCourse(id: string): boolean {
  const data = readCoursesFile();
  const index = data.courses.findIndex((c) => c.id === id);

  if (index === -1) {
    return false;
  }

  data.courses.splice(index, 1);
  writeCoursesFile(data);
  return true;
}

// Reorder courses
export function reorderCourses(orderedIds: string[]): void {
  const data = readCoursesFile();

  orderedIds.forEach((id, index) => {
    const course = data.courses.find((c) => c.id === id);
    if (course) {
      course.order = index + 1;
      course.updatedAt = new Date().toISOString();
    }
  });

  writeCoursesFile(data);
}

// Generate a slug from name
export function generateCourseSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Check if course ID exists
export function courseIdExists(id: string): boolean {
  const courses = getAllCourseConfigs();
  return courses.some((c) => c.id === id);
}
