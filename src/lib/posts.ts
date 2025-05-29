import { notFound } from "next/navigation";

export interface Post {
  id: number;
  slug: string;
  title: string;
  summary: string;
  content: string;
  created_at: string;
  categories: {
    name: string;
  };
}

interface PostData {
  title: string;
  content: string;
  summary: string;
  slug: string;
}

export async function createPost(data: PostData): Promise<Post> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "게시물 작성에 실패했습니다.");
  }

  return response.json();
}

export async function updatePost(slug: string, data: PostData): Promise<Post> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${slug}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "게시물 수정에 실패했습니다.");
  }

  return response.json();
}

export async function deletePost(slug: string): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${slug}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("게시물 삭제에 실패했습니다.");
  }
}

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPost(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
