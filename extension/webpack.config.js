const path = require("path");

module.exports = {
  entry: {
    background: "./scripts/background.ts",
  },
  output: {
    path: path.resolve(__dirname, "out"),
    filename: "[name].js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.scripts.json",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", "json"],
  },
};
