import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative -mx-4 md:-mx-8 -mt-8 px-4 md:px-8 pt-16 pb-20 mb-12 hero-gradient text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Learn. Build. Grow.</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Explore our curated courses and master new skills at your own pace. Track
          your progress and achieve your learning goals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#courses"
            className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Browse Courses
          </a>
          <Link
            href="/about"
            className="px-6 py-3 border-2 border-white/30 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
