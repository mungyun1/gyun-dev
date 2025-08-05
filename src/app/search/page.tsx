import { getPosts } from "@/lib/posts";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { Metadata } from "next";

interface Post {
  slug: string;
  title: string;
  created_at: string;
}

export const metadata: Metadata = {
  title: "검색",
  description:
    "블로그에서 원하는 글을 검색할 수 있습니다. 제목이나 내용으로 빠르게 찾아보세요.",
  keywords: ["검색", "블로그", "글 찾기"],
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "검색 | gyun-dev",
    description:
      "블로그에서 원하는 글을 검색할 수 있습니다. 제목이나 내용으로 빠르게 찾아보세요.",
    url: "/search",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "검색 | gyun-dev",
    description: "블로그에서 원하는 글을 검색할 수 있습니다.",
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const posts = (await getPosts()) as Post[];
  const searchTerm = searchParams.q || "";

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <SearchInput />

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block bg-white dark:bg-slate-800 rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {post.title}
            </h2>

            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.created_at).toLocaleDateString()}
            </div>
          </Link>
        ))}
        {filteredPosts.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-300">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
