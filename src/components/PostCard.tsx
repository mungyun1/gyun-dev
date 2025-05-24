import Link from "next/link";

interface PostCardProps {
  title: string;
  slug: string;
  summary: string;
  date: string;
  categories: string[];
}

export default function PostCard({
  title,
  slug,
  summary,
  date,
  categories,
}: PostCardProps) {
  return (
    <Link href={`/posts/${slug}`} className="block mb-8">
      <article className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{summary}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>{date}</span>
          {categories.map((category, index) => (
            <span key={category}>
              <span className="mx-2">•</span>
              <span className="hover:text-blue-600">{category}</span>
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
