import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // admin 경로에 대한 요청인 경우에만 검사
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const accessToken = request.cookies.get("sb-access-token");
    const user = request.cookies.get("sb-user");

    // 인증되지 않은 사용자인 경우
    if (!accessToken || !user) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
