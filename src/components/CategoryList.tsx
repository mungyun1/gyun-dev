"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Category, CategoryPost, deleteCategory } from "@/lib/categories";

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
      await deleteCategory(categoryId);
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
                      Posts: {category.post_ids?.length || 0}
                    </p>
                  </div>
                </div>
                <div className="ml-6 flex items-center space-x-3">
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
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-8">
      {categories.map((category) => (
        <div
          key={category.id}
          className="group border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 p-4 md:p-6 rounded-xl transition-all duration-300 hover:shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {category.name}
            </h2>
            <span className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full">
              {category.post_ids?.length || 0} Posts
            </span>
          </div>
          {category.posts && category.posts.length > 0 ? (
            <ul className="space-y-2 md:space-y-3">
              {category.posts.map((post: CategoryPost) => (
                <li key={post.slug} className="group/item">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="flex items-center justify-between py-1.5 md:py-2 hover:translate-x-2 transition-transform duration-300"
                  >
                    <span className="text-sm md:text-base text-gray-800 dark:text-gray-200 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors line-clamp-1">
                      {post.title}
                    </span>
                    <span className="text-xs md:text-sm text-gray-400 dark:text-gray-500 shrink-0 ml-2 md:ml-4">
                      {post.date}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 italic text-center py-3 md:py-4">
              게시물이 없습니다.
            </p>
          )}
        </div>
      ))}
      {categories.length === 0 && (
        <div className="col-span-full text-center py-8 md:py-12">
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
            등록된 카테고리가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
