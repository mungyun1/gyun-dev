"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/lib/categories";

interface DeleteCategoryButtonProps {
  categoryId: string;
}

export default function DeleteCategoryButton({
  categoryId,
}: DeleteCategoryButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("이 카테고리를 삭제하시겠습니까?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCategory(categoryId);
      router.refresh();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("카테고리 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isDeleting ? "삭제 중..." : "삭제"}
    </button>
  );
}
