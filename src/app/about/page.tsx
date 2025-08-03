import { Metadata } from "next";
import SkillList from "@/components/SkillList";
import Image from "next/image";
import { createPersonSchema } from "@/utils/schema";
import Script from "next/script";

export const metadata: Metadata = {
  title: "소개",
  description:
    "프론트엔드 개발자 박문균을 소개합니다. UX을 최우선으로 고려하며, 세세한 인터랙션까지 신경쓰는 개발자입니다.",
  keywords: ["개발자", "프론트엔드", "박문균", "UX", "웹개발", "포트폴리오"],
  authors: [{ name: "문균 (Mun Gyun)" }],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "소개 | gyun-dev",
    description:
      "프론트엔드 개발자 박문균을 소개합니다. UX을 최우선으로 고려하며, 세세한 인터랙션까지 신경쓰는 개발자입니다.",
    url: "/about",
    type: "profile",
    images: [
      {
        url: "/Profile2.png",
        width: 1200,
        height: 630,
        alt: "About gyun-dev",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "소개 | gyun-dev",
    description: "프론트엔드 개발자 박문균을 소개합니다.",
    images: ["/Profile2.png"],
  },
};

const introduction = {
  title: "프론트엔드 개발자 박문균입니다🧑‍💻",
  descriptions: [
    {
      icon: "👨‍💻",
      text: "세세한 인터랙션까지 신경쓰는 개발자입니다.",
    },
    {
      icon: "🔧",
      text: "기술은 문제 해결의 도구라고 생각합니다.",
    },
    {
      icon: "🤝",
      text: "디자이너, 기획자와의 협업을 즐깁니다.",
    },
    {
      icon: "📚",
      text: "새로운 기술을 배우는 것을 즐깁니다.",
    },
    {
      icon: "⚡",
      text: "접근성과 성능 최적화를 통해 서비스를 개선합니다.",
    },
  ],
};

const skills = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Express", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "JavaScript", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "SQL", category: "Language" },
  { name: "Zustand", category: "State Management" },
  { name: "React Query", category: "State Management" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Styled Components", category: "Styling" },
];

export default function AboutPage() {
  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createPersonSchema()),
        }}
      />
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {/* 소개 섹션 */}
        <section className="space-y-6 sm:space-y-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text leading-tight">
            {introduction.title}
          </h1>
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
            <div className="w-full max-w-[200px] sm:max-w-[240px] md:w-64 flex-shrink-0">
              <div className="relative">
                <Image
                  src="/Profile2.png"
                  alt="profile"
                  width={280}
                  height={280}
                  className="rounded-xl shadow-lg w-full object-cover"
                  priority
                />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-white p-2 sm:p-3 rounded-lg shadow-lg">
                  <span className="text-lg sm:text-xl md:text-2xl">💻</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-3 sm:space-y-4">
                {introduction.descriptions.map(({ icon, text }, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <span className="text-lg sm:text-xl">{icon}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm sm:text-base pt-1">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 스킬 섹션 */}
        <section>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text mb-4 sm:mb-6">
            주로 사용하는 기술입니다🛠️
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 dark:border-slate-700">
            <SkillList skills={skills} />
          </div>
        </section>
      </div>
    </>
  );
}
