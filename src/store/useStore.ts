import { create } from "zustand";

interface Store {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const useStore = create<Store>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));

export default useStore;
