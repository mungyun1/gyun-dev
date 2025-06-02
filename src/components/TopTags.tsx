import { getTopTags } from "@/lib/tags";
import Link from "next/link";

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
