import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(
  request: Request,
  context: { params: { slug: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });
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
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });
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
        thumbnail_url: data.thumbnail_url,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug)
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
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });
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
