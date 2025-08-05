import { getPosts } from "@/lib/posts";
import { getCategories } from "@/lib/categories";
import { getAllTags } from "@/lib/tags";

export async function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  // 정적 페이지들
  const staticPages = [
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/categories", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/tags", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/search", priority: 0.6, changeFrequency: "daily" as const },
  ];

  // 동적 페이지들
  const posts = await getPosts();
  const categories = await getCategories();
  const tags = await getAllTags();

  const sitemap = [
    // 정적 페이지들
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),

    // 블로그 포스트들
    ...posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // 카테고리 페이지들
    ...categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),

    // 태그 페이지들
    ...tags.map((tag) => ({
      url: `${baseUrl}/tags/${encodeURIComponent(tag.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];

  return sitemap;
}

// RSS 피드용 사이트맵 (간소화된 버전)
export async function generateRSSSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const posts = await getPosts();

  return posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    title: post.title,
    description: post.summary,
    publishedAt: post.created_at,
  }));
}
