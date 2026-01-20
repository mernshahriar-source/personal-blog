import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about me and this blog.",
};

export default function AboutPage() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <h1>About Me</h1>

      <p>
        Welcome to my blog! I&apos;m a developer passionate about building great
        software and sharing knowledge with the community.
      </p>

      <h2>What I Write About</h2>

      <p>
        On this blog, you&apos;ll find articles about:
      </p>

      <ul>
        <li>Web development and modern frameworks</li>
        <li>Programming best practices</li>
        <li>Technology trends and insights</li>
        <li>Personal projects and learnings</li>
      </ul>

      <h2>Get in Touch</h2>

      <p>
        Feel free to reach out! You can find me on various social platforms or
        send me an email. I&apos;m always happy to connect with fellow developers
        and tech enthusiasts.
      </p>

      <h2>About This Site</h2>

      <p>
        This blog is built with <strong>Next.js</strong> and{" "}
        <strong>Tailwind CSS</strong>. Posts are written in Markdown and rendered
        using MDX. The source code is available on GitHub.
      </p>
    </div>
  );
}
