import { Metadata } from "next";
import PostEditor from "@/components/PostEditor";

export const metadata: Metadata = {
  title: "Edit Post | Gyun's Blog",
  description: "게시물 수정",
};

interface Props {
  params: {
    id: string;
  };
}

export default function EditPostPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">게시물 수정</h1>
        <PostEditor postId={params.id} />
      </div>
    </div>
  );
}
