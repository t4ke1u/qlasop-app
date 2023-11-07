module.exports = {
  root: true,
  plugins: [
    '@typescript-eslint',
    'import',
    'sort-keys-fix',
    'typescript-sort-keys',
    'unused-imports',
  ],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [],
      },
    ],
    'import/no-duplicates': 'error', // 同じモジュールから複数の変数をインポートしている場合、エラーを出す
    'react/jsx-sort-props': 'error', // JSXの属性をアルファベット順にソート
    'sort-keys-fix/sort-keys-fix': 'error', // オブジェクトのキーをアルファベット順に自動でソート
    'typescript-sort-keys/interface': 'error', // TypeScriptのインターフェースのキーをアルファベット順に自動でソート
    'no-param-reassign': [2, { props: false }], // パラメーターのプロパティ変更を許可
    'unused-imports/no-unused-imports': 'error', // 使っていないimportは削除
    '@typescript-eslint/no-unused-vars': 'off', // unused-importsとのエラーの重複を消す
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }], // 型はimport typeで表示
  },
}
