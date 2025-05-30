import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");

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

    const { data: posts, error } = await query;

    if (error) throw error;

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "게시물 목록을 불러오는데 실패했습니다." },
      { status: 500 }
    );
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
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
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

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "게시물 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
