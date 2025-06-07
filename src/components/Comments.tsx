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

  if (!mounted) return null;

  return (
    <div className="w-full mt-32 border-t dark:border-gray-800">
      <div className="py-8">
        <div ref={commentsRef} className="w-full" />
      </div>
    </div>
  );
}
