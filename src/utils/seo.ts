import { DefaultSeoProps } from "next-seo";

// 기본 SEO 설정
export const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | Gyun's Dev",
  defaultTitle: "Gyun's Dev - 문균의 개발 블로그",
  description:
    "문균의 개발 블로그입니다. 개발 관련 글과 다양한 기술 이야기를 공유합니다.",
  canonical: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "Gyun's Dev",
    title: "Gyun's Dev - 문균의 개발 블로그",
    description:
      "문균의 개발 블로그입니다. 개발 관련 글과 다양한 기술 이야기를 공유합니다.",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        }/Profile.png`,
        width: 1200,
        height: 630,
        alt: "Gyun's Dev",
      },
    ],
  },
  twitter: {
    handle: "@gyun_dev",
    site: "@gyun_dev",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#3B82F6",
    },
    {
      name: "author",
      content: "문균 (Mun Gyun)",
    },
    {
      name: "keywords",
      content: "개발, 프로그래밍, 웹개발, 프론트엔드, 백엔드, 기술블로그",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
};

// 페이지별 SEO 설정을 위한 헬퍼 함수
export const createPageSEO = (
  title: string,
  description: string,
  url?: string,
  image?: string
) => ({
  title,
  description,
  canonical: url
    ? `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${url}`
    : undefined,
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
          },
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
  tags?: string[]
) => ({
  title,
  description,
  canonical: `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/posts/${slug}`,
  openGraph: {
    title,
    description,
    url: `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/posts/${slug}`,
    type: "article",
    article: {
      publishedTime: publishedAt,
      tags: tags || [],
    },
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
          },
        ]
      : undefined,
  },
  twitter: {
    cardType: "summary_large_image",
  },
});
