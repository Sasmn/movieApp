require("dotenv").config();
require("module-alias/register"); //a @util meg ezek használatához (package.json-ban vannak definiálva)
const chokidar = require("chokidar");
const express = require("express");
const path = require("path");
require("express-async-errors");
// const graphqlServer = require("./server/index")

const { PORT, inProduction } = require("@util/common");
const app = express();

// Require is here so we can delete it from cache when files change (*)
app.use("/api", (req, res, next) => require("./server/index")(req, res, next)); // eslint-disable-line

/**
 *  Use "hot loading" in backend
 */
const watcher = chokidar.watch("./server", {
  ignored: ["./server/queries.rest", "./server/models"],
}); // Watch server folder
watcher.on("ready", () => {
  watcher.on("all", () => {
    Object.keys(require.cache).forEach((id) => {
      if (id.includes("server") && !id.includes("models"))
        delete require.cache[id]; // Delete all require caches that point to server folder (*)
    });
  });
});

if (!inProduction) {
  /* eslint-disable */
  const webpack = require("webpack");
  const middleware = require("webpack-dev-middleware");
  const hotMiddleWare = require("webpack-hot-middleware");
  const webpackConf = require("@root/webpack.config");
  /* eslint-enable */

  const compiler = webpack(webpackConf("development", { mode: "development" })); //a webpack.config.js-ben a paramétereket (env és argv) developmentre állítva a webpack megadása

  const devMiddleware = middleware(compiler); //a webpack.config.js alapján a webpack-dev-middleware definiálása (a legfrissebben compile-olt bundle-t adja át a server-nek)
  app.use(devMiddleware); //és használja az express

  app.use(hotMiddleWare(compiler)); //a böngészőt összeköti a szerverrel (figyeli a szerveren a változásokat - a devMiddleware általi új bundle-kat)

  app.use("*", (req, res, next) => {
    //a harmadik MiddleWare, ami minden server-re küldött request esetén lefut
    const filename = path.join(compiler.outputPath, "index.html"); //megadja az abszolút path-ját az index.html-nek (a dist fájlban levő)

    devMiddleware.waitUntilValid(() => {
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return next(err);
        res.set("content-type", "text/html");
        res.send(result);
        return res.end();
      });
    });
  });
} else {
  //production mode-ban statikus legyen
  const DIST_PATH = path.resolve(__dirname, "./dist");
  const INDEX_PATH = path.resolve(DIST_PATH, "index.html");

  app.use(express.static(DIST_PATH));
  app.get("*", (req, res) => res.sendFile(INDEX_PATH));
}

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});

// graphqlServer.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });
