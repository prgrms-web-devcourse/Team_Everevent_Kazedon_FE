const path = require('path');
const webpack = require('webpack');

const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          domains: ['picsum.photos', 'localhost'],
          path: '/',
          loader: 'default',
        }),
      })
    );
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          '@emotion/styled': toPath('node_modules/@emotion/styled'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
          '@components': toPath('src/components'),
          '@hooks': toPath('src/hooks'),
          '@pages': toPath('src/pages'),
          '@styles': toPath('src/styles'),
          '@stories': toPath('src/stories'),
          '@axios': toPath('src/axios'),
          '@apis': toPath('src/apis'),
          '@contexts': toPath('src/contexts'),
        },
      },
    };
  },
};
