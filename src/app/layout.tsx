import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import SocialLinks from "@/components/SocialLinks";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gyun's Dev",
  description: "개발 블로그",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <div className="flex bg-gray-50 min-h-screen">
          {/* 왼쪽 프로필 사이드바 */}
          <aside className="fixed top-16 left-0 w-64 bg-white border-r h-[calc(100vh-4rem)]">
            <div className="p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
                  <Image
                    src="/Profile.png"
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover"
                    priority
                  />
                </div>
                <h1 className="text-xl font-bold">Mun Gyun</h1>
                <p className="text-sm text-gray-600">Think Different</p>
              </div>

              <SocialLinks />

              <nav className="space-y-2">
                <Link
                  href="/"
                  className="block py-2 hover:text-blue-600 text-center"
                >
                  HOME
                </Link>
                <Link
                  href="/categories"
                  className="block py-2 hover:text-blue-600 text-center"
                >
                  CATEGORIES
                </Link>
                <Link
                  href="/tags"
                  className="block py-2 hover:text-blue-600 text-center"
                >
                  TAGS
                </Link>
                <Link
                  href="/about"
                  className="block py-2 hover:text-blue-600 text-center"
                >
                  ABOUT
                </Link>
              </nav>
            </div>
          </aside>

          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1 ml-64 mr-80 min-h-[calc(100vh-4rem)] mt-16 p-14">
            {children}
          </main>

          {/* 오른쪽 사이드바 */}
          <aside className="fixed top-16 right-0 w-80 bg-white border-l h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-6">
              {/* 최근 업데이트 섹션 */}
              <section className="mb-12">
                <h2 className="text-xl font-bold mb-4">Recently Updated</h2>
                <div className="space-y-4">
                  <Link
                    href="/posts/certificate-it1"
                    className="block hover:bg-gray-50 p-2 rounded"
                  >
                    <h3 className="text-sm font-semibold">
                      (IT 자격증) 정보처리기사 실기시험 준비
                    </h3>
                    <p className="text-xs text-gray-600">
                      3줄 요약 어떤 시험?...
                    </p>
                  </Link>
                  <Link
                    href="/posts/certificate-bbg2"
                    className="block hover:bg-gray-50 p-2 rounded"
                  >
                    <h3 className="text-sm font-semibold">
                      (데이터 자격증) 빅데이터 분석기사 실기
                    </h3>
                    <p className="text-xs text-gray-600">
                      3줄 요약 어떤 시험?...
                    </p>
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
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}
