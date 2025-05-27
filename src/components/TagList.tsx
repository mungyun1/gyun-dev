import Link from "next/link";

interface Tag {
  name: string;
  count: number;
}

interface TagListProps {
  tags: Tag[];
}

// 태그 이름을 기반으로 일관된 해시값 생성
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

// 미리 정의된 색상 조합 (배경색, 텍스트색, 다크모드)
const colorPairs = [
  {
    bg: "bg-blue-50 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-200",
  },
  {
    bg: "bg-green-50 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-200",
  },
  {
    bg: "bg-purple-50 dark:bg-purple-900/30",
    text: "text-purple-800 dark:text-purple-200",
  },
  {
    bg: "bg-yellow-50 dark:bg-yellow-900/30",
    text: "text-yellow-800 dark:text-yellow-200",
  },
  {
    bg: "bg-pink-50 dark:bg-pink-900/30",
    text: "text-pink-800 dark:text-pink-200",
  },
  {
    bg: "bg-indigo-50 dark:bg-indigo-900/30",
    text: "text-indigo-800 dark:text-indigo-200",
  },
  {
    bg: "bg-red-50 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-200",
  },
  {
    bg: "bg-cyan-50 dark:bg-cyan-900/30",
    text: "text-cyan-800 dark:text-cyan-200",
  },
  {
    bg: "bg-orange-50 dark:bg-orange-900/30",
    text: "text-orange-800 dark:text-orange-200",
  },
  {
    bg: "bg-teal-50 dark:bg-teal-900/30",
    text: "text-teal-800 dark:text-teal-200",
  },
];

// 태그 이름에 따라 일관된 색상 반환
const getTagStyle = (tagName: string): string => {
  const hash = hashString(tagName);
  const colorIndex = hash % colorPairs.length;
  const { bg, text } = colorPairs[colorIndex];

  return `${bg} ${text} hover:bg-opacity-75 hover:${text}`;
};

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">There are {tags.length} tags.</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/tags/${tag.name}`}
            className={`inline-flex items-center px-4 py-2 rounded-2xl transition-colors ${getTagStyle(
              tag.name
            )}`}
          >
            <span className="font-medium">{tag.name}</span>
            <span className="ml-2 opacity-75">({tag.count})</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
