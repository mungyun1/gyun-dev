import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import { getPost } from "@/lib/posts";
import { getCategory } from "@/lib/categories";
import Comments from "@/components/Comments";
import { createPostSchema } from "@/utils/schema";
import Script from "next/script";
import { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string;
  };
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
      <main className="min-h-screen w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
        <nav className="flex items-center mb-8 sm:mb-12 w-full">
          <Link
            href="/"
            className="flex items-center text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors"
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
          <header className="mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4 sm:mb-6 break-keep leading-tight text-gray-900 dark:text-white">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-y-2 items-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
              <div className="flex items-center mr-6">
                <span className="text-gray-400 dark:text-gray-500">Posted</span>
                <span className="mx-2 text-gray-600 dark:text-gray-300">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center mr-6">
                <span className="text-gray-400 dark:text-gray-500">Author</span>
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
    </>
  );
}
