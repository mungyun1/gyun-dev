"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/navigation";
import { Post, deletePost } from "@/lib/posts";

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
      await deletePost(slug);
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("게시물 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <Link href={`/posts/${post.slug}`} className="block">
            <div className="relative h-48 w-full">
              <Image
                src={post.thumbnail_url || "/opengraph-image"}
                alt={post.title}
                fill
                className="object-cover"
                priority={true}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {post.summary}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(post.created_at)}
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/posts/${post.slug}/edit`}
                    className="inline-flex items-center px-2 py-1 text-xs border border-gray-300 rounded text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    수정
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(post.slug);
                    }}
                    disabled={isDeleting}
                    className="inline-flex items-center px-2 py-1 text-xs border border-red-300 rounded text-red-700 dark:text-red-400 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
