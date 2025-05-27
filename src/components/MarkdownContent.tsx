"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";
import useStore from "@/store/useStore";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

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
    <div className="prose max-w-none prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-lg prose-p:leading-relaxed prose-p:my-6 prose-li:text-lg prose-li:my-2 prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900 prose-em:text-gray-800 prose-code:text-gray-800 prose-pre:bg-gray-100 prose-pre:text-gray-800 prose-pre:p-4 prose-pre:my-6 prose-pre:rounded-lg prose-a:text-blue-600 prose-blockquote:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:my-6 prose-ul:text-gray-800 prose-ol:text-gray-800 dark:prose-headings:text-white dark:prose-p:text-gray-200 dark:prose-strong:text-white dark:prose-em:text-gray-200 dark:prose-code:text-gray-200 dark:prose-pre:bg-slate-800 dark:prose-pre:text-white dark:prose-a:text-blue-400 dark:prose-blockquote:text-gray-300 dark:prose-ul:text-gray-200 dark:prose-ol:text-gray-200">
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
