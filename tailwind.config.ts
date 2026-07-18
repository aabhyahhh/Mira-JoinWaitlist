import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "DM Mono",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        /* Brand accent — terracotta red, same hue as primary/destructive. */
        terracotta: {
          50: "#fcf0ee",
          100: "#f7dcd9",
          200: "#f1bdb7",
          300: "#e99a90",
          400: "#e17465",
          500: "#d9513f",
          600: "#c83a27",
          700: "#a63021",
          800: "#88271b",
          900: "#6f2016",
        },
        /* Near-black warm foreground and its tints. */
        ink: {
          50: "#f6f5f3",
          100: "#e9e6e2",
          200: "#d3ccc5",
          300: "#b4a89d",
          400: "#90806f",
          500: "#6e6154",
          600: "#564c43",
          700: "#3f3831",
          800: "#2b2621",
          900: "#1a1714",
        },
        /* Parchment/cream surfaces. */
        parchment: {
          DEFAULT: "#f5f0e8",
          50: "#fdfdfb",
          100: "#fcfaf8",
          200: "#f6f1ea",
          300: "#f0e8db",
        },
        /* Tan/gold ring + warm accent, matches the logo mark. */
        gold: {
          50: "#f9f5f1",
          100: "#f0e6db",
          200: "#e0cdb8",
          300: "#d7bfa2",
          400: "#c9a882",
          500: "#ba8f5f",
          600: "#a47947",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "warm-sm": "0 1px 2px hsl(var(--shadow-color) / 0.06)",
        warm:
          "0 1px 3px hsl(var(--shadow-color) / 0.08), 0 1px 2px hsl(var(--shadow-color) / 0.05)",
        "warm-lg":
          "0 8px 24px hsl(var(--shadow-color) / 0.12), 0 2px 8px hsl(var(--shadow-color) / 0.06)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
