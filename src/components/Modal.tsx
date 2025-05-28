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
    <div
      className="fixed inset-0 bg-black/30 flex flex-col items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onDismiss();
      }}
    >
      <div className="h-[90vh] sm:h-[700px] w-full max-w-3xl bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-auto">
        {children}
      </div>
    </div>
  );
}
