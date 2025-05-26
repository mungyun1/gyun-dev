import { Metadata } from "next";
import SkillList from "@/components/SkillList";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Gyun's Blog",
  description: "개발자 박문균을 소개합니다.",
};

const introduction = {
  title: "프론트엔드 개발자 박문균입니다🧑‍💻",
  descriptions: [
    {
      icon: "👨‍💻",
      text: "UX을 최우선으로 고려하며, 세세한 인터랙션까지 신경쓰는 개발자입니다.",
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
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-20">
      {/* 소개 섹션 */}
      <section className="space-y-12">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text leading-tight">
          {introduction.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="relative">
              <Image
                src="/Profile2.png"
                alt="profile"
                width={280}
                height={280}
                className="rounded-2xl shadow-lg w-full object-cover"
                priority
              />
              <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-xl shadow-lg">
                <span className="text-2xl">💻</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="prose prose-lg max-w-none">
              {introduction.descriptions.map(({ icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg">
                    <span className="text-2xl">{icon}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg my-0">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 스킬 섹션 */}
      <section className="space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
          주로 사용하는 기술입니다🛠️
        </h2>
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <SkillList skills={skills} />
        </div>
      </section>
    </div>
  );
}
