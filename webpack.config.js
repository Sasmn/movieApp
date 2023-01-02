const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const { mode } = argv;
  const additionalPlugins =
    mode === "production" ? [] : [new webpack.HotModuleReplacementPlugin()];

  const additionalEntries =
    mode === "production"
      ? []
      : ["webpack-hot-middleware/client?http://localhost:8000"];

  return {
    mode,
    entry: ["@babel/polyfill", "./client", ...additionalEntries],
    resolve: {
      alias: {
        Utilities: path.resolve(__dirname, "client/util/"),
        Components: path.resolve(__dirname, "client/components/"),
        Assets: path.resolve(__dirname, "client/assets/"),
        "@root": path.resolve(__dirname),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.BUILT_AT": JSON.stringify(new Date().toISOString()),
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      new HtmlWebpackPlugin({
        template: "index.html",
        favicon: path.resolve(__dirname, "client/assets/movie-icon-27.png"),
      }),
      ...additionalPlugins,
    ],
  };
};
