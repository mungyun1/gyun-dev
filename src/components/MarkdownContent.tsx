"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";
import useStore from "@/store/useStore";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const { theme } = useStore();

  return (
    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-em:text-gray-800 prose-code:text-gray-800 prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-a:text-blue-600 prose-blockquote:text-gray-700 prose-ul:text-gray-800 prose-ol:text-gray-800 dark:prose-headings:text-white dark:prose-p:text-white dark:prose-strong:text-white dark:prose-em:text-white dark:prose-code:text-white dark:prose-pre:bg-slate-800 dark:prose-pre:text-white dark:prose-a:text-blue-400 dark:prose-blockquote:text-white dark:prose-ul:text-white dark:prose-ol:text-white">
      <MarkdownPreview
        source={content}
        wrapperElement={{
          "data-color-mode": theme === "dark" ? "dark" : "light",
        }}
        style={{
          backgroundColor: "transparent",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
        }}
      />
    </div>
  );
}
