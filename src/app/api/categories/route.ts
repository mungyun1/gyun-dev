import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "카테고리 목록을 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "이름과 slug는 필수 입력 항목입니다." },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "이미 존재하는 이름입니다." },
        { status: 400 }
      );
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

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "카테고리 생성에 실패했습니다." },
      { status: 500 }
    );
  }
}
