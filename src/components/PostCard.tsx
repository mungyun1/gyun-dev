import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
  title: string;
  slug: string;
  summary: string;
  created_at: string;
  thumbnail_url?: string;
  categories: {
    name: string;
  };
}

export default function PostCard({
  title,
  slug,
  summary,
  created_at,
  thumbnail_url,
  categories,
}: PostCardProps) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="group block bg-white dark:bg-slate-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300"
    >
      <div className="relative">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={thumbnail_url || "/opengraph-image"}
            alt={title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            priority={true}
          />
          <div className="absolute inset-0 group-hover:bg-black/20 transition-colors duration-300 group-hover:shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]" />
          {categories?.name && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-blue-500/80 text-white text-sm rounded-full backdrop-blur-sm">
              {categories.name}
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-20 backdrop-blur-sm transition-all duration-300 overflow-hidden">
          <p className="p-4 text-lg sm:text-xl text-white line-clamp-2">
            {summary}
          </p>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h2>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-xs md:text-sm text-gray-600 dark:text-gray-300">
          <svg
            className="w-3 h-3 md:w-4 md:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {new Date(created_at).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </Link>
  );
}
