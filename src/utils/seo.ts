import { Metadata } from "next";

// 기본 SEO 설정
export const defaultSEO: Metadata = {
  title: {
    default: "gyun-dev - 문균의 개발 블로그",
    template: "%s | gyun-dev",
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
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "gyun-dev",
    title: "gyun-dev - 문균의 개발 블로그",
    description:
      "문균의 개발 블로그입니다. Next.js, React, TypeScript 등 프론트엔드 개발 관련 글과 다양한 기술 이야기를 공유합니다.",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
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
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

// 페이지별 SEO 설정을 위한 헬퍼 함수
export const createPageSEO = (
  title: string,
  description: string,
  url?: string,
  image?: string,
  keywords?: string[]
): Metadata => ({
  title,
  description,
  keywords: keywords || ["개발", "프로그래밍", "웹개발", "프론트엔드"],
  alternates: {
    canonical: url
      ? `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${url}`
      : undefined,
  },
  openGraph: {
    title,
    description,
    url: url
      ? `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${url}`
      : undefined,
    images: image
      ? [
          {
            url: image.startsWith("http")
              ? image
              : `${
                  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
                }${image}`,
            width: 1200,
            height: 630,
            alt: title,
            type: "image/png",
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: image
      ? [
          image.startsWith("http")
            ? image
            : `${
                process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
              }${image}`,
        ]
      : undefined,
  },
});

// 블로그 포스트용 SEO 설정
export const createPostSEO = (
  title: string,
  description: string,
  slug: string,
  publishedAt: string,
  image?: string,
  tags?: string[],
  author?: string
): Metadata => ({
  title,
  description,
  keywords: tags || ["개발", "프로그래밍", "웹개발"],
  authors: [{ name: author || "문균 (Mun Gyun)" }],
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/posts/${slug}`,
  },
  openGraph: {
    title,
    description,
    url: `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/posts/${slug}`,
    type: "article",
    publishedTime: publishedAt,
    modifiedTime: publishedAt,
    authors: [author || "문균 (Mun Gyun)"],
    tags: tags || [],
    images: image
      ? [
          {
            url: image.startsWith("http")
              ? image
              : `${
                  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
                }${image}`,
            width: 1200,
            height: 630,
            alt: title,
            type: "image/png",
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: image
      ? [
          image.startsWith("http")
            ? image
            : `${
                process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
              }${image}`,
        ]
      : undefined,
  },
});

// 카테고리 페이지용 SEO 설정
export const createCategorySEO = (
  categoryName: string,
  description: string,
  slug: string,
  postCount?: number
): Metadata => ({
  title: `${categoryName} 카테고리`,
  description: `${description}${postCount ? ` (총 ${postCount}개의 글)` : ""}`,
  keywords: [categoryName, "카테고리", "개발", "프로그래밍"],
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/categories/${slug}`,
  },
  openGraph: {
    title: `${categoryName} 카테고리`,
    description: `${description}${
      postCount ? ` (총 ${postCount}개의 글)` : ""
    }`,
    url: `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/categories/${slug}`,
    type: "website",
  },
});

// 태그 페이지용 SEO 설정
export const createTagSEO = (
  tagName: string,
  description: string,
  postCount?: number
): Metadata => ({
  title: `#${tagName} 태그`,
  description: `${description}${postCount ? ` (총 ${postCount}개의 글)` : ""}`,
  keywords: [tagName, "태그", "개발", "프로그래밍"],
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/tags/${encodeURIComponent(tagName)}`,
  },
  openGraph: {
    title: `#${tagName} 태그`,
    description: `${description}${
      postCount ? ` (총 ${postCount}개의 글)` : ""
    }`,
    url: `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/tags/${encodeURIComponent(tagName)}`,
    type: "website",
  },
});

// 검색 페이지용 SEO 설정
export const createSearchSEO = (query?: string): Metadata => ({
  title: query ? `"${query}" 검색 결과` : "검색",
  description: query
    ? `"${query}"에 대한 검색 결과입니다.`
    : "블로그 내 글을 검색해보세요.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/search`,
  },
});
