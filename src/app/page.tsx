import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Posts
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xl">
          I write about development and other things😎
        </p>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 2xl:gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              slug={post.slug}
              summary={post.summary}
              created_at={post.created_at}
              categories={post.categories}
              thumbnail_url={post.thumbnail_url}
            />
          ))
        ) : (
          <div className="text-center py-12 md:col-span-2">
            <p className="text-gray-600 dark:text-gray-400">
              아직 작성된 글이 없습니다.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
