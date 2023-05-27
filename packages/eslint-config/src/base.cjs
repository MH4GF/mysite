/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  ...require('@mh4gf/eslint-config'),
  parserOptions: { project: './tsconfig.json' },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    // tsのnoPropertyAccessFromIndexSignatureと競合するためオフにする
    // @see: https://typescript-eslint.io/rules/dot-notation/
    // @see: https://typescriptbook.jp/reference/tsconfig/nopropertyaccessfromindexsignature
    '@typescript-eslint/dot-notation': 'off',
  },
}
