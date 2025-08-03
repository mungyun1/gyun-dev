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

// 미리 정의된 색상 조합 (라이트모드: 배경색, 텍스트색, 다크모드: 배경색, 텍스트색)
const colorPairs = [
  {
    light: { bg: "bg-blue-50", text: "text-blue-800" },
    dark: { bg: "bg-blue-900/30", text: "text-blue-300" },
  },
  {
    light: { bg: "bg-green-50", text: "text-green-800" },
    dark: { bg: "bg-green-900/30", text: "text-green-300" },
  },
  {
    light: { bg: "bg-purple-50", text: "text-purple-800" },
    dark: { bg: "bg-purple-900/30", text: "text-purple-300" },
  },
  {
    light: { bg: "bg-yellow-50", text: "text-yellow-800" },
    dark: { bg: "bg-yellow-900/30", text: "text-yellow-300" },
  },
  {
    light: { bg: "bg-pink-50", text: "text-pink-800" },
    dark: { bg: "bg-pink-900/30", text: "text-pink-300" },
  },
  {
    light: { bg: "bg-indigo-50", text: "text-indigo-800" },
    dark: { bg: "bg-indigo-900/30", text: "text-indigo-300" },
  },
  {
    light: { bg: "bg-red-50", text: "text-red-800" },
    dark: { bg: "bg-red-900/30", text: "text-red-300" },
  },
  {
    light: { bg: "bg-cyan-50", text: "text-cyan-800" },
    dark: { bg: "bg-cyan-900/30", text: "text-cyan-300" },
  },
  {
    light: { bg: "bg-orange-50", text: "text-orange-800" },
    dark: { bg: "bg-orange-900/30", text: "text-orange-300" },
  },
  {
    light: { bg: "bg-teal-50", text: "text-teal-800" },
    dark: { bg: "bg-teal-900/30", text: "text-teal-300" },
  },
];

// 스킬 이름에 따라 일관된 색상 반환
const getSkillStyle = (skillName: string): string => {
  const hash = hashString(skillName);
  const colorIndex = hash % colorPairs.length;
  const { light, dark } = colorPairs[colorIndex];

  return `${light.bg} ${light.text} dark:${dark.bg} dark:${dark.text} hover:bg-opacity-75 dark:hover:bg-opacity-50`;
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
    <div className="space-y-4 sm:space-y-6">
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <div key={category} className="space-y-2 sm:space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-white">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-colors ${getSkillStyle(
                  skill.name
                )}`}
              >
                <span className="text-sm sm:text-base font-medium">
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
