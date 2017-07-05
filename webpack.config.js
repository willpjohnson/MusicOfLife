var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/grid.js",
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: "bundle.js"
  }
};
