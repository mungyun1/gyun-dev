"use client";

import { supabase } from "@/lib/supabase";
import { clearServerSession } from "@/lib/actions";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      // Supabase 로그아웃
      await supabase.auth.signOut();

      // 서버 세션 클리어
      await clearServerSession();

      // 페이지 새로고침으로 상태 초기화
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
}
