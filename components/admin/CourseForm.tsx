"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CourseConfig } from "@/types/post";
import { CourseIcon } from "@/components/Icons";

interface CourseFormProps {
  course?: CourseConfig;
  mode: "create" | "edit";
}

const ICON_OPTIONS = [
  { value: "book", label: "Book" },
  { value: "code", label: "Code" },
  { value: "cpu", label: "Technology" },
  { value: "palette", label: "Design" },
];

const GRADIENT_OPTIONS = [
  { value: "from-blue-500 to-cyan-400", label: "Blue" },
  { value: "from-purple-500 to-pink-400", label: "Purple" },
  { value: "from-green-500 to-emerald-400", label: "Green" },
  { value: "from-orange-500 to-yellow-400", label: "Orange" },
  { value: "from-red-500 to-rose-400", label: "Red" },
  { value: "from-indigo-500 to-violet-400", label: "Indigo" },
  { value: "from-teal-500 to-cyan-400", label: "Teal" },
  { value: "from-gray-500 to-slate-400", label: "Gray" },
];

export function CourseForm({ course, mode }: CourseFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: course?.name || "",
    description: course?.description || "",
    icon: course?.icon || "book",
    gradient: course?.gradient || "from-blue-500 to-cyan-400",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Course name is required");
      return;
    }

    setIsLoading(true);

    try {
      const url =
        mode === "create"
          ? "/api/admin/courses"
          : `/api/admin/courses/${course?.id}`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to save course");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
          {error}
        </div>
      )}

      {/* Preview Card */}
      <div className="card p-6">
        <p className="text-sm text-muted mb-3">Preview</p>
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${formData.gradient} text-white shrink-0`}
          >
            <CourseIcon icon={formData.icon} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {formData.name || "Course Name"}
            </h3>
            <p className="text-sm text-muted mt-1">
              {formData.description || "Course description will appear here..."}
            </p>
          </div>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Course Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="e.g., Web Development"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Describe what students will learn in this course..."
        />
      </div>

      {/* Icon */}
      <div>
        <label className="block text-sm font-medium mb-2">Icon</label>
        <div className="flex flex-wrap gap-3">
          {ICON_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, icon: option.value }))
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                formData.icon === option.value
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <CourseIcon icon={option.value} className="w-5 h-5" />
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gradient Color */}
      <div>
        <label className="block text-sm font-medium mb-2">Color Theme</label>
        <div className="flex flex-wrap gap-3">
          {GRADIENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, gradient: option.value }))
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                formData.gradient === option.value
                  ? "border-accent ring-2 ring-accent/20"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-gradient-to-r ${option.value}`}
              />
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 disabled:opacity-50 transition-colors"
        >
          {isLoading
            ? "Saving..."
            : mode === "create"
              ? "Create Course"
              : "Update Course"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg border border-border hover:bg-foreground/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
