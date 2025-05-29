import { Metadata } from "next";
import PostEditor from "@/components/PostEditor";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Edit Post | Gyun's Blog",
  description: "게시물 수정",
};

interface Props {
  params: {
    slug: string;
  };
}

export default async function EditPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  console.log("서버 시작");

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
