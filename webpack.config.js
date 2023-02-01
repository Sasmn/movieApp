const path = require("path");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const { mode } = argv;
  const additionalPlugins =
    mode === "production"
      ? []
      : [new webpack.HotModuleReplacementPlugin(), new ReactRefreshPlugin()];

  const additionalEntries =
    mode === "production"
      ? []
      : ["webpack-hot-middleware/client?http://localhost:8000"];

  return {
    mode,
    devtool: "inline-source-map",
    devServer: {
      logging: "warn",
      noInfo: true,
      historyApiFallback: true,
    },
    entry: ["@babel/polyfill", "./client", ...additionalEntries],
    resolve: {
      alias: {
        Utilities: path.resolve(__dirname, "client/util/"),
        Components: path.resolve(__dirname, "client/components/"),
        Assets: path.resolve(__dirname, "client/assets/"),
        "@root": path.resolve(__dirname),
      },
      extensions: [".ts", ".js"],
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
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            // {
            //   loader: "sass-loader",
            //   options: {
            //     // Prefer `dart-sass`
            //     implementation: sass,
            //   },
            // },
          ],
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
        "process.env.PORT": 5000,
      }),
      new HtmlWebpackPlugin({
        template: "index.html",
        favicon: path.resolve(
          __dirname,
          "client/assets/images/movie-icon-27.png"
        ),
      }),
      ...additionalPlugins,
    ],
  };
};
