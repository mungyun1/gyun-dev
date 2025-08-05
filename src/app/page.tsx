import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/posts";
import { Metadata } from "next";
import { createWebsiteSchema } from "@/utils/schema";
import Script from "next/script";
import { Suspense } from "react";

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

// 홈페이지 스켈레톤 UI 컴포넌트
function HomePageSkeleton() {
  return (
    <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 2xl:gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden animate-pulse"
          >
            {/* 썸네일 스켈레톤 */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="absolute top-4 left-4 w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>

            {/* 콘텐츠 스켈레톤 */}
            <div className="p-4 sm:p-6">
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

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
      <Suspense fallback={<HomePageSkeleton />}>
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
      </Suspense>
    </>
  );
}
