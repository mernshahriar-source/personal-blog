"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminHeader() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/admin"
              className="text-xl font-bold text-accent hover:text-accent/80 transition-colors"
            >
              Admin Panel
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="text-sm hover:text-accent transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/posts/new"
                className="text-sm hover:text-accent transition-colors"
              >
                New Post
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              View Site &rarr;
            </Link>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-sm px-4 py-2 rounded-lg border border-border hover:bg-foreground/5 transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
