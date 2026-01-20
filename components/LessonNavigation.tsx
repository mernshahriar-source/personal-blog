"use client";

import Link from "next/link";
import { LessonNavigation as LessonNavType } from "@/types/post";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";
import { useProgressContext } from "./ProgressProvider";

interface LessonNavigationProps {
  navigation: LessonNavType;
}

export function LessonNavigation({ navigation }: LessonNavigationProps) {
  const { markLessonComplete, isLessonComplete, isLoaded } = useProgressContext();
  const { previous, next, current, course } = navigation;
  const completed = isLoaded && isLessonComplete(course.slug, current.slug);

  const handleMarkComplete = () => {
    markLessonComplete(course.slug, current.slug, course.lessonCount);
  };

  return (
    <footer className="mt-12 pt-8 border-t border-border">
      {/* Mark as complete button */}
      {isLoaded && !completed && (
        <div className="mb-6 text-center">
          <button
            onClick={handleMarkComplete}
            className={`px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r ${course.gradient} hover:opacity-90 transition-opacity`}
          >
            Mark as Complete
          </button>
        </div>
      )}

      {completed && (
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Lesson Completed
          </span>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between gap-4">
        {previous ? (
          <Link
            href={`/posts/${previous.slug}?course=${course.slug}`}
            className="flex-1 card p-4 group"
          >
            <div className="flex items-center gap-3">
              <ChevronLeftIcon className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
              <div className="min-w-0">
                <p className="text-xs text-muted uppercase tracking-wide">Previous</p>
                <p className="font-medium truncate group-hover:text-accent transition-colors">
                  {previous.title}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        <Link
          href={`/courses/${course.slug}`}
          className="px-4 py-2 text-sm text-muted hover:text-accent transition-colors"
        >
          All Lessons
        </Link>

        {next ? (
          <Link
            href={`/posts/${next.slug}?course=${course.slug}`}
            className="flex-1 card p-4 group text-right"
          >
            <div className="flex items-center justify-end gap-3">
              <div className="min-w-0">
                <p className="text-xs text-muted uppercase tracking-wide">Next</p>
                <p className="font-medium truncate group-hover:text-accent transition-colors">
                  {next.title}
                </p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </footer>
  );
}
