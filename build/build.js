const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 用于在构建前清除dist目录中的内容
const webpackConfig = require('../webpack.config')
process.env.NODE_ENV = 'production';
// 清除dist构建目录文件
let config = merge(webpackConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
      root: path.resolve(__dirname, '../'),
      verbose: true
    })
  ]
})
webpack(config, function (err, stats) {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})