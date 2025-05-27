import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      categories:categories_id (
        id,
        name
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    notFound();
  }

  return post;
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  return (
    <main className="p-8 lg:p-12">
      <nav className="flex items-center space-x-2 text-base text-gray-600 mb-12">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="text-gray-300">›</span>
        <span className="text-gray-900">{post.title}</span>
      </nav>

      <article className="max-w-4xl mx-auto">
        {/* 게시물 헤더 */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center text-base text-gray-500 space-x-4">
            <div className="flex items-center">
              <span>Posted</span>
              <span className="mx-2">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <span>Author</span>
              <span className="mx-2">Mun Gyun</span>
            </div>
            <div className="flex items-center">
              <span>Category</span>
              <span className="mx-2">{post.categories?.name}</span>
            </div>
          </div>
        </div>

        {/* 게시물 본문 */}
        <div className="text-lg">
          <MarkdownContent content={post.content} />
        </div>

        {/* 댓글 섹션 */}
        {/* <Comments slug={params.slug} /> */}
      </article>
    </main>
  );
}
