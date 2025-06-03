import { Feed } from "feed";
import { getPosts } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await getPosts();
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const feed = new Feed({
    title: "Gyun's Blog",
    description: "I write about development and other things😎",
    id: siteUrl,
    link: siteUrl,
    language: "ko",
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Gyun`,
    author: {
      name: "Gyun",
      email: "gyunny95@gmail.com",
      link: siteUrl,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/posts/${post.slug}`,
      link: `${siteUrl}/posts/${post.slug}`,
      description: post.summary,
      content: post.content,
      author: [
        {
          name: "Gyun",
          email: "gyunny95@gmail.com",
          link: siteUrl,
        },
      ],
      date: new Date(post.created_at),
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
