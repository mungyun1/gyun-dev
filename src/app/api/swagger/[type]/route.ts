import { NextResponse } from "next/server";
import postsSpec from "../posts.json";
import categoriesSpec from "../categories.json";

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const { type } = params;

  if (type === "posts") {
    return NextResponse.json(postsSpec);
  } else if (type === "categories") {
    return NextResponse.json(categoriesSpec);
  }

  return NextResponse.json({ error: "Invalid API type" }, { status: 404 });
}
