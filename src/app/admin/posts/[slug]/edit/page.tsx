import { Metadata } from "next";
import PostEditor from "@/components/PostEditor";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Post | Gyun's Blog",
  description: "게시물 수정",
};

interface Props {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
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

export default async function EditPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen dark:bg-slate-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          게시물 수정
        </h1>
        <PostEditor initialData={post} />
      </div>
    </div>
  );
}
