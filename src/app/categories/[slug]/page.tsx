import { Metadata } from "next";
import { getCategoriesServer } from "@/lib/categories-server";
import { notFound } from "next/navigation";
import PostList from "@/components/PostList";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategoriesServer();
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    return {
      title: "Category Not Found | gyun-dev",
    };
  }

  return {
    title: `${category.name} | gyun-dev`,
    description: `${
      category.name
    } 카테고리의 모든 게시물을 확인할 수 있습니다. 총 ${
      category.postCount || 0
    }개의 포스트가 있습니다.`,
    openGraph: {
      title: `${category.name} | gyun-dev`,
      description: `${category.name} 카테고리의 모든 게시물을 확인할 수 있습니다.`,
      url: `/categories/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const categories = await getCategoriesServer();
    return categories.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for categories:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: Props) {
  const categories = await getCategoriesServer();
  const category = categories.find((cat) => cat.slug === params.slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white relative">
        <Link
          href="/categories"
          className="inline-flex items-center mb-4 text-sm hover:text-blue-100 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          카테고리 목록으로 돌아가기
        </Link>
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">{category.name}</h1>
        </div>
        <p className="mt-3 text-base opacity-90">
          {category.postCount || 0}개의 포스트
        </p>
      </div>

      {category.posts && category.posts.length > 0 ? (
        <PostList
          posts={category.posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: "",
            slug: post.slug,
            created_at: post.created_at,
            thumbnail_url: undefined,
            categories: { name: category.name },
            category_id: parseInt(category.id),
          }))}
          hideActions={true}
        />
      ) : (
        <div className="text-center text-gray-600 dark:text-gray-300 py-12">
          이 카테고리에는 아직 게시물이 없습니다.
        </div>
      )}
    </div>
  );
}
