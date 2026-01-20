"use client";

import Link from "next/link";
import { LessonMeta } from "@/types/post";
import { CheckCircleIcon, PlayCircleIcon } from "./Icons";
import { useProgressContext } from "./ProgressProvider";

interface LessonCardProps {
  lesson: LessonMeta;
  isActive?: boolean;
}

export function LessonCard({ lesson, isActive = false }: LessonCardProps) {
  const { isLessonComplete, isLoaded } = useProgressContext();
  const completed = isLoaded && isLessonComplete(lesson.courseSlug, lesson.slug);

  return (
    <Link
      href={`/posts/${lesson.slug}?course=${lesson.courseSlug}`}
      className={`block group ${isActive ? "ring-2 ring-accent" : ""}`}
    >
      <article
        className={`card p-4 flex items-center gap-4 ${
          completed ? "bg-green-50 dark:bg-green-950/20" : ""
        }`}
      >
        {/* Lesson number */}
        <div
          className={`
          w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm
          ${
            completed
              ? "bg-green-500 text-white"
              : "bg-foreground/10 text-foreground/60"
          }
        `}
        >
          {completed ? (
            <CheckCircleIcon className="w-5 h-5 completion-check" />
          ) : (
            lesson.lessonNumber
          )}
        </div>

        {/* Lesson info */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold group-hover:text-accent transition-colors truncate ${
              completed ? "text-green-700 dark:text-green-300" : ""
            }`}
          >
            {lesson.title}
          </h3>
          <p className="text-sm text-muted truncate">{lesson.readingTime}</p>
        </div>

        {/* Action icon */}
        <div className="shrink-0">
          {completed ? (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Completed
            </span>
          ) : (
            <PlayCircleIcon className="w-6 h-6 text-muted group-hover:text-accent transition-colors" />
          )}
        </div>
      </article>
    </Link>
  );
}
