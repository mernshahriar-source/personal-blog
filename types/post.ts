export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  categories: string[];
  tags: string[];
  readingTime: string;
  draft?: boolean;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  readingTime: string;
}

// Course configuration (stored in JSON)
export interface CourseConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Course with computed lesson data
export interface Course extends CourseConfig {
  slug: string;
  lessonCount: number;
  totalReadingTime: number;
  lessons: LessonMeta[];
}

export interface LessonMeta extends PostMeta {
  lessonNumber: number;
  courseSlug: string;
  courseName: string;
}

export interface LessonNavigation {
  previous: LessonMeta | null;
  next: LessonMeta | null;
  current: LessonMeta;
  course: Course;
}
