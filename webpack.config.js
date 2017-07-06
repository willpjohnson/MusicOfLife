var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/index.js",
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "bundle.js"
  }
};
