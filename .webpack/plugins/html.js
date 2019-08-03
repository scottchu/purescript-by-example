/* 
  Setup html-webpack-plugin Plugin
*/
const HtmlWebpackPlugin = require("html-webpack-plugin")

const html = (title, template, filename) => {
  return new HtmlWebpackPlugin({
    title,
    template,
    filename
  })
}

module.exports = html