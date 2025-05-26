import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", params.slug)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "게시물을 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("user_id")
      .eq("slug", params.slug)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (post.user_id !== session.data.session.user.id) {
      return NextResponse.json(
        { error: "게시물을 수정할 권한이 없습니다." },
        { status: 403 }
      );
    }

    const { error: updateError } = await supabase
      .from("posts")
      .update(data)
      .eq("slug", params.slug);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "게시물 수정에 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("user_id")
      .eq("slug", params.slug)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: "게시물을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    if (post.user_id !== session.data.session.user.id) {
      return NextResponse.json(
        { error: "게시물을 삭제할 권한이 없습니다." },
        { status: 403 }
      );
    }

    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("slug", params.slug);

    if (deleteError) throw deleteError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "게시물 삭제에 실패했습니다." },
      { status: 500 }
    );
  }
}
