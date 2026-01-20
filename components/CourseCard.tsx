"use client";

import Link from "next/link";
import { Course } from "@/types/post";
import { CourseIcon } from "./Icons";
import { ProgressBar } from "./ProgressBar";
import { useProgressContext } from "./ProgressProvider";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { getCourseProgress, isLoaded } = useProgressContext();
  const progress = getCourseProgress(course.slug);
  const percentage = progress?.percentage || 0;

  return (
    <Link href={`/courses/${course.slug}`} className="block group">
      <article className="card p-6 h-full flex flex-col">
        {/* Gradient accent bar */}
        <div
          className={`h-1 w-full rounded-full bg-gradient-to-r ${course.gradient} mb-4`}
        />

        {/* Icon and title */}
        <div className="flex items-start gap-4 mb-3">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${course.gradient} text-white shrink-0`}
          >
            <CourseIcon icon={course.icon} className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold group-hover:text-accent transition-colors truncate">
              {course.name}
            </h3>
            <p className="text-sm text-muted">
              {course.lessonCount} {course.lessonCount === 1 ? "lesson" : "lessons"}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-foreground/70 text-sm mb-4 flex-1 line-clamp-2">
          {course.description}
        </p>

        {/* Progress bar */}
        {isLoaded && percentage > 0 && (
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted mb-2">
              <span>Progress</span>
              <span>
                {progress?.completedLessons.length || 0} / {course.lessonCount}
              </span>
            </div>
            <ProgressBar percentage={percentage} showLabel={false} size="sm" />
          </div>
        )}

        {/* Start/Continue CTA */}
        <div
          className={`mt-4 pt-4 border-t border-border ${
            isLoaded && percentage > 0 ? "" : "mt-auto"
          }`}
        >
          <span
            className={`text-sm font-medium bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent`}
          >
            {percentage === 0
              ? "Start Course"
              : percentage === 100
              ? "Review Course"
              : "Continue Learning"}
            <span className="ml-1">&rarr;</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
