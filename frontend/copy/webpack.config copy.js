const HtmlWebPackPlugin = require("html-webpack-plugin");
const { DefinePlugin, ProvidePlugin } = require("webpack");
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
      alias: {
        process: "process/browser",
      },

      fallback: {
        url: require.resolve("url/"), //url
        os: require.resolve("os-browserify/browser"), //os-browserify
        crypto: require.resolve("crypto-browserify"), //crypto-browserify
        assert: require.resolve("assert/"), //assert
        http: require.resolve("stream-http"), //stream-http
        https: require.resolve("https-browserify"), //https-browserify
        //process: require.resolve('process'),
        //buffer: require.resolve("buffer/"),
      },
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
      }),

      new ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
/*
      new ProvidePlugin({
        process: "process/browser",
        url: "url/", //url
        os: "os-browserify/browser", //os-browserify
        crypto: "crypto-browserify", //crypto-browserify
        assert: "assert/", //assert
        http: "stream-http", //stream-http
        https: "https-browserify", //https-browserify
      }),*/
      new DefinePlugin({
        "process.env.REACT_APP_BACKEND_URL": JSON.stringify(
          process.env.REACT_APP_BACKEND_URL
        ),
        //"process.env.PORT": JSON.stringify(process.env.PORT),
        "process.env.SECRET_KEY": JSON.stringify(process.env.SECRET_KEY),
        "process.env.REACT_APP_SECRET_KEY": JSON.stringify(
          process.env.REACT_APP_SECRET_KEY
        ),
      }),
    ],
  };
};
