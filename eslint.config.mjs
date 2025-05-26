import prettierPlugin from 'eslint-plugin-prettier'
import js from '@eslint/js'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import globals from 'globals'
import ESLintComments from 'eslint-plugin-eslint-comments'
import EslintImport from 'eslint-plugin-import'

export default [
  {
    ignores: ['ecosystem.config.js', '**/.next/*', '**/node_modules/*', '**/out/*', '**/public/*', '**/script/**/*.mjs', '**/*.d.ts', '**/*.mjs', '**/*.js', '**/__tests__/*', 'tailwind.config.ts'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      // 預設 globals
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: './tsconfig.jest.json', // paths 跟 jest 配置基本上一樣所以直接使用 jest
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
      'eslint-comments': ESLintComments,
      'eslint-import': EslintImport,
    },
    rules: {
      // react
      ...reactPlugin.configs.recommended.rules,
      'react/jsx-key': 'error', // 需要 key
      'react/self-closing-comp': 'error', // 自閉合
      'react/react-in-jsx-scope': 'off', // 排除 React import 誤判
      'react/no-unescaped-entities': 'off', // 允許字元
      'react/prop-types': 'off', // TypeScript 已經有檢查
      'react/no-unknown-property': 'off', // 啟用自訂屬性
      // ts
      ...typescriptPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off', // 啟用 any
      '@typescript-eslint/no-this-alias': 'off', // 啟用 this
      '@typescript-eslint/ban-types': 'off', // 關閉空物件
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off', // 啟用 optional chain
      '@typescript-eslint/no-unused-vars': 'off', // 未使用過於煩人
      '@typescript-eslint/ban-ts-comment': 'off', // 啟用 ts-ignore
      '@typescript-eslint/no-var-requires': 'off', // 關閉禁用 require
      // '@typescript-eslint/no-floating-promises': 'error', // 禁止未處理的 Promise，這檢測特別慢，但是很重要
      // other
      'no-unused-vars': 'off', // TypeScript 已經有檢查
      'no-redeclare': 'off', // TypeScript 已經有檢查
      'no-import-assign': 'off', // TypeScript 已經有檢查
      'no-undef': 'off', // TypeScript 已經有檢查
      'no-extra-boolean-cast': 'off', // 關閉多餘的布林轉換
      'eslint-comments/no-use': ['error', { allow: [] }], // 禁止使用所有 ESLint 註釋
      'eslint-import/order': ['error', { groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'] }], // 排序 import
      'eslint-import/no-duplicates': 'error', // 禁止重複 import
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
