interface Post {
  title: string;
  date: string;
  slug: string;
}

interface Category {
  title: string;
  posts: Post[];
  lastUpdated: string;
  postCount: number;
}

export const categories: Category[] = [
  {
    title: "회고",
    posts: [
      {
        title: "2023년 회고",
        date: "January 09, 2024",
        slug: "2023-retrospect",
      },
      {
        title: "2022년 회고",
        date: "December 31, 2022",
        slug: "2022-retrospect",
      },
    ],
    lastUpdated: "January 09, 2024",
    postCount: 3,
  },
  {
    title: "F12 퀴리 개선기",
    posts: [
      {
        title: "F12 퀴리 개선기 (1)",
        date: "September 28, 2022",
        slug: "f12-query-improvement-1",
      },
      {
        title: "F12 퀴리 개선기 (2)",
        date: "September 29, 2022",
        slug: "f12-query-improvement-2",
      },
    ],
    lastUpdated: "September 28, 2022",
    postCount: 2,
  },
  {
    title: "Spring DI/IoC",
    posts: [
      {
        title: "Spring DI/IoC (1)",
        date: "May 05, 2022",
        slug: "spring-di-ioc-1",
      },
      {
        title: "Spring DI/IoC (2)",
        date: "May 06, 2022",
        slug: "spring-di-ioc-2",
      },
    ],
    lastUpdated: "May 05, 2022",
    postCount: 3,
  },
];

export default function CategoryList() {
  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div
          key={category.title}
          className="pb-8 border-b border-gray-200 last:border-0"
        >
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold">{category.title}</h2>
            <span className="text-sm text-gray-500">
              ({category.postCount} Posts)
            </span>
          </div>
          <ul className="space-y-2">
            {category.posts.map((post) => (
              <li key={post.slug} className="flex items-center gap-2">
                <a
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-500 transition-colors"
                >
                  {post.title}
                </a>
                <span className="text-sm text-gray-400">{post.date}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
