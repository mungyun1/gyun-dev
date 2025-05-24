"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // 이전 utterances가 있다면 제거
    const utterancesEl = ref.current?.querySelector(".utterances");
    if (utterancesEl) {
      utterancesEl.remove();
    }

    const scriptEl = document.createElement("script");
    scriptEl.src = "https://utteranc.es/client.js";
    scriptEl.async = true;
    scriptEl.crossOrigin = "anonymous";
    scriptEl.setAttribute("repo", "tirehub/gyun-dev"); // 본인의 GitHub 저장소로 변경
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute(
      "theme",
      theme === "dark" ? "github-dark" : "github-light"
    );
    scriptEl.setAttribute("label", "💬 comments");

    ref.current?.appendChild(scriptEl);

    return () => {
      // cleanup
      if (scriptEl.parentNode) {
        scriptEl.remove();
      }
    };
  }, [theme, slug]);

  return (
    <div className="mt-16 border-t dark:border-gray-800 pt-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-medium">
          <span className="mr-2">1 Comment</span>
          <span className="text-sm text-gray-500">powered by utterances</span>
        </h3>
      </div>
      <div ref={ref} className="utterances-frame" />
    </div>
  );
}
