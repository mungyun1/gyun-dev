"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  summary: string;
  slug: string;
  created_at: string;
}

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (slug: string) => {
    if (!confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("게시물 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="border dark:border-slate-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        >
          <div className="flex justify-between items-start">
            <Link href={`/posts/${post.slug}`} className="block group flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {post.summary}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(post.created_at)}
              </div>
            </Link>
            <div className="flex gap-2 ml-4">
              <Link
                href={`/admin/posts/${post.slug}/edit`}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                수정
              </Link>
              <button
                onClick={() => handleDelete(post.slug)}
                disabled={isDeleting}
                className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 dark:text-red-400 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                삭제
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
