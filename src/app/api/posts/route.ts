import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// CORS 헤더를 추가하는 헬퍼 함수
function addCorsHeaders(response: NextResponse) {
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://www.gyun-dev.co.kr"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");
    const limit = searchParams.get("limit");

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    let query = supabase.from("posts").select("*");

    // ids 파라미터가 있으면 해당 ID들의 포스트만 조회
    if (ids) {
      const postIds = ids.split(",").map(Number);
      query = query.in("id", postIds);
    }

    // 생성일 기준 내림차순 정렬
    query = query.order("created_at", { ascending: false });

    // limit 파라미터가 있으면 해당 개수만큼, 없으면 기본값 3개
    const limitCount = limit ? parseInt(limit) : 3;
    query = query.limit(limitCount);

    const { data: posts, error } = await query;

    if (error) throw error;

    const response = NextResponse.json(posts);
    return addCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching posts:", error);
    const response = NextResponse.json(
      { error: "게시물 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // 현재 로그인한 사용자 정보 가져오기
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      const response = NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
      return addCorsHeaders(response);
    }

    const data = await request.json();

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        ...data,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    const response = NextResponse.json(post);
    return addCorsHeaders(response);
  } catch (error) {
    console.error("Error creating post:", error);
    const response = NextResponse.json(
      { error: "게시물 생성에 실패했습니다." },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}

// OPTIONS 요청 처리 (preflight 요청)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "https://www.gyun-dev.co.kr",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400",
    },
  });
}
