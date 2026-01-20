import { NextRequest, NextResponse } from "next/server";
import {
  getAllCourseConfigs,
  createCourse,
  generateCourseSlug,
  courseIdExists,
} from "@/lib/courses";

// GET all courses
export async function GET() {
  try {
    const courses = getAllCourseConfigs();
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Failed to get courses:", error);
    return NextResponse.json(
      { error: "Failed to get courses" },
      { status: 500 }
    );
  }
}

// POST create new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, icon, gradient } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Course name is required" },
        { status: 400 }
      );
    }

    // Generate ID from name
    const id = generateCourseSlug(name);

    if (courseIdExists(id)) {
      return NextResponse.json(
        { error: "A course with this name already exists" },
        { status: 400 }
      );
    }

    const course = createCourse({
      id,
      name: name.trim(),
      description: description?.trim() || "",
      icon: icon || "book",
      gradient: gradient || "from-gray-500 to-slate-400",
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Failed to create course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
