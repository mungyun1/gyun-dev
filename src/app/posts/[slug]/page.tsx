import Link from "next/link";
import Comments from "@/components/Comments";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="text-gray-300">›</span>
        <span className="text-gray-900 dark:text-gray-300">
          (데이터 자격증) 빅데이터 분석기사 실기시험 준비 후기와 팁
        </span>
      </nav>

      <article>
        {/* 게시물 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            (데이터 자격증) 빅데이터 분석기사 실기시험 준비 후기와 팁
          </h1>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
            <div className="flex items-center">
              <span>Posted</span>
              <span className="mx-2">Jul 18, 2022</span>
            </div>
            <div className="flex items-center">
              <span>Author</span>
              <span className="mx-2">tiredo</span>
            </div>
            <div className="flex items-center">
              <span>Views</span>
              <span className="mx-2">•</span>
              <span>21 min read</span>
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
        <div className="prose prose-lg max-w-none dark:prose-invert mb-16">
          <p>
            이번 글에서는 빅데이터 분석기사 실기시험에 대한 정보와 공부법을
            소개해 드리겠습니다.
          </p>
          <h2>시험 일정</h2>
          <p>시험 일정과 관련된 상세 내용...</p>
          {/* 추가 본문 내용 */}
        </div>

        {/* 댓글 섹션 */}
        <Comments slug={params.slug} />
      </article>
    </main>
  );
}
