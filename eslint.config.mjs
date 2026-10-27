import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['js/**/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: globals.browser,
    },
    rules: {
      // the files share classes and constants through <script> tags, and p5 runs in
      // global mode, so ESLint can't see where most names are defined
      'no-undef': 'off',
      // top-level classes and functions are used from other files, so only check locals
      'no-unused-vars': ['error', { vars: 'local' }],
    },
  },
];
