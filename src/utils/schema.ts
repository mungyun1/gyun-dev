// 블로그 포스트용 JSON-LD 스키마
export const createPostSchema = (
  title: string,
  description: string,
  slug: string,
  publishedAt: string,
  image?: string,
  tags?: string[]
) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description: description,
  image: image
    ? image.startsWith("http")
      ? image
      : `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${image}`
    : undefined,
  author: {
    "@type": "Person",
    name: "문균 (Mun Gyun)",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/about`,
    jobTitle: "Frontend Developer",
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Frontend Development",
    ],
  },
  publisher: {
    "@type": "Organization",
    name: "Gyun's Dev",
    logo: {
      "@type": "ImageObject",
      url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/Profile.png`,
      width: 1200,
      height: 630,
    },
  },
  datePublished: publishedAt,
  dateModified: publishedAt,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/posts/${slug}`,
  },
  keywords: tags ? tags.join(", ") : "개발, 프로그래밍, 웹개발, 프론트엔드",
  articleSection: "개발",
  inLanguage: "ko-KR",
  isAccessibleForFree: true,
  wordCount: description.length,
});

// 웹사이트용 JSON-LD 스키마
export const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "gyun-dev",
  description:
    "문균의 개발 블로그입니다. Next.js, React, TypeScript 등 프론트엔드 개발 관련 글과 다양한 기술 이야기를 공유합니다.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  inLanguage: "ko-KR",
  author: {
    "@type": "Person",
    name: "문균 (Mun Gyun)",
    jobTitle: "Frontend Developer",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/about`,
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Frontend Development",
    ],
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "Gyun's Dev",
    logo: {
      "@type": "ImageObject",
      url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/Profile.png`,
      width: 1200,
      height: 630,
    },
  },
});

// About 페이지용 JSON-LD 스키마
export const createPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "문균 (Mun Gyun)",
  jobTitle: "Frontend Developer",
  description:
    "UX을 최우선으로 고려하며, 세세한 인터랙션까지 신경쓰는 개발자입니다.",
  url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/about`,
  image: `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/Profile2.png`,
  sameAs: ["https://github.com/gyun-dev", "https://linkedin.com/in/gyun-dev"],
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Frontend Development",
    "Web Development",
    "UI/UX Design",
    "Responsive Design",
  ],
  worksFor: {
    "@type": "Organization",
    name: "gyun-dev",
  },
  alumniOf: {
    "@type": "Organization",
    name: "개발자 커뮤니티",
  },
});

// 블로그용 JSON-LD 스키마
export const createBlogSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "gyun-dev",
  description:
    "문균의 개발 블로그입니다. Next.js, React, TypeScript 등 프론트엔드 개발 관련 글과 다양한 기술 이야기를 공유합니다.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  inLanguage: "ko-KR",
  author: {
    "@type": "Person",
    name: "문균 (Mun Gyun)",
    jobTitle: "Frontend Developer",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/about`,
  },
  publisher: {
    "@type": "Organization",
    name: "Gyun's Dev",
    logo: {
      "@type": "ImageObject",
      url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/Profile.png`,
      width: 1200,
      height: 630,
    },
  },
  blogPost: [], // 동적으로 채워질 예정
});

// Breadcrumb용 JSON-LD 스키마
export const createBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${
      item.url
    }`,
  })),
});

// FAQ용 JSON-LD 스키마
export const createFAQSchema = (
  questions: Array<{ question: string; answer: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer,
    },
  })),
});
