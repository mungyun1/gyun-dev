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
  },
  publisher: {
    "@type": "Organization",
    name: "Gyun's Dev",
    logo: {
      "@type": "ImageObject",
      url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/Profile.png`,
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
  keywords: tags ? tags.join(", ") : undefined,
});

// 웹사이트용 JSON-LD 스키마
export const createWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gyun's Dev",
  description:
    "문균의 개발 블로그입니다. 개발 관련 글과 다양한 기술 이야기를 공유합니다.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  author: {
    "@type": "Person",
    name: "문균 (Mun Gyun)",
    jobTitle: "Frontend Developer",
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/about`,
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
  ],
});
