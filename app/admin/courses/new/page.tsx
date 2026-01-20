import { Metadata } from "next";
import { CourseForm } from "@/components/admin/CourseForm";

export const metadata: Metadata = {
  title: "New Course",
};

export default function NewCoursePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
      <p className="text-muted mb-8">
        Set up a new course to organize your lessons
      </p>
      <CourseForm mode="create" />
    </div>
  );
}
