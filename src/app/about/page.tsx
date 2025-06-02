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
    <div className="w-full max-w-4xl mx-auto px-2 min-[400px]:px-3 sm:px-4 py-3 min-[400px]:py-4 sm:py-6 md:py-8 space-y-8 min-[400px]:space-y-12 sm:space-y-16 md:space-y-20">
      {/* 소개 섹션 */}
      <section className="space-y-4 min-[400px]:space-y-6 sm:space-y-8 md:space-y-12">
        <h1 className="text-sm min-[400px]:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text leading-tight">
          {introduction.title}
        </h1>
        <div className="flex flex-col md:flex-row gap-4 min-[400px]:gap-6 sm:gap-8 md:gap-12 items-center">
          <div className="w-full max-w-[160px] min-[400px]:max-w-[200px] sm:max-w-[240px] md:w-72 flex-shrink-0">
            <div className="relative">
              <Image
                src="/Profile2.png"
                alt="profile"
                width={280}
                height={280}
                className="rounded-xl min-[400px]:rounded-2xl shadow-lg w-full object-cover"
                priority
              />
              <div className="absolute -bottom-1.5 -right-1.5 min-[400px]:-bottom-2 min-[400px]:-right-2 sm:-bottom-3 sm:-right-3 bg-white p-1.5 min-[400px]:p-2 sm:p-3 rounded-lg min-[400px]:rounded-xl shadow-lg">
                <span className="text-base min-[400px]:text-lg sm:text-xl md:text-2xl">
                  💻
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="prose prose-xs min-[400px]:prose-sm sm:prose-base md:prose-lg max-w-none">
              {introduction.descriptions.map(({ icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 min-[400px]:gap-2 sm:gap-3 md:gap-4 p-1.5 min-[400px]:p-2 sm:p-3 md:p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 min-[400px]:w-8 min-[400px]:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <span className="text-base min-[400px]:text-lg sm:text-xl md:text-2xl">
                      {icon}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-xs min-[400px]:text-sm sm:text-base md:text-lg my-0">
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
        <h2 className="text-sm min-[400px]:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text mb-4 min-[400px]:mb-6 sm:mb-8">
          주로 사용하는 기술입니다🛠️
        </h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl min-[400px]:rounded-2xl shadow-sm p-2 min-[400px]:p-3 sm:p-4 md:p-6 border border-gray-100 dark:border-slate-700">
          <SkillList skills={skills} />
        </div>
      </section>
    </div>
  );
}
