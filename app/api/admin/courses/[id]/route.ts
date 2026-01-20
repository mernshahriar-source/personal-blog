import { NextRequest, NextResponse } from "next/server";
import {
  getCourseConfigById,
  updateCourse,
  deleteCourse,
  getCourseWithLessons,
} from "@/lib/courses";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET single course
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const course = getCourseWithLessons(id);

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Failed to get course:", error);
    return NextResponse.json(
      { error: "Failed to get course" },
      { status: 500 }
    );
  }
}

// PUT update course
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, icon, gradient, order } = body;

    const existing = getCourseConfigById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    const updated = updateCourse(id, {
      name: name?.trim() || existing.name,
      description: description?.trim() ?? existing.description,
      icon: icon || existing.icon,
      gradient: gradient || existing.gradient,
      order: order ?? existing.order,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

// DELETE course
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const course = getCourseWithLessons(id);
    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Check if course has lessons
    if (course.lessonCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete course with ${course.lessonCount} lessons. Delete or move the lessons first.` },
        { status: 400 }
      );
    }

    const deleted = deleteCourse(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Failed to delete course" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
