import Link from "next/link";
import { Category, CategoryPost } from "@/lib/categories-server";
import DeleteCategoryButton from "./DeleteCategoryButton";

interface CategoryListProps {
  categories: Category[];
  isAdmin?: boolean;
}

export default function CategoryList({
  categories,
  isAdmin = false,
}: CategoryListProps) {
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
                      Posts:{" "}
                      {category.postCount || category.post_ids?.length || 0}
                    </p>
                  </div>
                </div>
                <div className="ml-6 flex items-center space-x-3">
                  <DeleteCategoryButton categoryId={category.id} />
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
              {category.postCount || category.post_ids?.length || 0} Posts
            </span>
          </div>
          {category.posts && category.posts.length > 0 ? (
            <ul className="space-y-2 md:space-y-3">
              {category.posts.map((post: CategoryPost) => (
                <li key={post.slug} className="group/item">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{post.title}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              아직 게시물이 없습니다.
            </p>
          )}
        </div>
      ))}
      {categories.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            등록된 카테고리가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
}
