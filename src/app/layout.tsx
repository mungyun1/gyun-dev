import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import SocialLinks from "@/components/SocialLinks";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { supabase } from "@/lib/supabase";
import TopTags from "@/components/TopTags";

const inter = Inter({ subsets: ["latin"] });

interface Post {
  slug: string;
  title: string;
  summary: string;
  created_at: string;
}

// 최근 게시물을 가져오는 함수
async function getRecentPosts() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const { data: posts, error } = await supabase
    .from("posts")
    .select("slug, title, summary, created_at")
    .gte("created_at", threeDaysAgo.toISOString())
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }

  return posts;
}

export const metadata: Metadata = {
  title: "Gyun's Dev",
  description: "문균의 개발 블로그",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const recentPosts = await getRecentPosts();

  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Header />
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
              <div className="flex relative">
                {/* 왼쪽 프로필 사이드바 - 데스크톱에서만 표시 */}
                <aside className="hidden lg:block fixed top-16 left-0 w-64 bg-white dark:bg-slate-800 border-r dark:border-slate-700 h-[calc(100vh-4rem)]">
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 mb-4">
                        <Link href="/about">
                          <Image
                            src="/Profile.png"
                            alt="Profile"
                            width={128}
                            height={128}
                            className="object-cover cursor-pointer hover:opacity-80 transition-opacity"
                            priority
                          />
                        </Link>
                      </div>
                      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        Mun Gyun
                      </h1>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Think Different
                      </p>
                    </div>

                    <SocialLinks />

                    <nav className="mt-8">
                      <Link
                        href="/"
                        className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-center"
                      >
                        HOME
                      </Link>
                      <Link
                        href="/categories"
                        className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-center"
                      >
                        CATEGORIES
                      </Link>
                      <Link
                        href="/tags"
                        className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-center"
                      >
                        TAGS
                      </Link>
                      <Link
                        href="/about"
                        className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-center"
                      >
                        ABOUT
                      </Link>
                    </nav>
                  </div>
                </aside>

                {/* 메인 콘텐츠 영역 */}
                <main className="w-full min-h-[calc(100vh-4rem)] mt-16 px-4 py-8 lg:px-14 lg:ml-64 lg:mr-80">
                  <div className="max-w-5xl mx-auto">{children}</div>
                </main>

                {/* 오른쪽 사이드바 - 데스크톱에서만 표시 */}
                <aside className="hidden lg:block fixed top-16 right-0 w-80 bg-white dark:bg-slate-800 border-l dark:border-slate-700 h-[calc(100vh-4rem)] overflow-y-auto z-40">
                  <div className="p-6">
                    {/* 최근 업데이트 섹션 */}
                    <section className="mb-12">
                      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                        Recently Updated
                      </h2>
                      <div className="space-y-4">
                        {recentPosts.length > 0 ? (
                          recentPosts.map((post: Post) => (
                            <Link
                              key={post.slug}
                              href={`/posts/${post.slug}`}
                              className="block hover:bg-gray-50 dark:hover:bg-slate-700 p-2 rounded"
                            >
                              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {post.title}
                              </h3>
                              <p className="text-xs text-gray-600 dark:text-gray-300">
                                {post.summary}
                              </p>
                            </Link>
                          ))
                        ) : (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            최근 작성된 게시물이 없습니다.
                          </p>
                        )}
                      </div>
                    </section>

                    {/* 트렌딩 태그 섹션 */}

                    <TopTags />
                  </div>
                </aside>
              </div>
            </div>
            {modal}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
