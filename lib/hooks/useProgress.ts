"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProgress, CourseProgress } from "@/types/progress";

const STORAGE_KEY = "blog-course-progress";

const getInitialProgress = (): UserProgress => ({
  courses: {},
  lastUpdated: new Date().toISOString(),
});

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(getInitialProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error("Failed to save progress:", error);
      }
    }
  }, [progress, isLoaded]);

  const markLessonComplete = useCallback(
    (courseSlug: string, lessonSlug: string, totalLessons: number) => {
      setProgress((prev) => {
        const courseProgress = prev.courses[courseSlug] || {
          courseSlug,
          completedLessons: [],
          totalLessons,
          percentage: 0,
          lastAccessedAt: new Date().toISOString(),
        };

        if (courseProgress.completedLessons.includes(lessonSlug)) {
          return prev;
        }

        const newCompletedLessons = [
          ...courseProgress.completedLessons,
          lessonSlug,
        ];
        const percentage = Math.round(
          (newCompletedLessons.length / totalLessons) * 100
        );

        return {
          ...prev,
          courses: {
            ...prev.courses,
            [courseSlug]: {
              ...courseProgress,
              completedLessons: newCompletedLessons,
              totalLessons,
              percentage,
              lastAccessedAt: new Date().toISOString(),
            },
          },
          lastUpdated: new Date().toISOString(),
        };
      });
    },
    []
  );

  const markLessonIncomplete = useCallback(
    (courseSlug: string, lessonSlug: string) => {
      setProgress((prev) => {
        const courseProgress = prev.courses[courseSlug];
        if (!courseProgress) return prev;

        const newCompletedLessons = courseProgress.completedLessons.filter(
          (slug) => slug !== lessonSlug
        );
        const percentage = Math.round(
          (newCompletedLessons.length / courseProgress.totalLessons) * 100
        );

        return {
          ...prev,
          courses: {
            ...prev.courses,
            [courseSlug]: {
              ...courseProgress,
              completedLessons: newCompletedLessons,
              percentage,
              lastAccessedAt: new Date().toISOString(),
            },
          },
          lastUpdated: new Date().toISOString(),
        };
      });
    },
    []
  );

  const isLessonComplete = useCallback(
    (courseSlug: string, lessonSlug: string): boolean => {
      return (
        progress.courses[courseSlug]?.completedLessons.includes(lessonSlug) ??
        false
      );
    },
    [progress]
  );

  const getCourseProgress = useCallback(
    (courseSlug: string): CourseProgress | null => {
      return progress.courses[courseSlug] || null;
    },
    [progress]
  );

  const resetCourseProgress = useCallback((courseSlug: string) => {
    setProgress((prev) => {
      const { [courseSlug]: _, ...remainingCourses } = prev.courses;
      return {
        ...prev,
        courses: remainingCourses,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  return {
    progress,
    isLoaded,
    markLessonComplete,
    markLessonIncomplete,
    isLessonComplete,
    getCourseProgress,
    resetCourseProgress,
  };
}
