import { Metadata } from "next";
import PostList from "@/components/PostList";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";
import { getPostsByTag } from "@/lib/tags";

interface Props {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(decodedTag);

  return {
    title: `#${decodedTag} | Gyun's Dev`,
    description: `${decodedTag} 태그와 관련된 모든 게시물을 확인할 수 있습니다. 총 ${posts.length}개의 포스트가 있습니다.`,
    openGraph: {
      title: `#${decodedTag} | Gyun's Dev`,
      description: `${decodedTag} 태그와 관련된 모든 게시물을 확인할 수 있습니다. 총 ${posts.length}개의 포스트가 있습니다.`,
      url: `/tags/${params.tag}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(decodedTag);

  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white relative">
        <BackButton
          href="/tags"
          text="태그 목록으로 돌아가기"
          className="inline-flex items-center mb-4 text-sm hover:text-blue-100 transition-colors"
        />
        <div className="flex items-center space-x-2">
          <span className="text-3xl">#</span>
          <h1 className="text-3xl font-bold">{decodedTag}</h1>
        </div>
        <p className="mt-3 text-base opacity-90">{posts.length}개의 포스트</p>
      </div>

      <PostList posts={posts} hideActions={true} />
    </div>
  );
}
