module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    // Order matters here, most js eslint rules gets confused with typescript typing notations,
    // so we put the typescript rules at the end to override any rule that can't deal with that
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],

    // Needed because we use typescript
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // This is needed in order for to use import with .tsx files due to the
    // airbnb linter config not including tsx in there :
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js#L139
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
  },
};
