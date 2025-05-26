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
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <MarkdownPreview
        source={content}
        wrapperElement={{
          "data-color-mode": theme === "dark" ? "dark" : "light",
        }}
        style={{
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
