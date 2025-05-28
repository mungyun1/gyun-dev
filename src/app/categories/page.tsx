import { Metadata } from "next";
import CategoryList from "@/components/CategoryList";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Categories | Gyun's Blog",
  description: "블로그의 모든 카테고리를 확인할 수 있습니다.",
};

async function getCategories() {
  try {
    const supabase = createServerComponentClient({ cookies });

    const { data: categories, error } = await supabase.from("categories")
      .select(`
        id,
        name,
        posts (
          id,
          title,
          created_at
        )
      `);

    if (error) throw error;

    return categories.map((category) => ({
      ...category,
      slug: category.name.toLowerCase().replace(/\s+/g, "-"), // name을 기반으로 slug 생성
      postCount: category.posts?.length || 0,
      posts:
        category.posts?.map((post) => ({
          ...post,
          slug: post.title.toLowerCase().replace(/\s+/g, "-"), // title을 기반으로 임시 slug 생성
          date: new Date(post.created_at).toLocaleDateString(),
        })) || [],
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 sm:text-3xl">
        There are {categories.length} categories.
      </h1>
      <CategoryList categories={categories} />
    </div>
  );
}
