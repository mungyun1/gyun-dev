import { Metadata } from "next";
import CategoryList, { categories } from "@/components/CategoryList";

export const metadata: Metadata = {
  title: "Categories | Gyun's Blog",
  description: "블로그의 모든 카테고리를 확인할 수 있습니다.",
};

export default function CategoriesPage() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        There are {categories.length} categories.
      </h1>
      <CategoryList />
    </div>
  );
}
