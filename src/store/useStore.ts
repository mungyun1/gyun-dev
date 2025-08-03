import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme, getInitialTheme, applyTheme } from "@/utils/theme";

interface Store {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const useStore = create<Store>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      setTheme: (theme: Theme) => {
        set({ theme });
        applyTheme(theme);
      },
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
        set({ theme: newTheme });
        applyTheme(newTheme);
      },
    }),
    {
      name: "gyun-dev-theme",
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

export default useStore;
