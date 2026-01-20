import { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: "noindex, nofollow",
};

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted">Enter your password to continue</p>
        </div>

        <div className="bg-background border border-border rounded-xl p-8">
          <LoginForm callbackUrl={callbackUrl || "/admin"} />
        </div>

        <p className="text-center mt-6 text-sm text-muted">
          <a href="/" className="hover:text-accent transition-colors">
            &larr; Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
