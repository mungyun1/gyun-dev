import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import { getPost } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import Comments from "@/components/Comments";
import { createPostSchema } from "@/utils/schema";
import Script from "next/script";
import { Metadata } from "next";
import { Suspense } from "react";

interface PostPageProps {
  params: {
    slug: string;
  };
}

// 스켈레톤 UI 컴포넌트
function PostPageSkeleton() {
  return (
    <main className="min-h-screen w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
      {/* 네비게이션 스켈레톤 */}
      <nav className="flex items-center mb-8 sm:mb-12 w-full">
        <div className="flex items-center text-sm sm:text-base text-gray-600 animate-pulse">
          <div className="w-4 h-4 mr-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </nav>

      <article className="w-full">
        {/* 게시물 헤더 스켈레톤 */}
        <header className="">
          {/* 제목 스켈레톤 */}
          <div className="mb-4 sm:mb-6 space-y-3">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
          </div>

          {/* 메타 정보 스켈레톤 */}
          <div className="flex flex-wrap gap-y-2 items-center text-sm sm:text-base">
            <div className="flex items-center mr-6 animate-pulse">
              <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
              <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex items-center mr-6 animate-pulse">
              <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex items-center animate-pulse">
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
              <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </header>

        {/* 게시물 본문 스켈레톤 */}
        <div className="w-full">
          <div className="w-full max-w-none space-y-4">
            {/* 단락 스켈레톤 */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
              </div>
            ))}

            {/* 코드 블록 스켈레톤 */}
            <div className="my-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>

            {/* 추가 단락 */}
            {[...Array(4)].map((_, index) => (
              <div key={`extra-${index}`} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </article>

      {/* 댓글 섹션 스켈레톤 */}
      <div className="mt-12">
        <div className="w-full border-t border-gray-200 dark:border-gray-800">
          <div className="py-8">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-6 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  return {
    title: `${post.title} | gyun-dev`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/posts/${slug}`,
      type: "article",
      publishedTime: post.created_at,
      images: post.thumbnail_url
        ? [
            {
              url: post.thumbnail_url.startsWith("http")
                ? post.thumbnail_url
                : `${
                    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
                  }${post.thumbnail_url}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  const category = await getCategory(post.category_id);

  return (
    <>
      <Script
        id="post-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            createPostSchema(
              post.title,
              post.summary,
              slug,
              post.created_at,
              post.thumbnail_url,
              post.tags
            )
          ),
        }}
      />
      <Suspense fallback={<PostPageSkeleton />}>
        <main className="min-h-screen w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
          <nav className="flex items-center mb-8 sm:mb-12 w-full">
            <Link
              href="/"
              className="flex items-center text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              뒤로가기
            </Link>
          </nav>

          <article className="w-full">
            {/* 게시물 헤더 */}
            <header className="mb-8 sm:mb-12 pb-6 sm:pb-8 dark:border-gray-700">
              <h1 className="text-2xl lg:text-4xl font-bold mb-4 sm:mb-6 break-keep leading-tight text-gray-900 dark:text-white">
                {post.title}
              </h1>
              <div className="flex flex-wrap gap-y-2 items-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
                <div className="flex items-center mr-6">
                  <span className="text-gray-400 dark:text-gray-500">
                    Posted
                  </span>
                  <span className="mx-2 text-gray-600 dark:text-gray-300">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center mr-6">
                  <span className="text-gray-400 dark:text-gray-500">
                    Author
                  </span>
                  <span className="mx-2 text-gray-600 dark:text-gray-300">
                    Mun Gyun
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-400 dark:text-gray-500">
                    Category
                  </span>
                  <span className="mx-2 text-gray-600 dark:text-gray-300">
                    {category.name}
                  </span>
                </div>
              </div>
            </header>

            {/* 게시물 본문 */}
            <div className="w-full">
              <div className="w-full max-w-none">
                <MarkdownContent content={post.content} />
              </div>
            </div>
          </article>

          <div className="mt-12">
            <Comments />
          </div>
        </main>
      </Suspense>
    </>
  );
}
