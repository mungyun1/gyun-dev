"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 z-[60] bg-black/30"
        onClick={(e) => {
          if (e.target === e.currentTarget) onDismiss();
        }}
      />
      {/* 모달 컨텐츠 */}
      <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-4 pointer-events-none">
        <div className="h-[90vh] sm:h-[700px] w-full max-w-4xl bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-auto relative pointer-events-auto">
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="닫기"
          >
            <svg
              className="w-6 h-6 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>
  );
}
