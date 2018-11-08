const path = require('path')


let defaultConfig = {
    root: path.resolve(__dirname, '../'),
    entry: path.resolve(__dirname, '../src'),
    output: path.resolve(__dirname, '../dist'),
  }
module.exports = {
  defaultConfig,
  DEV: {
    ...defaultConfig,
    port: 8085,
    devtool: 'cheap-module-eval-source-map', // false 或具体的 map 配置
    autoOpenBrowser: false,
    assetsPublicPath: '/',
  },
  BUILD: {
    ...defaultConfig,
    devtool: '#source-map', // false 或具体的 map 配置
    assetsPublicPath: '/',
  },
}