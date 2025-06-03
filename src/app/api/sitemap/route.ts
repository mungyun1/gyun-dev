import { getPosts } from "@/lib/posts";
import { getCategories } from "@/lib/categories";
import { NextResponse } from "next/server";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

interface SitemapLink {
  url: string;
  changefreq: string;
  priority: number;
  lastmod?: string;
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const posts = await getPosts();
    const categories = await getCategories();

    const links: SitemapLink[] = [
      { url: "/", changefreq: "daily", priority: 1 },
      { url: "/about", changefreq: "monthly", priority: 0.8 },
      { url: "/search", changefreq: "weekly", priority: 0.7 },
    ];

    // 블로그 포스트 URL 추가
    posts.forEach((post) => {
      links.push({
        url: `/posts/${post.slug}`,
        changefreq: "weekly",
        priority: 0.6,
        lastmod: new Date(post.created_at).toISOString(),
      });
    });

    // 카테고리 URL 추가
    categories.forEach((category) => {
      links.push({
        url: `/categories/${category.slug}`,
        changefreq: "weekly",
        priority: 0.5,
      });
    });

    const stream = new SitemapStream({ hostname: siteUrl });
    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    return new NextResponse(xmlString, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
