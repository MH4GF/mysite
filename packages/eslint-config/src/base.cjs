/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  plugins: ["import-access"],
  extends: ["@mh4gf/eslint-config", "plugin:tailwindcss/recommended"],
  parserOptions: { project: "./tsconfig.json" },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "import-access/jsdoc": [
      "error",
      {
        indexLoophole: true,
        filenameLoophole: false,
        defaultImportability: "package",
      },
    ],
    // tsのnoPropertyAccessFromIndexSignatureと競合するためオフにする
    // @see: https://typescript-eslint.io/rules/dot-notation/
    // @see: https://typescriptbook.jp/reference/tsconfig/nopropertyaccessfromindexsignature
    "@typescript-eslint/dot-notation": "off",
  },
};
