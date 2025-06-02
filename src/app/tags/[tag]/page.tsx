import { Metadata } from "next";
import PostList from "@/components/PostList";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsByTag } from "@/lib/tags";

interface Props {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${decodeURIComponent(params.tag)} - Tags | Gyun's Blog`,
    description: `${decodeURIComponent(
      params.tag
    )} 태그와 관련된 모든 게시물을 확인할 수 있습니다.`,
  };
}

export default async function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(decodedTag);

  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white relative">
        <Link
          href="/tags"
          className="inline-flex items-center mb-4 text-sm hover:text-blue-100 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          태그 목록으로 돌아가기
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-3xl">#</span>
          <h1 className="text-3xl font-bold">{decodedTag}</h1>
        </div>
        <p className="mt-3 text-base opacity-90">{posts.length}개의 포스트</p>
      </div>

      <PostList posts={posts} hideActions={true} />
    </div>
  );
}
