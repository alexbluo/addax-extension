const path = require("path");

module.exports = {
  entry: {
    content: "./scripts/content.js",
    background: "./scripts/background.js",
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
