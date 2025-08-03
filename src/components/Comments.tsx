"use client";

import { useEffect, useRef, useState } from "react";
import useStore from "@/store/useStore";

export default function Comments() {
  const { theme } = useStore();
  const commentsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initUtterances = () => {
    if (!commentsRef.current) return;

    // 기존 utterances 제거
    const existingScript = commentsRef.current.querySelector("script");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    // GitHub 저장소 이름을 실제 저장소에 맞게 수정
    script.setAttribute("repo", "mungyun1/gyun-dev");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute(
      "theme",
      theme === "dark" ? "github-dark" : "github-light"
    );
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    script.onload = () => {
      console.log("Utterances loaded successfully");
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error("Failed to load utterances");
      setIsLoading(false);
    };

    commentsRef.current.appendChild(script);

    // utterances 스타일 커스터마이징
    const existingStyle = document.querySelector(
      "style[data-utterances-style]"
    );
    if (existingStyle) {
      existingStyle.remove();
    }

    const style = document.createElement("style");
    style.setAttribute("data-utterances-style", "true");
    style.textContent = `
      .utterances {
        max-width: 100% !important;
      }
      .utterances-frame {
        width: 100% !important;
      }
    `;
    document.head.appendChild(style);
  };

  // utterances 테마 변경 함수
  const updateUtterancesTheme = () => {
    const utterancesFrame =
      document.querySelector<HTMLIFrameElement>(".utterances-frame");
    if (utterancesFrame) {
      const themeName = theme === "dark" ? "github-dark" : "github-light";
      utterancesFrame.contentWindow?.postMessage(
        { type: "set-theme", theme: themeName },
        "https://utteranc.es"
      );
    }
  };

  // 컴포넌트 마운트
  useEffect(() => {
    setMounted(true);
  }, []);

  // utterances 초기화
  useEffect(() => {
    if (!mounted) return;

    console.log("Initializing utterances...");
    setIsLoading(true);
    initUtterances();
  }, [mounted, theme]);

  // 테마 변경 감지 및 적용
  useEffect(() => {
    if (!mounted || isLoading) return;

    // 약간의 지연 후 테마 변경 적용
    const timer = setTimeout(() => {
      updateUtterancesTheme();
    }, 100);

    return () => clearTimeout(timer);
  }, [mounted, theme, isLoading]);

  // 스켈레톤 로딩 컴포넌트
  const CommentsSkeleton = () => (
    <div className="w-full animate-pulse">
      <div className="space-y-6">
        {/* 댓글 입력 영역 스켈레톤 */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        </div>

        {/* 댓글 목록 스켈레톤 */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2 ml-11">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="flex items-center space-x-4 mt-3 ml-11">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 스켈레톤 */}
        <div className="flex justify-center items-center space-x-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="py-8">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          댓글
        </h3>
        <div ref={commentsRef} className="w-full min-h-[200px]">
          {(!mounted || isLoading) && <CommentsSkeleton />}
        </div>
      </div>
    </div>
  );
}
