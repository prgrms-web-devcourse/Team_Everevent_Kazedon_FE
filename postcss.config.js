const postcss = require('postcss');
const stylelint = require('stylelint');
const syntax = require('postcss-syntax');

postcss([stylelint({ fix: true })])
  /* eslint-disable no-undef */
  .process(source, { syntax })
  .then((result) => result.content);

module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
  },
};
