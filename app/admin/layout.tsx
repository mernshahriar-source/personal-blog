import { Metadata } from "next";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ThemeProvider } from "@/components/ThemeProvider";
import "../globals.css";
import "highlight.js/styles/github-dark.css";

export const metadata: Metadata = {
  title: {
    default: "Admin | My Blog",
    template: "%s | Admin",
  },
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <AdminHeader />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
