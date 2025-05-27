"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // 디바운스 적용
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // URL 업데이트
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedTerm) {
      params.set("q", debouncedTerm);
    } else {
      params.delete("q");
    }
    router.push(`/search?${params.toString()}`);
  }, [debouncedTerm, router, searchParams]);

  return (
    <div className="mb-8 relative">
      <div className="relative flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute left-6 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          placeholder="Search something..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-xl w-full pl-16 pr-14 py-6 bg-gray-100 dark:bg-slate-800 rounded-full border-none text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-slate-700"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
