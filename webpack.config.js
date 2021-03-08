const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ContextReplacementPlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  const config = {
    entry: "./src/app.js",
    mode: "production",
    // devtool: "source-map",
    target: "node",
    externals: [
      function (context, request, callback) {
        if (/^(aws-sdk)$/.test(request)) {
          // Externalize to a commonjs module using the request path
          return callback(null, "commonjs " + request);
        }
        // Continue without externalizing the import
        callback();
      }
    ],
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/, /\.test.js$/],
          use: { loader: "babel-loader" }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ContextReplacementPlugin(/require_optional/)
    ],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "app.js"
    }
  };

  const patterns = [{ from: "./package.json", to: "./" }];
  if (env && env.AWS_LAMBDA) {
    patterns.push({ from: "./src/index.js", to: "./" });
  }
  config.plugins.push(new CopyPlugin({ patterns }));

  return config;
};
