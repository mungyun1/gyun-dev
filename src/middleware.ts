import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 쿠키 값에서 만료 시간을 추출하는 함수
function extractExpiryFromCookie(cookieValue: string): Date | null {
  try {
    const data = JSON.parse(cookieValue);
    return data.expires ? new Date(data.expires) : null;
  } catch {
    return null;
  }
}

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

    // 쿠키 만료 시간 확인
    const accessTokenCookie = request.cookies.get("sb-access-token");
    if (accessTokenCookie) {
      const expiry = extractExpiryFromCookie(accessTokenCookie.value);
      if (expiry && new Date() > expiry) {
        // 만료된 쿠키가 있으면 로그인 페이지로 리다이렉트
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set(
          "redirectedFrom",
          request.nextUrl.pathname
        );
        redirectUrl.searchParams.set("reason", "expired");
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/api/:path*"],
};
