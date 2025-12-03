import mh4gf from "@mh4gf/eslint-config";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

export default [
  ...mh4gf.configs.recommended,
  ...mh4gf.configs.typescript,
  {
    ...eslintPluginReact.configs.flat.recommended,
    ...eslintPluginReact.configs.flat["jsx-runtime"],
    plugins: {
      "react-hooks": eslintPluginReactHooks,
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginReact.configs["jsx-runtime"].rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "error",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".contentlayer/**",
      "public/search/**",
      "*.config.js",
      "*.config.mjs",
      ".dependency-cruiser.js",
      ".markuplintrc.ts",
    ],
  },
];
