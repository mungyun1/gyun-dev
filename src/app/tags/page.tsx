import { Metadata } from "next";
import TagList from "@/components/TagList";
import { getAllTags } from "@/lib/tags";

export const metadata: Metadata = {
  title: "Tags | gyun-dev",
  description:
    "블로그의 모든 태그를 확인할 수 있습니다. 관심 있는 주제로 분류된 글들을 쉽게 찾아보세요.",
  keywords: ["태그", "분류", "개발", "기술", "블로그"],
  alternates: {
    canonical: "/tags",
  },
  openGraph: {
    title: "Tags | gyun-dev",
    description:
      "블로그의 모든 태그를 확인할 수 있습니다. 관심 있는 주제로 분류된 글들을 쉽게 찾아보세요.",
    url: "/tags",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Tags | gyun-dev",
    description: "블로그의 모든 태그를 확인할 수 있습니다.",
  },
};

interface Tag {
  name: string;
  count: number;
}

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <TagList tags={tags} />
    </div>
  );
}
