const path = require("path");

module.exports = {
  entry: {
    background: "./scripts/background.js",
    parseAddax: "./scripts/parseAddax.js"
  },
  output: {
    path: path.resolve(__dirname, "out"),
    filename: "[name].js",
  },
  mode: "production",
  resolve: {
    extensions: [".js", "json"],
  },
};
