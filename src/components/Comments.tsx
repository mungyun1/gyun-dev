"use client";

import React, { useEffect, useRef, useState } from "react";
import useStore from "@/store/useStore";

export default function Comments() {
  const { theme } = useStore();
  const [mounted, setMounted] = useState(false);
  const commentsRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 컴포넌트 마운트 체크
  useEffect(() => {
    setMounted(true);
  }, []);

  // utterances 초기화 함수
  const initUtterances = () => {
    if (!commentsRef.current || isInitialized) return;

    const script = document.createElement("script");
    const utterancesConfig = {
      src: "https://utteranc.es/client.js",
      repo: "mungyun1/gyun-dev-comments",
      "issue-term": "pathname",
      label: "💬 comments",
      theme: theme === "dark" ? "github-dark" : "github-light",
      crossorigin: "anonymous",
      async: "true",
    };

    Object.entries(utterancesConfig).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    commentsRef.current.appendChild(script);
    setIsInitialized(true);

    // 스타일 적용
    const style = document.createElement("style");
    style.setAttribute("data-utterances", "true");
    style.textContent = `
      .utterances {
        max-width: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        background: transparent !important;
      }
      .utterances-frame {
        width: 100% !important;
        margin: 0 !important;
        background: transparent !important;
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

  // 초기 utterances 로드
  useEffect(() => {
    if (!mounted) return;
    initUtterances();
  }, [mounted]);

  // 테마 변경 감지 및 적용
  useEffect(() => {
    if (!mounted || !isInitialized) return;
    updateUtterancesTheme();
  }, [mounted, theme, isInitialized]);

  // 스켈레톤 로딩 컴포넌트
  const CommentsSkeleton = () => (
    <div className="w-full animate-pulse">
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
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
          {!mounted && <CommentsSkeleton />}
        </div>
      </div>
    </div>
  );
}
