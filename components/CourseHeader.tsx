"use client";

import { Course } from "@/types/post";
import { CourseIcon } from "./Icons";
import { ProgressBar } from "./ProgressBar";
import { useProgressContext } from "./ProgressProvider";

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const { getCourseProgress, isLoaded } = useProgressContext();
  const progress = getCourseProgress(course.slug);
  const percentage = progress?.percentage || 0;

  return (
    <header className="mb-8">
      {/* Hero section with gradient background */}
      <div
        className={`-mx-4 md:-mx-8 -mt-8 px-4 md:px-8 pt-12 pb-8 mb-6 bg-gradient-to-br ${course.gradient} text-white`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
              <CourseIcon icon={course.icon} className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{course.name}</h1>
              <p className="text-white/80 mt-1">
                {course.lessonCount} {course.lessonCount === 1 ? "lesson" : "lessons"}
                {" "}&bull;{" "}
                {course.totalReadingTime} min total
              </p>
            </div>
          </div>
          <p className="text-lg text-white/90 max-w-2xl">{course.description}</p>
        </div>
      </div>

      {/* Progress section */}
      {isLoaded && (
        <div className="card-floating p-4 -mt-12 relative z-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Your Progress</span>
            <span className="text-sm text-muted">
              {progress?.completedLessons.length || 0} of {course.lessonCount} completed
            </span>
          </div>
          <ProgressBar percentage={percentage} size="lg" />
        </div>
      )}
    </header>
  );
}
