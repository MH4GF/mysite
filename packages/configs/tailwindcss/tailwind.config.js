const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      /**
       * Tailwind UIはInterの利用を推奨しており、Next.jsでの統合を設定している
       * @see: https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css
       */
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--mysite-code-bg": colors.zinc[200],
            "--mysite-invert-code-bg": colors.zinc[700],
            maxWidth: "100%",
            a: {
              wordWrap: "break-word",
            },
            code: {
              backgroundColor: "var(--mysite-code-bg)",
              borderRadius: theme("borderRadius.DEFAULT"),
              paddingTop: theme("spacing.[0.5]"),
              paddingBottom: theme("spacing.[0.5]"),
              paddingLeft: theme("spacing.[1.5]"),
              paddingRight: theme("spacing.[1.5]"),
              fontWeight: "normal",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
