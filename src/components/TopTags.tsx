import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Tag {
  name: string;
  count: number;
}

async function getTopTags(): Promise<Tag[]> {
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

  // Tag[] 형태로 변환하고 카운트 기준 내림차순 정렬 후 상위 5개만 반환
  const tags: Tag[] = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 5);

  return tags;
}

export default async function TopTags() {
  const tags = await getTopTags();

  return (
    <section>
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Trending Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${tag.name}`}
            className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded-full text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-slate-600"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
