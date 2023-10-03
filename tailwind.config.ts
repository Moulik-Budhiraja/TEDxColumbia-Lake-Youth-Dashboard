import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import flowbite from "flowbite/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
      colors: {
        "tedx-blue": "#111827",
        "tedx-white": "#f2f1f4",
        "tedx-red": "#eb0028",
        "tedx-dark-red": "#3F0D21",
        "tedx-dark-blue": "#111827",
        "tedx-muted": "#999",
        "tedx-paragraph": "#e5e7eb",
        "tedx-dark-bg": "rgb(21, 32, 47)",
      },
      aspectRatio: {
        unset: "unset",
      },
      spacing: {
        160: "40rem",
        200: "50rem",
      },
      gridTemplateColumns: {
        "minmax-15-1fr": "repeat(auto-fill, minmax(15rem, 1fr))",
      },
      listStyleType: {
        revert: "revert",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("group-hocus", [".group:hover &", ".group:focus &"]);
      addVariant("vocus", ["&:focus", "&:valid"]);
      addVariant("peer-vocus", [".peer:focus ~ &", ".peer:valid ~ &"]);
    }),
  ],
};

export default config;
