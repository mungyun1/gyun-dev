"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  title: string;
  date: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  posts?: Post[];
  postCount?: number;
}

interface CategoryListProps {
  categories: Category[];
  isAdmin?: boolean;
}

export default function CategoryList({
  categories,
  isAdmin = false,
}: CategoryListProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (categoryId: string) => {
    if (!confirm("이 카테고리를 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(categoryId);
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("카테고리 삭제에 실패했습니다.");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("카테고리 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (isAdmin) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {categories.map((category) => (
            <li key={category.id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-400 truncate">
                      {category.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Slug: {category.slug}
                    </p>
                  </div>
                </div>
                <div className="ml-6 flex items-center space-x-3">
                  <Link
                    href={`/admin/categories/${category.id}`}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    disabled={isDeleting === category.id}
                    className={`text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ${
                      isDeleting === category.id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isDeleting === category.id ? "삭제 중..." : "삭제"}
                  </button>
                </div>
              </div>
            </li>
          ))}
          {categories.length === 0 && (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500 dark:text-gray-400">
              등록된 카테고리가 없습니다.
            </li>
          )}
        </ul>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div
          key={category.id}
          className="pb-8 border-b border-gray-200 last:border-0"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold">{category.name}</h2>
            <span className="text-sm text-gray-500">
              ({category.postCount || 0} Posts)
            </span>
          </div>
          {category.posts && category.posts.length > 0 ? (
            <ul className="space-y-2">
              {category.posts.map((post) => (
                <li key={post.slug} className="flex items-center gap-2">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {post.title}
                  </Link>
                  <span className="text-sm text-gray-400">{post.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">게시물이 없습니다.</p>
          )}
        </div>
      ))}
      {categories.length === 0 && (
        <p className="text-center text-gray-500">등록된 카테고리가 없습니다.</p>
      )}
    </div>
  );
}
