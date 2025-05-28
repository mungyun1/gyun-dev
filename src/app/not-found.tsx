import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
      <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-100">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mt-4">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
