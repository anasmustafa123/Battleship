"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/* const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; */
  
/* used to copy data from file to dist */
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    /* keep only one file of js in dist instead of creating one after every change */
    clean: true,
    /* so that the image names stay the same after compiling */
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map",
  /* creating developer server */
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  /* module for adding the loaders init*/
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\.(svg|jpeg|jpg|png|gif)$/i,
        type: "asset/resource",
        /* bundle the imgs in dist/assets */
        generator: {
          filename: "assets/[name][ext]",
        },
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },

  /* array of plugins */
  plugins: [
    /* html plugin to create the in the src instead of the dist*/
    new HtmlWebpackPlugin({
      title: "webpack App",
      filename: "index.html",
      template: "src/template.html",
    }),
    /* new BundleAnalyzerPlugin(), */
    /* copy all assets from src/assets to dist/assets */
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets", to: "assets" }],
    }),
  ],
};
