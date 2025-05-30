import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { id } = context.params;

    // 카테고리 존재 여부 확인
    const { data: category, error: fetchError } = await supabase
      .from("categories")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: "카테고리를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 해당 카테고리를 사용하는 게시물이 있는지 확인
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("id")
      .eq("category_id", id);

    if (postsError) {
      throw postsError;
    }

    if (posts && posts.length > 0) {
      return NextResponse.json(
        { error: "이 카테고리에 속한 게시물이 있어 삭제할 수 없습니다." },
        { status: 400 }
      );
    }

    // 카테고리 삭제
    const { error: deleteError } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
