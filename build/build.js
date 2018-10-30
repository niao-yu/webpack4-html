const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin') // 用于在构建前清除dist目录中的内容
const webpackConfig = require('./webpack.config')
const { BUILD } = require('../config/index')
const ora = require('ora') // 在终端显示文字/图标的插件


process.env.NODE_ENV = 'production';
// 清除dist构建目录文件
let config = merge(webpackConfig, {
  mode: 'production',
  devtool: BUILD.devtool,
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
      root: path.resolve(__dirname, '../'),
      verbose: true
    })
  ]
})

const spinner = ora('building for production...')
spinner.start()


webpack(config, function (err, stats) {
  spinner.stop()
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    compress: true, // 是否启用gzip压缩
    chunks: false,
    clientLogLevel: 'none', 
    chunkModules: false
  }) + '\n')
})