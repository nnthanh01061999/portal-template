import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1677ff",
          50: "#e6f4ff",
          100: "#bae0ff",
          200: "#91caff",
          300: "#69b1ff",
          400: "#4096ff",
          500: "#1677ff",
          600: "#0958d9",
          700: "#003eb3",
          800: "#002c8c",
          900: "#001d66"
        },
        success: {
          DEFAULT: "#52c41a",
          50: "#f6ffed",
          100: "#d9f7be",
          200: "#b7eb8f",
          300: "#95de64",
          400: "#73d13d",
          500: "#52c41a",
          600: "#389e0d",
          700: "#237804",
          800: "#135200",
          900: "#092b00"
        },
        warning: {
          DEFAULT: "#faad14",
          50: "#fffbe6",
          100: "#fff1b8",
          200: "#ffe58f",
          300: "#ffd666",
          400: "#ffc53d",
          500: "#faad14",
          600: "#d48806",
          700: "#ad6800",
          800: "#874d00",
          900: "#613400"
        },
        error: {
          DEFAULT: "#ff4d4f",
          50: "#fff1f0",
          100: "#ffccc7",
          200: "#ffa39e",
          300: "#ff7875",
          400: "#ff4d4f",
          500: "#f5222d",
          600: "#cf1322",
          700: "#a8071a",
          800: "#820014",
          900: "#5c0011"
        }
      }
    }
  },
  plugins: []
}

export default config
