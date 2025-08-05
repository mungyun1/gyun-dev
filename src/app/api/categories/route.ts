import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// CORS 헤더를 추가하는 헬퍼 함수
function addCorsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const response = NextResponse.json(categories);
    return addCorsHeaders(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    const response = NextResponse.json(
      { error: "카테고리 목록을 가져오는데 실패했습니다." },
      { status: 500 }
    );
    return addCorsHeaders(response);
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({
      cookies,
    });
    const body = await request.json();
    const { name } = body;

    if (!name) {
      const response = NextResponse.json(
        { error: "이름과 slug는 필수 입력 항목입니다." },
        { status: 400 }
      );
      return addCorsHeaders(response);
    }

    // 중복 체크
    const { data: existingCategory, error: checkError } = await supabase
      .from("categories")
      .select("id")
      .or(`name.eq.${name}`)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError;
    }

    if (existingCategory) {
      const response = NextResponse.json(
        { error: "이미 존재하는 이름입니다." },
        { status: 400 }
      );
      return addCorsHeaders(response);
    }

    // 카테고리 생성
    const { data: category, error } = await supabase
      .from("categories")
      .insert({
        name,
      })
      .select()
      .single();

    if (error) throw error;

    const response = NextResponse.json(category, { status: 201 });
    return addCorsHeaders(response);
  } catch (error) {
    console.error("Error creating category:", error);
    const response = NextResponse.json(
      { error: "카테고리 생성에 실패했습니다." },
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
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
