import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import SocialLinks from "@/components/SocialLinks";
import { AuthProvider } from "@/contexts/AuthContext";
import TopTags from "@/components/TopTags";
import { getPosts } from "@/lib/posts";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import SEOOptimizer from "@/components/SEOOptimizer";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeScript from "@/components/ThemeScript";

const inter = Inter({ subsets: ["latin"] });

interface Post {
  slug: string;
  title: string;
  created_at: string;
}

export const metadata: Metadata = {
  title: {
    default: "gyun-dev - 문균의 개발 블로그",
    template: "%s",
  },
  description:
    "문균의 개발 블로그입니다. Next.js, React, TypeScript 등 프론트엔드 개발 관련 글과 다양한 기술 이야기를 공유합니다.",
  keywords: [
    "개발",
    "프로그래밍",
    "웹개발",
    "프론트엔드",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "기술블로그",
  ],
  authors: [{ name: "문균 (Mun Gyun)" }],
  creator: "문균 (Mun Gyun)",
  publisher: "gyun-dev",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://gyun-dev.co.kr"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://gyun-dev.co.kr",
    siteName: "gyun-dev",
    title: "gyun-dev - 문균의 개발 블로그",
    description:
      "문균의 개발 블로그입니다. Next.js, React, TypeScript 등 프론트엔드 개발 관련 글과 다양한 기술 이야기를 공유합니다.",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL || "https://gyun-dev.co.kr"
        }/Profile.png`,
        width: 1200,
        height: 630,
        alt: "gyun-dev - 문균의 개발 블로그",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "gyun-dev - 문균의 개발 블로그",
    description:
      "문균의 개발 블로그입니다. Next.js, React, TypeScript 등 프론트엔드 개발 관련 글과 다양한 기술 이야기를 공유합니다.",
    images: [
      `${
        process.env.NEXT_PUBLIC_APP_URL || "https://gyun-dev.co.kr"
      }/Profile.png`,
    ],
    creator: "@gyun_dev",
    site: "@gyun_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon.ico",
      },
    ],
  },
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const recentPosts = await getPosts(3);

  return (
    <html lang="ko">
      <head>
        <ThemeScript />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${inter.className} bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100`}
      >
        <GoogleAnalytics />
        <PerformanceMonitor />
        <SEOOptimizer />
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <div className="min-h-screen bg-white dark:bg-slate-900">
              <div className="flex relative">
                {/* 왼쪽 프로필 사이드바 - 768px 이상에서만 표시 */}
                <aside className="hidden md:block fixed top-16 left-0 w-64 bg-white dark:bg-slate-800 border-r dark:border-slate-700 h-[calc(100vh-4rem)]">
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
                        Mun Gyun🧑‍💻
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
                <main className="w-full min-h-[calc(100vh-4rem)] mt-16 px-4 py-6 md:px-8 md:ml-64 xl:mr-80">
                  <div className="w-full max-w-4xl mx-auto">{children}</div>
                </main>

                {/* 오른쪽 사이드바 - 1200px 이상에서만 표시 */}
                <aside className="hidden xl:block fixed top-16 right-0 w-80 bg-white dark:bg-slate-800 border-l dark:border-slate-700 h-[calc(100vh-4rem)] overflow-y-auto z-40">
                  <div className="p-6">
                    {/* 최근 업데이트 섹션 */}
                    <section className="mb-12">
                      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                        Recently Updated
                      </h2>
                      <div className="space-y-5">
                        {recentPosts.length > 0 ? (
                          recentPosts.map((post: Post) => (
                            <Link
                              key={post.slug}
                              href={`/posts/${post.slug}`}
                              className="group block bg-gray-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 transition-all duration-200 hover:shadow-md"
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></div>
                                <time className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                  {new Date(post.created_at).toLocaleDateString(
                                    "ko-KR",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </time>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="min-w-0 flex-1">
                                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {post.title}
                                  </h3>
                                </div>
                                <div className="flex-shrink-0 text-blue-500 dark:text-blue-400">
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              </div>
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
