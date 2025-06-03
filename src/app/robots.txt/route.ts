import { NextResponse } from "next/server";

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /
Sitemap: ${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml

# Naver Search Advisor
User-agent: Yeti
Allow: /
  `.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
