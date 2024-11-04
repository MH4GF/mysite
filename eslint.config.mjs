import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupConfigRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("plugin:@next/next/recommended"),
  {
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    settings: {
      "import/resolver": {
        typescript: {},
      },
    },

    rules: {
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "import/order": "off",
    },
  },
  ...compat.extends("eslint:recommended"),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...fixupConfigRules(compat.extends("plugin:import/recommended")).map((config) => ({
    ...config,
    files: ["**/*.{,c,m}{j,t}s{,x}"],
  })),
  {
    files: ["**/*.{,c,m}{j,t}s{,x}"],

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
  ...compat
    .extends(
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:@typescript-eslint/strict",
    )
    .map((config) => ({
      ...config,
      files: ["**/*.ts{,x}"],
    })),
  {
    files: ["**/*.ts{,x}"],

    plugins: {
      "unused-imports": unusedImports,
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    settings: {
      "import/resolver": {
        typescript: {},
      },
    },

    rules: {
      "@typescript-eslint/no-unused-vars": "off",
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
];
