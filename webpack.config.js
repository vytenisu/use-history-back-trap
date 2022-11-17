const webpack = require('webpack')
const NpmDtsWebpackPlugin = require('npm-dts-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin

const exportedConfig = {
  entry: __dirname + '/index.ts',
  devtool: 'source-map',
  optimization: {
    minimize: true,
  },
  mode: 'production',
  externals: [nodeExternals()],
  plugins: [
    new LicenseWebpackPlugin(),
    new ESLintPlugin({
      extensions: 'ts',
    }),
    new NpmDtsWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index.js',
    sourceMapFilename: 'index.js.map',
    libraryTarget: 'umd',
    library: 'useHistoryBackTrap',
  },
  resolveLoader: {
    modules: [__dirname + '/node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: __dirname + '/tsconfig.json',
            },
          },
        ],
      },
    ],
  },
}

module.exports = exportedConfig
