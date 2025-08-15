import { NextResponse } from "next/server";
import { validateAndExtendSession } from "@/lib/actions";

export async function POST() {
  try {
    const success = await validateAndExtendSession();

    if (success) {
      return NextResponse.json({ message: "세션이 연장되었습니다." });
    } else {
      return NextResponse.json(
        { error: "세션 연장에 실패했습니다. 다시 로그인해주세요." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("세션 연장 실패:", error);
    return NextResponse.json(
      { error: "세션 연장에 실패했습니다." },
      { status: 500 }
    );
  }
}
