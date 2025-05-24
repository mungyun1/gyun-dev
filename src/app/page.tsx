import Link from "next/link";
import PostCard from "@/components/PostCard";
import RecentUpdates from "@/components/RecentUpdates";
import TrendingTags from "@/components/TrendingTags";

// 임시 데이터
const posts = [
  {
    title: "(데이터 자격증) 빅데이터 분석기사 실기시험 준비 후기와 팁",
    slug: "certificate-bbg2",
    summary:
      "3줄 요약 어떤 시험? 빅데이터 분석 자격 중명을 위해 새롭게 개설된 자격 시험 공부법...",
    date: "Jul 18, 2022",
    categories: ["자격개시판", "자기개발"],
  },
  {
    title: "(IT 자격증) 정보처리기사 실기시험 준비 후기와 팁",
    slug: "certificate-it1",
    summary: "3줄 요약 어떤 시험? 유서깊은 IT 근본 국가공인 자격증 공부법...",
    date: "Jul 15, 2022",
    categories: ["자격개시판", "자기개발"],
  },
  {
    title: "Github 블로그 만들기 - 1. 시작하기",
    slug: "github-blog-1",
    summary: "Github Pages를 이용한 블로그 만들기 시리즈를 시작합니다...",
    date: "Jul 10, 2022",
    categories: ["개발", "블로그"],
  },
];

const recentUpdates = [
  {
    title: "(IT 자격증) 정보처리기사 실기시험 준비",
    summary: "3줄 요약 어떤 시험?...",
    slug: "certificate-it1",
  },
  {
    title: "(데이터 자격증) 빅데이터 분석기사 실기",
    summary: "3줄 요약 어떤 시험?...",
    slug: "certificate-bbg2",
  },
];

const trendingTags = ["자격증", "빅데이터", "GitHub", "blog", "실기시험"];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 메인 컨텐츠 */}
      <div className="pt-16 flex min-h-screen">
        {/* 메인 콘텐츠 - 게시물 리스트 */}
        <main className="ml-64 flex-1 p-8 mr-80">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard key={post.slug} {...post} />
              ))}
            </div>
          </div>
        </main>

        {/* 오른쪽 사이드바 */}
        <aside className="w-80 bg-white border-l p-6 fixed right-0 h-[calc(100vh-4rem)] top-16 overflow-y-auto">
          <RecentUpdates updates={recentUpdates} />
          <TrendingTags tags={trendingTags} />
        </aside>
      </div>
    </div>
  );
}
