import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  const tagName = searchParams.get("name");

  // GET /api/tags?path=top - 상위 5개 태그
  if (path === "top") {
    const { data: posts, error } = await supabase.from("posts").select("tags");

    if (error) {
      return NextResponse.json(
        { error: "태그 조회 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    const allTags = posts.reduce<string[]>((acc, post) => {
      if (post.tags) {
        acc.push(...post.tags);
      }
      return acc;
    }, []);

    const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

    const topTags = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 5);

    return NextResponse.json(topTags);
  }

  // GET /api/tags?name=태그이름 - 특정 태그의 게시물
  if (tagName) {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .contains("tags", [tagName])
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "게시물 조회 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(posts);
  }

  // GET /api/tags - 모든 태그 목록
  const { data: posts, error } = await supabase.from("posts").select("tags");

  if (error) {
    return NextResponse.json(
      { error: "태그 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }

  const allTags = posts.reduce<string[]>((acc, post) => {
    if (post.tags) {
      acc.push(...post.tags);
    }
    return acc;
  }, []);

  const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  const tags = Object.entries(tagCounts).map(([name, count]) => ({
    name,
    count,
  }));

  return NextResponse.json(tags);
}
