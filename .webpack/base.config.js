/* 
  Setup path helper
*/
const Path = require("./utils/Path")

/* 
  Import Plugins
*/
const plugins = require("./plugins")

const path = Path([__dirname, "../"], {
  assets: "assets",
  source: {
    "root": "source"
  },
  build: "build",
  pscPackage: ".psc-package",
  nodeModules: "node_modules"
})

/* 
  Base configuration
 */
const base = {
  context: path.source(),
  entry: {
    app: path.source("index.js")
  },
  output: {
    path: path.build(),
    filename: "[name].js",
    chunkFilename: "[id].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.purs$/,
        loader: "purs-loader",
        query: {
          psc: "psa",
          pscIde: true,
          pscPackage: true,
          src: [
            path.source("**/*.purs")
          ]
        },
        exclude: [
          path.nodeModules()
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".purs"],
    modules: [
      path.source(), 
      path.nodeModules()
    ],
  },
  plugins: [
    plugins.html(
      "PureScript by Example",
      path.source("index.html"),
      "index.html"
    )
  ],
  stats: {
    all: false,
    modules: false,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.build()  
  }
}

module.exports = base