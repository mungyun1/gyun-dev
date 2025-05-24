import Link from "next/link";

interface TrendingTagsProps {
  tags: string[];
}

export default function TrendingTags({ tags }: TrendingTagsProps) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Trending Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  );
}
