import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

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
    const session = await supabase.auth.getSession();
    if (!session.data.session) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        ...data,
        user_id: session.data.session.user.id,
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
