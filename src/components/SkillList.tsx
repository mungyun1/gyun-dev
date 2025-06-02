interface Skill {
  name: string;
  category: string;
}

interface SkillListProps {
  skills: Skill[];
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

// 미리 정의된 색상 조합 (배경색, 텍스트색)
const colorPairs = [
  { bg: "bg-blue-50", text: "text-blue-800" },
  { bg: "bg-green-50", text: "text-green-800" },
  { bg: "bg-purple-50", text: "text-purple-800" },
  { bg: "bg-yellow-50", text: "text-yellow-800" },
  { bg: "bg-pink-50", text: "text-pink-800" },
  { bg: "bg-indigo-50", text: "text-indigo-800" },
  { bg: "bg-red-50", text: "text-red-800" },
  { bg: "bg-cyan-50", text: "text-cyan-800" },
  { bg: "bg-orange-50", text: "text-orange-800" },
  { bg: "bg-teal-50", text: "text-teal-800" },
];

// 스킬 이름에 따라 일관된 색상 반환
const getSkillStyle = (skillName: string): string => {
  const hash = hashString(skillName);
  const colorIndex = hash % colorPairs.length;
  const { bg, text } = colorPairs[colorIndex];

  return `${bg} ${text} hover:bg-opacity-75`;
};

export default function SkillList({ skills }: SkillListProps) {
  // 카테고리별로 스킬 그룹화
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-4 min-[400px]:space-y-8">
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <div key={category} className="space-y-2 min-[400px]:space-y-4">
          <h3 className="text-base min-[400px]:text-lg font-semibold text-gray-700 dark:text-white">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2 min-[400px]:gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`inline-flex items-center px-2 min-[400px]:px-4 py-1 min-[400px]:py-2 rounded-xl min-[400px]:rounded-2xl transition-colors ${getSkillStyle(
                  skill.name
                )}`}
              >
                <span className="text-sm min-[400px]:text-base font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
