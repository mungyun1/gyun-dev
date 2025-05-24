import { Metadata } from "next";
import PostEditor from "@/components/PostEditor";

export const metadata: Metadata = {
  title: "New Post | Gyun's Blog",
  description: "새 게시물 작성",
};

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          새 게시물 작성
        </h1>
        <PostEditor />
      </div>
    </div>
  );
}
