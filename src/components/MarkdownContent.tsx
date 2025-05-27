"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";
import { useTheme } from "next-themes";

const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const { theme } = useTheme();

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:dark:text-gray-100 prose-p:dark:text-gray-300 prose-strong:dark:text-gray-200 prose-em:dark:text-gray-300 prose-code:dark:text-gray-200 prose-pre:dark:bg-slate-800 prose-pre:dark:text-gray-200 prose-a:dark:text-blue-400 prose-blockquote:dark:text-gray-300 prose-ul:dark:text-gray-300 prose-ol:dark:text-gray-300">
      <MarkdownPreview
        source={content}
        wrapperElement={{
          "data-color-mode": theme === "dark" ? "dark" : "light",
        }}
        style={{
          backgroundColor: "transparent",
          color: theme === "dark" ? "#D1D5DB" : "#d1d3dc", // gray-300 for dark, gray-900 for light
        }}
      />
    </div>
  );
}
