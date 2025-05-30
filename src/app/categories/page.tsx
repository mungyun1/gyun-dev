import { Metadata } from "next";
import { getCategories } from "@/lib/categories";
import CategoryList from "@/components/CategoryList";

export const metadata: Metadata = {
  title: "Categories | Gyun's Blog",
  description: "블로그의 모든 카테고리를 확인할 수 있습니다.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        There are {categories.length} categories.
      </h1>
      <CategoryList categories={categories} />
    </div>
  );
}
