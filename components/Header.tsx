import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <nav className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            LearnHub
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/courses" className="hover:text-accent transition-colors">
              Courses
            </Link>
            <Link href="/about" className="hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/search" className="hover:text-accent transition-colors">
              Search
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
