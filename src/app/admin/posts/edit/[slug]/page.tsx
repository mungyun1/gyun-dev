import { Metadata } from "next";
import PostEditor from "@/components/PostEditor";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { getCategoriesServer } from "@/lib/categories-server";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Edit Post | Gyun's Blog",
  description: "게시물 수정",
};

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EditPostPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = params;
  const [post, categories] = await Promise.all([
    getPost(slug),
    getCategoriesServer(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen dark:bg-slate-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton href="/admin/posts" text="게시물 목록으로 돌아가기" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          게시물 수정
        </h1>
        <PostEditor initialData={post} categories={categories} />
      </div>
    </div>
  );
}
