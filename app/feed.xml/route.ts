import RSS from "rss";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.SITE_URL || "http://localhost:3000";

export async function GET() {
  const posts = getAllPosts();

  const feed = new RSS({
    title: "My Blog",
    description: "A personal blog about technology, development, and more.",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/feed.xml`,
    language: "en",
    pubDate: new Date(),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/posts/${post.slug}`,
      date: post.date,
      categories: post.categories,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
