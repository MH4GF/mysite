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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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
