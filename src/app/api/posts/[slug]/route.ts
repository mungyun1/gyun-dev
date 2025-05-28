import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// 사용자 인증 체크 함수
async function checkAuth() {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("인증되지 않은 사용자입니다.");
  }

  return { supabase, user };
}

export async function GET(
  request: Request,
  context: { params: { slug: string } }
) {
  try {
    const { supabase } = await checkAuth();
    const { slug } = await context.params;

    // 게시물 조회
    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
      },
      { status: 401 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { slug: string } }
) {
  try {
    const { supabase, user } = await checkAuth();
    const { slug } = await context.params;
    const data = await request.json();

    // 게시물 수정
    const { data: post, error } = await supabase
      .from("posts")
      .update({
        title: data.title,
        content: data.content,
        summary: data.summary,
        slug: data.slug,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug)
      .eq("user_id", user.id) // 자신의 게시물만 수정 가능
      .select()
      .single();

    if (error) {
      console.error("Error updating post:", error);
      return NextResponse.json(
        { error: "게시물 수정에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
      },
      { status: 401 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { slug: string } }
) {
  try {
    const { supabase, user } = await checkAuth();
    const { slug } = await context.params;

    // 게시물 조회
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("user_id")
      .eq("slug", slug)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 자신의 게시물인지 확인
    if (post.user_id !== user.id) {
      return NextResponse.json(
        { error: "게시물을 삭제할 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 게시물 삭제
    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("slug", slug);

    if (deleteError) {
      console.error("Error deleting post:", deleteError);
      return NextResponse.json(
        { error: "게시물 삭제에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
      },
      { status: 401 }
    );
  }
}
