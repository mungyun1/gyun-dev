import { getPosts } from "@/lib/posts";
import { getCategories } from "@/lib/categories";
import { getAllTags } from "@/lib/tags";

export async function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // 정적 페이지들
  const staticPages = ["", "/about", "/categories", "/tags", "/search"];

  // 동적 페이지들
  const posts = await getPosts();
  const categories = await getCategories();
  const tags = await getAllTags();

  const sitemap = [
    // 정적 페이지들
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: page === "" ? 1 : 0.8,
    })),

    // 블로그 포스트들
    ...posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),

    // 카테고리 페이지들
    ...categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),

    // 태그 페이지들
    ...tags.map((tag) => ({
      url: `${baseUrl}/tags/${encodeURIComponent(tag.name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  ];

  return sitemap;
}
