import { LessonMeta } from "@/types/post";
import { LessonCard } from "./LessonCard";

interface LessonListProps {
  lessons: LessonMeta[];
  activeSlug?: string;
}

export function LessonList({ lessons, activeSlug }: LessonListProps) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Lessons</h2>
      <div className="space-y-3">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.slug}
            lesson={lesson}
            isActive={lesson.slug === activeSlug}
          />
        ))}
      </div>
    </section>
  );
}
