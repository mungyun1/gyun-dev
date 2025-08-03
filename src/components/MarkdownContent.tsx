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
          className="text-gray-900 dark:text-gray-100 leading-relaxed"
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
    <div className="w-full prose prose-lg sm:prose-xl dark:prose-invert max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-em:text-gray-800 prose-code:text-gray-800 prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-pre:p-4 prose-pre:my-6 prose-pre:rounded-lg prose-a:text-blue-600 prose-blockquote:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:my-6 prose-ul:text-gray-800 prose-ol:text-gray-800 dark:prose-headings:text-white dark:prose-p:text-gray-200 dark:prose-strong:text-white dark:prose-em:text-gray-200 dark:prose-code:text-gray-200 dark:prose-pre:bg-slate-800 dark:prose-pre:text-white dark:prose-a:text-blue-400 dark:prose-blockquote:text-gray-300 dark:prose-ul:text-gray-200 dark:prose-ol:text-gray-200">
      <MarkdownPreview
        source={content}
        wrapperElement={{
          "data-color-mode": theme === "dark" ? "dark" : "light",
        }}
        style={{
          backgroundColor: "transparent",
          color: theme === "dark" ? "#E5E7EB" : "#1F2937",
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
  );
}
