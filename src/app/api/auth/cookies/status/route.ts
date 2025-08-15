import { NextResponse } from "next/server";
import { checkAllAuthCookies } from "@/lib/actions";

export async function GET() {
  try {
    const cookieStatus = await checkAllAuthCookies();

    return NextResponse.json(cookieStatus);
  } catch (error) {
    console.error("쿠키 상태 확인 실패:", error);
    return NextResponse.json(
      { error: "쿠키 상태 확인에 실패했습니다." },
      { status: 500 }
    );
  }
}
