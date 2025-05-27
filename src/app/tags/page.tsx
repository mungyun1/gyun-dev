import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import TagList from "@/components/TagList";

export const metadata: Metadata = {
  title: "Tags | Gyun's Blog",
  description: "블로그의 모든 태그를 확인할 수 있습니다.",
};

interface Tag {
  name: string;
  count: number;
}

async function getAllTags(): Promise<Tag[]> {
  const { data: posts, error } = await supabase.from("posts").select("tags");

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }

  // 모든 태그를 하나의 배열로 합치기
  const allTags = posts.reduce<string[]>((acc, post) => {
    if (post.tags) {
      acc.push(...post.tags);
    }
    return acc;
  }, []);

  // 태그별 카운트 계산
  const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  // Tag[] 형태로 변환하고 카운트 기준 내림차순 정렬
  const tags: Tag[] = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return tags;
}

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <TagList tags={tags} />
    </div>
  );
}
