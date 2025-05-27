import { supabase } from "@/lib/supabase";
import Link from "next/link";
import SearchInput from "./SearchInput";

interface Post {
  slug: string;
  title: string;
  summary: string;
  created_at: string;
}

async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, title, summary, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  return data || [];
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const posts = await getPosts();
  const searchTerm = searchParams.q || "";

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <SearchInput />

      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block bg-white dark:bg-slate-800 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{post.summary}</p>
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
