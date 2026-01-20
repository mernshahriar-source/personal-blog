import { redirect } from "next/navigation";
import { getAllCategories } from "@/lib/posts";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const courseSlug = decodeURIComponent(category).toLowerCase().replace(/\s+/g, "-");
  redirect(`/courses/${courseSlug}`);
}
