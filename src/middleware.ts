import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // API 경로에 대한 CORS 처리
  if (request.nextUrl.pathname.startsWith("/api")) {
    const response = NextResponse.next();

    // CORS 헤더 설정
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // OPTIONS 요청 처리
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
  }

  // admin 경로에 대한 요청인 경우에만 검사
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res });

    // 세션 확인
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // 인증되지 않은 사용자인 경우
    if (!session) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/:path*"],
};
