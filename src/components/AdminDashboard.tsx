"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCookieMonitor } from "@/hooks/useCookieMonitor";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isCheckingCookies, setIsCheckingCookies] = useState(false);

  // 쿠키 모니터링 훅 사용
  const {
    cookieStatus,
    isMonitoring,
    lastChecked,
    checkCookieStatus,
    startMonitoring,
    stopMonitoring,
    toggleMonitoring,
  } = useCookieMonitor(300000); // 5분마다 확인

  // 만료된 쿠키 정리
  const cleanupExpiredCookies = async () => {
    try {
      const response = await fetch("/api/auth/cookies/cleanup", {
        method: "POST",
      });
      if (response.ok) {
        alert("만료된 쿠키가 정리되었습니다.");
        await checkCookieStatus(); // 상태 다시 확인
      }
    } catch (error) {
      console.error("쿠키 정리 실패:", error);
      alert("쿠키 정리에 실패했습니다.");
    }
  };

  // 세션 연장
  const extendSession = async () => {
    try {
      const response = await fetch("/api/auth/session/extend", {
        method: "POST",
      });
      if (response.ok) {
        alert("세션이 연장되었습니다.");
        await checkCookieStatus(); // 상태 다시 확인
      }
    } catch (error) {
      console.error("세션 연장 실패:", error);
      alert("세션 연장에 실패했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 쿠키 상태 관리 섹션 */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            쿠키 상태 관리
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={toggleMonitoring}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                isMonitoring
                  ? "text-white bg-red-600 hover:bg-red-700"
                  : "text-white bg-green-600 hover:bg-green-700"
              }`}
            >
              {isMonitoring ? "모니터링 중지" : "모니터링 시작"}
            </button>
            <button
              onClick={checkCookieStatus}
              disabled={isCheckingCookies}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isCheckingCookies ? "확인 중..." : "수동 확인"}
            </button>
          </div>
        </div>

        {/* 모니터링 상태 표시 */}
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              모니터링 상태:
              <span
                className={`ml-2 font-medium ${
                  isMonitoring ? "text-green-600" : "text-red-600"
                }`}
              >
                {isMonitoring ? "활성화" : "비활성화"}
              </span>
            </span>
            {lastChecked && (
              <span className="text-gray-500">
                마지막 확인: {lastChecked.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {cookieStatus && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div
                  className={`text-sm font-medium ${
                    cookieStatus.accessToken ? "text-red-600" : "text-green-600"
                  }`}
                >
                  Access Token
                </div>
                <div className="text-xs text-gray-500">
                  {cookieStatus.accessToken ? "만료됨" : "유효함"}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-sm font-medium ${
                    cookieStatus.refreshToken
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  Refresh Token
                </div>
                <div className="text-xs text-gray-500">
                  {cookieStatus.refreshToken ? "만료됨" : "유효함"}
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`text-sm font-medium ${
                    cookieStatus.user ? "text-red-600" : "text-green-600"
                  }`}
                >
                  User Data
                </div>
                <div className="text-xs text-gray-500">
                  {cookieStatus.user ? "만료됨" : "유효함"}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={cleanupExpiredCookies}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                만료된 쿠키 정리
              </button>
              <button
                onClick={extendSession}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                세션 연장
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 게시물 관리 섹션 */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">게시물 관리</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            로그아웃
          </button>
        </div>

        <div className="space-y-4">
          <Link
            href="/admin/posts/new"
            className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            새 게시물 작성
          </Link>

          <Link
            href="/admin/posts"
            className="block w-full text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            게시물 목록 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
