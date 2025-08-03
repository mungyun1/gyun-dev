"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { setCookie, deleteCookie } from "@/lib/cookies";
import { setServerSession } from "@/lib/actions";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // 인증 상태 변경 리스너 설정
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        // 세션 정보를 쿠키에 저장
        setCookie("sb-access-token", session.access_token);
        setCookie("sb-refresh-token", session.refresh_token);
        setCookie("sb-user", JSON.stringify(session.user));
      } else if (event === "SIGNED_OUT") {
        // 로그아웃 시 쿠키 삭제
        deleteCookie("sb-access-token");
        deleteCookie("sb-refresh-token");
        deleteCookie("sb-user");
      }
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          setMessage("로그인 성공!");

          // 서버 액션을 통해 세션 설정 및 리다이렉트
          await setServerSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            user: data.session.user,
          });
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;

        if (data.session) {
          setMessage("회원가입 및 로그인 성공!");
          await setServerSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            user: data.session.user,
          });
        } else {
          setMessage("회원가입 성공! 이메일을 확인해주세요.");
        }
      }
    } catch (error: any) {
      console.error(isLogin ? "로그인 오류:" : "회원가입 오류:", error);
      setMessage(
        error.message ||
          (isLogin
            ? "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
            : "회원가입에 실패했습니다. 다시 시도해주세요.")
      );
    } finally {
      setLoading(false);
    }
  };

  // 현재 세션 정보 출력 (디버깅용)
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log("현재 세션:", session);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLogin ? "관리자 로그인" : "관리자 회원가입"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin
              ? "관리자 계정으로 로그인하세요."
              : "관리자 계정을 생성하세요."}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                이메일
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="이메일 주소"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
              />
            </div>
          </div>

          {message && (
            <div
              className={`text-sm text-center ${
                message.includes("실패") ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading
                ? isLogin
                  ? "로그인 중..."
                  : "가입 중..."
                : isLogin
                ? "로그인"
                : "가입하기"}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {isLogin ? "회원가입하기" : "로그인하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
