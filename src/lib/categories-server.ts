import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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

// 서버 사이드에서 사용할 함수 (CORS 문제 없음)
export async function getCategoriesServer(): Promise<Category[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    });

    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }

    if (!categories) {
      return [];
    }

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

        try {
          const { data: posts, error: postsError } = await supabase
            .from("posts")
            .select("*")
            .in("id", category.post_ids);

          if (postsError) {
            console.error(
              "Failed to fetch posts for category:",
              category.id,
              postsError
            );
            return {
              ...category,
              posts: [],
              postCount: 0,
            };
          }

          return {
            ...category,
            posts:
              posts?.map((post: any) => ({
                ...post,
                date: new Date(post.created_at).toLocaleDateString(),
              })) || [],
            postCount: posts?.length || 0,
          };
        } catch (error) {
          console.error(
            "Error fetching posts for category:",
            category.id,
            error
          );
          return {
            ...category,
            posts: [],
            postCount: 0,
          };
        }
      })
    );

    return categoriesWithPosts;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // 에러가 발생해도 빈 배열을 반환하여 페이지가 깨지지 않도록 함
    return [];
  }
}
