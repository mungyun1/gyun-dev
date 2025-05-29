import PostCard from "@/components/PostCard";
import { getPosts, Post } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-5xl mx-auto sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Recent Posts
        </h1>
      </div>
      <div className="grid gap-4 sm:gap-6 md:gap-8">
        {posts.length > 0 ? (
          posts.map((post: Post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              slug={post.slug}
              summary={post.summary}
              content={post.content}
              created_at={post.created_at}
              categories={post.categories}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              아직 작성된 글이 없습니다.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
