import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#002027",
        foreground: "",
        cyan75: "#75EDEA",
        cyanB7: "#77D8D5",
        darkcyan: "#002F39",
        darkcyan27: "#002027",

      },
    },
  },
  plugins: [],
} satisfies Config;
