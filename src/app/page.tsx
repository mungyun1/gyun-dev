import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Gyun.dev</h1>
      <section className="space-y-4">
        <p className="text-lg">
          안녕하세요! 개발자 Gyun의 블로그에 오신 것을 환영합니다.
        </p>
        <p className="text-gray-600">
          이곳에서 개발 경험과 기술적인 인사이트를 공유합니다.
        </p>
      </section>
    </main>
  );
}
