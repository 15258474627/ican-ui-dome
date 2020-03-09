module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "semi": "error",
    "quotes": ["error", "single"],
    "comma-dangle": ["error", "always-multiline"],
    "space-before-function-paren": "error",
    "vue/component-name-in-template-casing": [
      "error",
      "kebab-case",
      {
        ignores: []
      }
    ],
    "prettier/prettier": [
      "error",
      {
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: "babel",
        insertPragma: true,
        requirePragma: true
      }
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
