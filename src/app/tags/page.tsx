import TagList from "@/components/TagList";

// 임시 데이터
const tags = [
  { name: "Spring", count: 4 },
  { name: "회고", count: 3 },
  { name: "우아한테크코스", count: 3 },
  { name: "Database", count: 3 },
  { name: "동시성", count: 2 },
  { name: "Kotlin", count: 2 },
  { name: "Java", count: 2 },
  { name: "JPA", count: 2 },
  { name: "Domain", count: 2 },
  { name: "의존성", count: 1 },
  { name: "보안", count: 1 },
  { name: "디자인패턴", count: 1 },
  { name: "Redis", count: 1 },
  { name: "Event", count: 1 },
  { name: "ETC", count: 1 },
];

export default function TagsPage() {
  return (
    <main className="ml-64 flex-1 p-8 mr-80">
      <div className="max-w-3xl mx-auto">
        <TagList tags={tags} />
      </div>
    </main>
  );
}
