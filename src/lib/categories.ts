import { notFound } from "next/navigation";

export interface CategoryPost {
  id: number;
  title: string;
  created_at: string;
  slug: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  post_ids: number[];
  posts?: CategoryPost[];
  postCount?: number;
}

interface CreateCategoryData {
  name: string;
  slug: string;
}

// 클라이언트에서 사용할 API 함수
export async function createCategory(
  data: CreateCategoryData
): Promise<Category> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("카테고리 생성에 실패했습니다.");
  }

  return response.json();
}

export async function deleteCategory(categoryId: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${categoryId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("카테고리 삭제에 실패했습니다.");
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();

    // post_ids를 기반으로 posts 정보를 가져옴
    const categoriesWithPosts = await Promise.all(
      categories.map(async (category: Category) => {
        if (!category.post_ids?.length) {
          return {
            ...category,
            posts: [],
            postCount: 0,
          };
        }

        const postsResponse = await fetch(
          `${
            process.env.NEXT_PUBLIC_APP_URL
          }/api/posts?ids=${category.post_ids.join(",")}`,
          {
            cache: "no-store",
          }
        );

        if (!postsResponse.ok) {
          console.error("Failed to fetch posts for category:", category.id);
          return {
            ...category,
            posts: [],
            postCount: 0,
          };
        }

        const posts = await postsResponse.json();
        return {
          ...category,
          posts: posts.map((post: any) => ({
            ...post,
            date: new Date(post.created_at).toLocaleDateString(),
          })),
          postCount: posts.length,
        };
      })
    );

    return categoriesWithPosts;
  } catch (error) {
    console.error("Error fetching categories:", error);
    notFound();
  }
}

export async function getCategory(categoryId: string): Promise<Category> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${categoryId}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("카테고리를 찾을 수 없습니다.");
    }

    const category = await response.json();

    // post_ids가 없거나 비어있는 경우
    if (!category.post_ids?.length) {
      return {
        ...category,
        posts: [],
        postCount: 0,
      };
    }

    // 카테고리에 속한 게시물 정보 가져오기
    const postsResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL
      }/api/posts?ids=${category.post_ids.join(",")}`,
      {
        cache: "no-store",
      }
    );

    if (!postsResponse.ok) {
      console.error("Failed to fetch posts for category:", category.id);
      return {
        ...category,
        posts: [],
        postCount: 0,
      };
    }

    const posts = await postsResponse.json();
    return {
      ...category,
      posts: posts.map((post: any) => ({
        ...post,
        date: new Date(post.created_at).toLocaleDateString(),
      })),
      postCount: posts.length,
    };
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("카테고리 조회에 실패했습니다.");
  }
}
