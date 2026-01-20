import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm">
            {new Date().getFullYear()} My Blog. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/feed.xml" className="text-muted hover:text-accent transition-colors">
              RSS Feed
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
