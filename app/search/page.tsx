import { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/posts";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search all blog posts.",
};

export default function SearchPage() {
  const posts = getAllPostsMeta();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Search</h1>
        <p className="text-muted">Find posts by title, content, tags, or categories.</p>
      </header>

      <SearchResults posts={posts} />
    </div>
  );
}
