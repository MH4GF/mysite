const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx"],
  darkMode: "class",
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
              textDecoration: "none",
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
      colors: {
        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        "foreground-sub": "rgb(var(--foreground-sub))",
        primary: {
          DEFAULT: "rgb(var(--primary))",
          foreground: "rgb(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          foreground: "rgb(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          foreground: "rgb(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
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
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
        },
      });
    }),
  ],
};
