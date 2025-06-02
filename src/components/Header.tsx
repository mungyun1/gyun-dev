"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import useStore from "@/store/useStore";

export default function Header() {
  const { theme, setTheme } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/90 backdrop-blur-sm z-50 border-b dark:border-slate-700">
        <div className="max-w-[90rem] mx-auto px-4 h-16 flex items-center justify-between shadow-sm">
          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"
            title="메뉴"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* 데스크톱 로고 */}
          <Link
            href="/"
            className="hidden md:block text-xl font-mono font-bold text-gray-900 dark:text-gray-100"
          >
            Gyun's Dev
          </Link>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"
              title="다크모드 전환"
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-600 dark:text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <Link
              href="/tags"
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-600 dark:text-gray-300"
              title="태그"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/search"
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-gray-600 dark:text-gray-300"
              title="검색"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* 모바일 네비게이션 메뉴 */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />
      <nav
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center p-6 border-b dark:border-slate-700">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 mb-4">
            <Link href="/about">
              <img
                src="/Profile.png"
                alt="Profile"
                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Mun Gyun🧑‍💻
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Think Different
          </p>
        </div>
        <div className="p-4">
          <Link
            href="/"
            className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-center"
            onClick={toggleMenu}
          >
            HOME
          </Link>
          <Link
            href="/categories"
            className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-center"
            onClick={toggleMenu}
          >
            CATEGORIES
          </Link>
          <Link
            href="/tags"
            className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-center"
            onClick={toggleMenu}
          >
            TAGS
          </Link>
          <Link
            href="/about"
            className="block py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 text-center"
            onClick={toggleMenu}
          >
            ABOUT
          </Link>
        </div>
      </nav>
    </>
  );
}
