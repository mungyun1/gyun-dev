import { supabase } from "@/lib/supabase";
import PostCard from "@/components/PostCard";

async function getPosts() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories:categories_id (
        name
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  // 날짜 데이터 확인
  console.log("First post created_at:", posts[0]?.created_at);
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12">
        Recent Posts
      </h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            slug={post.slug}
            summary={post.summary}
            content={post.content}
            created_at={post.created_at}
            categories={post.categories}
          />
        ))}
      </div>
    </main>
  );
}
