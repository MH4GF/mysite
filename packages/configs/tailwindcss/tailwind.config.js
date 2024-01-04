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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
