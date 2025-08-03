import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/posts";
import { Metadata } from "next";
import { createWebsiteSchema } from "@/utils/schema";
import Script from "next/script";

export const metadata: Metadata = {
  title: "홈 | gyun-dev",
  description:
    "문균의 개발 블로그입니다. 최신 개발 관련 글과 기술 이야기를 확인하세요.",
  openGraph: {
    title: "홈 | gyun-dev",
    description:
      "문균의 개발 블로그입니다. 최신 개발 관련 글과 기술 이야기를 확인하세요.",
    url: "/",
  },
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createWebsiteSchema()),
        }}
      />
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Posts
          </h1>
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
    </>
  );
}
