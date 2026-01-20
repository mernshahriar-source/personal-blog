export interface CourseProgress {
  courseSlug: string;
  completedLessons: string[];
  totalLessons: number;
  percentage: number;
  lastAccessedAt: string;
}

export interface UserProgress {
  courses: Record<string, CourseProgress>;
  lastUpdated: string;
}
