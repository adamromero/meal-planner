const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
   mode: "production",
   output: {
      filename: "bundle.[hash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "./",
      clean: true,
   },
   plugins: [
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
      new CleanWebpackPlugin(),
   ],
});
