const HtmlWebPackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const path = require("path");
const dotenv = require("dotenv");

module.exports = (env, argv) => {
  return {
    mode: "development",
    context: __dirname,
    entry: "./src/index.jsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
      publicPath: "/",
    },
    devServer: {
      historyApiFallback: true,
      port: 1000,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        /*
        {
          test: /\.js$/,
          use: "babel-loader",
        },
        {
          test: /\.(tsx?)$/,
          use: "ts-loader",
        },*/
        {
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader",
            //          "typings-for-css-modules-loader?namedExport&modules",
          ],
        },
        {
          test: /\.(png|j?g|svg|gif)?$/,
          use: "file-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
 
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        filename: "index.html",
      }),
      new DefinePlugin({
        "process.env":
          argv.mode === "development"
            ? JSON.stringify(
                dotenv.config({
                  path: path.resolve(__dirname, "./.env.development"),
                }).parsed
              )
            : JSON.stringify(dotenv.config().parsed),
      })
    ],
  };
};
