const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('../webpack.config')
process.env.NODE_ENV = 'development';
// webpackConfig.devtool = 'cheap-module-eval-source-map'
// webpack(webpackConfig, function (err, stats) {
//   if (err) throw err;
//   process.stdout.write(stats.toString({
//     colors: true,
//     modules: false,
//     children: false,
//     chunks: false,
//     chunkModules: false
//   }) + '\n')
// })
module.exports = merge(webpackConfig, {
  mode: 'development',
  // 前台开发本地服务插件
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'), //路径(注意:加点-此路径为相对 output 的相对路径;不加点:此盘的绝对路径)
    port: '8085', // 端口
    compress: true, // 服务器压缩式，一般为true
    inline: true, // 实时刷新
    open: false // 服务启动,自动打开浏览器
  },
})