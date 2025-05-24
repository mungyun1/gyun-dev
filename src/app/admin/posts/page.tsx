import { Metadata } from "next";
import PostList from "@/components/PostList";

export const metadata: Metadata = {
  title: "Posts | Gyun's Blog",
  description: "게시물 목록",
};

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">게시물 목록</h1>
        </div>
        <PostList />
      </div>
    </div>
  );
}
