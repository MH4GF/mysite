import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strict,
  {
    files: ["**/*.ts{,x}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          leadingUnderscore: "allowSingleOrDouble",
        },
        {
          selector: "parameter",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: [
            "classProperty",
            "objectLiteralProperty",
            "typeProperty",
            "objectLiteralMethod",
          ],

          format: null,
        },
      ],
      "@typescript-eslint/consistent-type-imports": ["error"],
    },
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.{,c,m}{j,t}s{,x}"],
    ...importPlugin.flatConfigs.recommended,
    rules: {
      "import/order": [
        "error",
        {
          "newlines-between": "always",
          groups: ["builtin", "external", "parent", "sibling", "index"],

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  // ...compat.extends("plugin:@next/next/recommended"),
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
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    rules: {
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "import/order": "off",
    },
  },
];
