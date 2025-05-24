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
    "📌 사용자 경험을 최우선으로 고려하며, 세세한 인터랙션까지 신경쓰는 개발자입니다.",
    "📌 기술은 문제 해결의 도구라고 생각하며, 사용자의 불편함을 해소하는 데 집중합니다.",
    "📌 디자이너, 기획자와의 협업을 즐기며 더 나은 사용자 경험을 위해 끊임없이 고민합니다.",
    "📌 새로운 기술을 배우는 것을 즐깁니다.",
    "📌 접근성과 성능 최적화를 통해 불편함 없이 서비스를 이용할 수 있도록 노력합니다.",
  ],
};

const skills = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Zustand", category: "State Management" },
  { name: "React Query", category: "State Management" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Styled Components", category: "Styling" },
  { name: "Docker", category: "Containerization" },
  { name: "AWS", category: "Cloud" },
  { name: "Firebase", category: "Cloud" },
  { name: "Vercel", category: "Cloud" },
];

export default function AboutPage() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 소개 섹션 */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
          {introduction.title}
        </h1>
        <div className="flex gap-12 items-center">
          <div className="flex flex-col gap-6 w-72">
            <div className="relative">
              <Image
                src="/Profile2.png"
                alt="profile"
                width={280}
                height={280}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-xl shadow-lg">
                <span className="text-2xl">💻</span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="prose prose-lg">
              {introduction.descriptions.map((desc, index) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 스킬 섹션 */}
      <section>
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
          주로 사용하는 기술입니다🛠️
        </h2>
        <SkillList skills={skills} />
      </section>
    </div>
  );
}
