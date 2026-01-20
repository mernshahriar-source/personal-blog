"use client";

import Link from "next/link";
import { Course, LessonMeta } from "@/types/post";
import { ProgressBar } from "./ProgressBar";
import { useProgressContext } from "./ProgressProvider";

interface CourseContextBannerProps {
  course: Course;
  currentLesson: LessonMeta;
}

export function CourseContextBanner({ course, currentLesson }: CourseContextBannerProps) {
  const { getCourseProgress, isLoaded } = useProgressContext();
  const progress = getCourseProgress(course.slug);

  return (
    <div
      className={`-mx-4 md:-mx-8 -mt-8 px-4 md:px-8 py-4 mb-6 bg-gradient-to-r ${course.gradient}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-white">
            <Link
              href={`/courses/${course.slug}`}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              &larr; Back to {course.name}
            </Link>
            <p className="text-xs text-white/60 mt-1">
              Lesson {currentLesson.lessonNumber} of {course.lessonCount}
            </p>
          </div>

          {isLoaded && (
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm text-white/80">Progress:</span>
              <div className="w-32">
                <ProgressBar
                  percentage={progress?.percentage || 0}
                  showLabel={false}
                  size="sm"
                />
              </div>
              <span className="text-sm font-medium">{progress?.percentage || 0}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
