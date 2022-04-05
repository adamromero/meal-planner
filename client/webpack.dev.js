const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
   mode: "development",
   devtool: "inline-source-map",
   devServer: {
      historyApiFallback: true,
      proxy: {
         "/api": "http://localhost:5000",
      },
   },
   output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
   },
});
