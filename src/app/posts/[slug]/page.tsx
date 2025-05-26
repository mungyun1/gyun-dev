import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Comments from "@/components/Comments";

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, profiles(name)")
    .eq("slug", slug)
    .single();

  if (error) {
    notFound();
  }

  return post;
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  return (
    <main className="p-8">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="text-gray-300">›</span>
        <span className="text-gray-900">{post.title}</span>
      </nav>

      <article className="max-w-3xl">
        {/* 게시물 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <span>Posted</span>
              <span className="mx-2">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span>Author</span>
              <span className="mx-2">{post.profiles?.name}</span>
            </div>
          </div>
        </div>

        {/* 3줄 요약 섹션 */}
        <div className="bg-gray-50 dark:bg-slate-800/50 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="font-bold text-lg">3줄 요약</span>
          </div>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <span className="font-semibold">어떤 시험?</span> 빅데이터 분석
              자격 증명을 위해 새롭게 개설된 자격 시험
            </p>
            <p>
              <span className="font-semibold">공부법?</span> 수험서로 개념 잡고
              계급 문제풀이
            </p>
            <p>
              <span className="font-semibold">이것만은 꼭!</span> 코드는 절대
              눈으로만 보지 마시고 직접 타이핑 해보세요
            </p>
          </div>
        </div>

        {/* 게시물 본문 */}
        <div className="prose prose-lg max-w-none">{post.content}</div>

        {/* 댓글 섹션 */}
        <Comments slug={params.slug} />
      </article>
    </main>
  );
}
