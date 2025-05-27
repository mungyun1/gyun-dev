import { Metadata } from "next";
import PostEditor from "@/components/PostEditor";

export const metadata: Metadata = {
  title: "새 게시물 작성 | Gyun's Blog",
  description: "새로운 블로그 게시물을 작성합니다.",
};

export default function NewPostPage() {
  return (
    <div className="min-h-screen dark:bg-slate-900 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            새 게시물 작성
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            마크다운으로 새로운 블로그 게시물을 작성하세요.
          </p>
        </div>
        <PostEditor />
      </div>
    </div>
  );
}
