import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#171717",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
            color: "#374151",
            a: {
              color: "#2563eb",
              "&:hover": {
                color: "#1d4ed8",
              },
            },
            h1: {
              color: "#111827",
            },
            h2: {
              color: "#111827",
            },
            h3: {
              color: "#111827",
            },
            h4: {
              color: "#111827",
            },
            h5: {
              color: "#111827",
            },
            h6: {
              color: "#111827",
            },
            p: {
              color: "#374151",
            },
            ul: {
              color: "#374151",
            },
            ol: {
              color: "#374151",
            },
            li: {
              color: "#374151",
            },
            code: {
              color: "#1f2937",
              backgroundColor: "#f3f4f6",
            },
            pre: {
              backgroundColor: "#f3f4f6",
              color: "#1f2937",
            },
            blockquote: {
              color: "#6b7280",
            },
            strong: {
              color: "#111827",
            },
            em: {
              color: "#374151",
            },
          },
        },
        dark: {
          css: {
            color: "#d1d5db",
            a: {
              color: "#60a5fa",
              "&:hover": {
                color: "#93c5fd",
              },
            },
            h1: {
              color: "#ffffff",
            },
            h2: {
              color: "#ffffff",
            },
            h3: {
              color: "#ffffff",
            },
            h4: {
              color: "#ffffff",
            },
            h5: {
              color: "#ffffff",
            },
            h6: {
              color: "#ffffff",
            },
            p: {
              color: "#d1d5db",
            },
            ul: {
              color: "#d1d5db",
            },
            ol: {
              color: "#d1d5db",
            },
            li: {
              color: "#d1d5db",
            },
            code: {
              color: "#f9fafb",
              backgroundColor: "#374151",
            },
            pre: {
              backgroundColor: "#1f2937",
              color: "#f9fafb",
            },
            blockquote: {
              color: "#9ca3af",
            },
            strong: {
              color: "#ffffff",
            },
            em: {
              color: "#d1d5db",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
