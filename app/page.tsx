import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-24 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome
      </h1>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
        We build thoughtful, high-quality digital experiences. Explore our site to learn more about who we are and what we do.
      </p>
      <div className="flex gap-4">
        <Link
          href="/about"
          className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-colors"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-lg border border-black text-black font-medium hover:bg-gray-100 transition-colors"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
