"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  createdAt: string;
  tags: string[];
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        throw new Error("게시물 목록을 불러오는데 실패했습니다.");
      }
    } catch (error) {
      console.error("게시물 목록 조회 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
      } else {
        throw new Error("게시물 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시물 삭제 중 오류:", error);
      alert("게시물을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500">작성된 게시물이 없습니다.</div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {posts.map((post) => (
          <li key={post.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-lg font-medium text-blue-600 hover:text-blue-800 truncate"
                  >
                    {post.title}
                  </Link>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{post.tags.join(", ")}</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
