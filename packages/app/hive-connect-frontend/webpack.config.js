const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "hiveconnect-app",
    projectName: "frontend",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    resolve: {
      plugins: [
        new TsconfigPathsPlugin(),
      ],
      fallback: {
        // https: false,
        // http: false,
        // "module": false,
        // "pnpapi": false,
        'process/browser': require.resolve('process/browser'),
        "path": require.resolve('path-browserify'),
        "buffer": require.resolve('buffer/'),
        "stream": require.resolve('stream'),
        // "crypto": require.resolve('crypto-browserify')
      }
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
              fullySpecified: false,
          },
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.EnvironmentPlugin({
        ...process.env,
        PUBLIC_URL: process.env.NODE_ENV == 'production' ? '/dashboard/connect' : '/dashboard/connect'
      }), 
    ]
  });
};
