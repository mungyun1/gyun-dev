import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 메인 컨텐츠 */}
      <div className="pt-16 flex min-h-screen">
        {/* 메인 콘텐츠 - 게시물 리스트 */}
        <main className="ml-64 flex-1 p-8 mr-80">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
            <div className="space-y-8">
              {/* 게시물 카드 */}
              <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">
                  <Link
                    href="/posts/certificate-bbg2"
                    className="hover:text-blue-600"
                  >
                    (데이터 자격증) 빅데이터 분석기사 실기시험 준비 후기와 팁
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  3줄 요약 어떤 시험? 빅데이터 분석 자격 중명을 위해 새롭게
                  개설된 자격 시험 공부법...
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Jul 18, 2022</span>
                  <span className="mx-2">•</span>
                  <Link href="#" className="hover:text-blue-600">
                    자격개시판
                  </Link>
                  <span className="mx-2">•</span>
                  <Link href="#" className="hover:text-blue-600">
                    자기개발
                  </Link>
                </div>
              </article>

              <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">
                  <Link
                    href="/posts/certificate-it1"
                    className="hover:text-blue-600"
                  >
                    (IT 자격증) 정보처리기사 실기시험 준비 후기와 팁
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  3줄 요약 어떤 시험? 유서깊은 IT 근본 국가공인 자격증 공부법...
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Jul 15, 2022</span>
                  <span className="mx-2">•</span>
                  <Link href="#" className="hover:text-blue-600">
                    자격개시판
                  </Link>
                  <span className="mx-2">•</span>
                  <Link href="#" className="hover:text-blue-600">
                    자기개발
                  </Link>
                </div>
              </article>

              <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">
                  <Link
                    href="/posts/github-blog-1"
                    className="hover:text-blue-600"
                  >
                    Github 블로그 만들기 - 1. 시작하기
                  </Link>
                </h3>
                <p className="text-gray-600 mb-4">
                  Github Pages를 이용한 블로그 만들기 시리즈를 시작합니다...
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Jul 10, 2022</span>
                  <span className="mx-2">•</span>
                  <Link href="#" className="hover:text-blue-600">
                    개발
                  </Link>
                  <span className="mx-2">•</span>
                  <Link href="#" className="hover:text-blue-600">
                    블로그
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </main>

        {/* 오른쪽 사이드바 */}
        <aside className="w-80 bg-white border-l p-6 fixed right-0 h-[calc(100vh-4rem)] top-16 overflow-y-auto">
          {/* 최근 업데이트 섹션 */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Recently Updated</h2>
            <div className="space-y-4">
              <Link href="#" className="block hover:bg-gray-50 p-2 rounded">
                <h3 className="text-sm font-semibold">
                  (IT 자격증) 정보처리기사 실기시험 준비
                </h3>
                <p className="text-xs text-gray-600">3줄 요약 어떤 시험?...</p>
              </Link>
              <Link href="#" className="block hover:bg-gray-50 p-2 rounded">
                <h3 className="text-sm font-semibold">
                  (데이터 자격증) 빅데이터 분석기사 실기
                </h3>
                <p className="text-xs text-gray-600">3줄 요약 어떤 시험?...</p>
              </Link>
            </div>
          </section>

          {/* 트렌딩 태그 섹션 */}
          <section>
            <h2 className="text-xl font-bold mb-4">Trending Tags</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="#"
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                자격증
              </Link>
              <Link
                href="#"
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                빅데이터
              </Link>
              <Link
                href="#"
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                GitHub
              </Link>
              <Link
                href="#"
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                blog
              </Link>
              <Link
                href="#"
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
              >
                실기시험
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
