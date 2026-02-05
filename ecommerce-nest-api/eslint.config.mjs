// eslint.config.mjs
// @ts-check

import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // 1️⃣ Ignore chính config
  {
    ignores: ['eslint.config.mjs'],
  },

  // 2️⃣ ESLint core
  eslint.configs.recommended,

  // 3️⃣ TypeScript ESLint (❗ KHÔNG type-checked)
  ...tseslint.configs.recommended,

  // 4️⃣ Prettier (format thôi, không soi logic)
  eslintPluginPrettierRecommended,

  // 5️⃣ Language options cho NestJS
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
    },
  },

  // 6️⃣ RULES – CỐ Ý NHẸ
  {
    rules: {
      // ❌ Tắt mấy rule gây nhiễu khi học framework
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      // ❌ TUYỆT ĐỐI KHÔNG BẬT no-unsafe khi học NestJS
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',

      // ⚠️ async thì cảnh báo nhẹ
      '@typescript-eslint/no-floating-promises': 'warn',

      // ✨ Prettier: optional
      'prettier/prettier': ['off'],
    },
  },
);
