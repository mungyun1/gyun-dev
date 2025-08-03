import { getPosts } from "@/lib/posts";
import { generateRSSSitemap } from "@/utils/sitemap";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const posts = await generateRSSSitemap();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>gyun-dev - 문균의 개발 블로그</title>
    <description>문균의 개발 블로그입니다. Next.js, React, TypeScript 등 프론트엔드 개발 관련 글과 다양한 기술 이야기를 공유합니다.</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <ttl>60</ttl>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${post.url}</link>
      <guid>${post.url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
