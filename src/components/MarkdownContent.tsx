"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";
import useStore from "@/store/useStore";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useState, useEffect } from "react";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <MarkdownSkeleton />,
  }
);

interface MarkdownContentProps {
  content: string;
}

// 스켈레톤 로딩 컴포넌트
function MarkdownSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      </div>
    </div>
  );
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const { theme } = useStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 서버 사이드 렌더링 시 기본 스타일 적용
  if (!isClient) {
    return (
      <div className="w-full prose prose-lg sm:prose-xl dark:prose-invert max-w-none">
        <div
          className="text-gray-700 dark:text-gray-300 leading-relaxed"
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.8",
            letterSpacing: "0.01em",
          }}
        >
          {content.split("\n").map((line, index) => (
            <p key={index} className="mb-4">
              {line}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full prose prose-lg sm:prose-xl dark:prose-invert max-w-none">
      <div className="markdown-content">
        <MarkdownPreview
          source={content}
          wrapperElement={{
            "data-color-mode": theme === "dark" ? "dark" : "light",
          }}
          style={{
            backgroundColor: "transparent",
            fontSize: "1.125rem",
            lineHeight: "1.8",
            letterSpacing: "0.01em",
            width: "100%",
            maxWidth: "none",
          }}
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
          components={{
            ul: ({ children, ...props }) => (
              <ul className="list-disc pl-6 my-4" {...props}>
                {children}
              </ul>
            ),
            ol: ({ children, ...props }) => (
              <ol className="list-decimal pl-6 my-4" {...props}>
                {children}
              </ol>
            ),
            li: ({ children, ...props }) => (
              <li className="my-2" {...props}>
                {children}
              </li>
            ),
          }}
        />
      </div>
    </div>
  );
}
