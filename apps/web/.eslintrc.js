/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ["@mh4gf/eslint-config", "plugin:@next/next/recommended"],
  parserOptions: { project: "./tsconfig.json" },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    // tsのnoPropertyAccessFromIndexSignatureと競合するためオフにする
    // @see: https://typescript-eslint.io/rules/dot-notation/
    // @see: https://typescriptbook.jp/reference/tsconfig/nopropertyaccessfromindexsignature
    "@typescript-eslint/dot-notation": "off",

    // biomeへ移行するためオフにする
    "@typescript-eslint/no-empty-interface": "off",
  },
};
