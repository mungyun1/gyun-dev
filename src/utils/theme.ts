export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "gyun-dev-theme";

// 로컬 스토리지에서 테마 가져오기
export const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch (error) {
    console.warn("로컬 스토리지에서 테마를 가져오는 중 오류 발생:", error);
  }

  return "light";
};

// 로컬 스토리지에 테마 저장하기
export const setStoredTheme = (theme: Theme): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.warn("로컬 스토리지에 테마를 저장하는 중 오류 발생:", error);
  }
};

// 시스템 테마 감지
export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// DOM에 테마 클래스 적용
export const applyTheme = (theme: Theme): void => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

// 초기 테마 설정 (저장된 테마 또는 시스템 테마)
export const getInitialTheme = (): Theme => {
  const storedTheme = getStoredTheme();

  // 저장된 테마가 있으면 사용, 없으면 시스템 테마 사용
  if (storedTheme !== "light") {
    return storedTheme;
  }

  return getSystemTheme();
};
