import Link from "next/link";

interface PostCardProps {
  title: string;
  slug: string;
  summary?: string;
  content: string;
  created_at: string;
  categories: {
    name: string;
  };
}

export default function PostCard({
  title,
  slug,
  summary,
  content,
  created_at,
  categories,
}: PostCardProps) {
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Date unavailable";
    }
  };

  return (
    <Link href={`/posts/${slug}`} className="block">
      <article className="bg-white dark:bg-slate-800/50 rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-slate-800">
        {/* 카테고리 & 날짜 */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
          {categories && (
            <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-full text-xs font-medium">
              {categories.name}
            </span>
          )}
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <time dateTime={created_at} className="text-sm">
            {formatDate(created_at)}
          </time>
        </div>

        {/* 제목 */}
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 sm:text-xl">
          {title}
        </h3>

        {/* 요약 */}
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 text-base">
          {summary || content.slice(0, 200) + "..."}
        </p>

        {/* Read more 링크 */}
        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
          Read more
          <svg
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    </Link>
  );
}
