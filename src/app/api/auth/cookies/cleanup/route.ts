import { NextResponse } from "next/server";
import { cleanupExpiredCookies } from "@/lib/actions";

export async function POST() {
  try {
    await cleanupExpiredCookies();

    return NextResponse.json({ message: "만료된 쿠키가 정리되었습니다." });
  } catch (error) {
    console.error("쿠키 정리 실패:", error);
    return NextResponse.json(
      { error: "쿠키 정리에 실패했습니다." },
      { status: 500 }
    );
  }
}
