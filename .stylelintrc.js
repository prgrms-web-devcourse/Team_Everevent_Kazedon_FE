module.exports = {
  customSyntax: '@stylelint/postcss-css-in-js',
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'scss/operator-no-unspaced': null,
    'value-keyword-case': null,
    'scss/operator-no-newline-after': null,
    'function-whitespace-after': null,
    'unit-no-unknown': null,
  },
};
