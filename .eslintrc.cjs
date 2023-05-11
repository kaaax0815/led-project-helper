/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:tailwindcss/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'sort-imports': 'error',
    'tailwindcss/no-custom-classname': [
      'error',
      {
        whitelist: ['bg-quin-light', 'bg-quin-dark', 'bg-quin']
      }
    ]
  }
}
