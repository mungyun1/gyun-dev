import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import { getPost } from "@/lib/posts";
import { getCategory } from "@/lib/categories";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  const category = await getCategory(post.category_id);

  return (
    <main className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center">
      <nav className="flex items-center max-w-4xl mb-8 sm:mb-12 w-full">
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

      <article className="max-w-4xl">
        {/* 게시물 헤더 */}
        <div className="mb-8 sm:mb-12 pb-6 sm:pb-8">
          <h1 className="text-2xl lg:text-4xl font-bold mb-4 sm:mb-6 break-keep leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-y-2 items-center text-sm sm:text-base text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <span className="text-gray-400 dark:text-gray-500">Posted</span>
              <span className="mx-2 text-gray-600 dark:text-gray-300">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-400 dark:text-gray-500">Author</span>
              <span className="mx-2 text-gray-600 dark:text-gray-300">
                Mun Gyun
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-400 dark:text-gray-500">Category</span>
              <span className="mx-2 text-gray-600 dark:text-gray-300">
                {category.name}
              </span>
            </div>
          </div>
        </div>

        {/* 게시물 본문 */}
        <div className="pt-4 sm:pt-6">
          <div className="prose prose-lg sm:prose-xl dark:prose-invert mx-auto">
            <MarkdownContent content={post.content} />
          </div>
        </div>

        {/* 댓글 섹션 */}
        {/* <Comments slug={params.slug} /> */}
      </article>
    </main>
  );
}
