"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
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
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    생성일: {new Date(category.created_at).toLocaleDateString()}
                  </p>
                  <span className="mx-2">•</span>
                  <p>
                    수정일: {new Date(category.updated_at).toLocaleDateString()}
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
