"use client";

import { useState, useEffect } from "react";
import { createClientSupabaseClient } from "@/lib/supabase/client";
import { clearServerSession } from "@/lib/actions";

export default function LogoutButton() {
  const [supabase, setSupabase] = useState<any>(null);

  useEffect(() => {
    // 클라이언트에서만 Supabase 클라이언트 생성
    const client = createClientSupabaseClient();
    setSupabase(client);
  }, []);

  const handleLogout = async () => {
    if (!supabase) return;

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
