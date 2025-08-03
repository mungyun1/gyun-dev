"use client";

import { useEffect } from "react";
import useStore from "@/store/useStore";
import { applyTheme, getInitialTheme } from "@/utils/theme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useStore();

  useEffect(() => {
    // 초기 테마 설정
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    // 테마 변경 시 DOM에 적용
    applyTheme(theme);
  }, [theme]);

  return <>{children}</>;
}
