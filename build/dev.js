const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const portfinder = require('portfinder') // 获取可用端口
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 更友好的打印提示插件

const { DEV } = require('../config/index')

process.env.NODE_ENV = 'development';

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = DEV.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 提示 端口port发生变化, 使用的黄色, 其他颜色参考 https://blog.csdn.net/autumn84/article/details/44816947 , 或者使用插件 colors
      if (port != DEV.port) console.log('\x1B[33m%s\x1b[0m', `The port has changed: ${DEV.port} => ${port}`)
      let devConfig = merge(webpackConfig, {
        devtool: DEV.devtool,
        mode: 'development',
        // 前台开发本地服务插件
        devServer: {
          contentBase: path.resolve(__dirname, '../dist'), //路径(注意:加点-此路径为相对 output 的相对路径;不加点:此盘的绝对路径)
          // publicPath: '/',
          port: port, // 端口
          // hot: true, // 热更新
          progress: true, // 显示打包进度
          compress: true, // 服务器压缩式，一般为true
          inline: true, // 实时刷新
          // overlay: DEV.errorOverlay ? { warnings: false, errors: true } : false, // 消息提示控制
          open: DEV.autoOpenBrowser, // 服务启动,自动打开浏览器
          quiet: true, // necessary for FriendlyErrorsPlugin
        },
        plugins: [
          new webpack.DefinePlugin({ // 插入编译后代码中的全局变量
            'NODE_ENV': JSON.stringify('development'),
          }),
          new FriendlyErrorsPlugin({ // 编译完成提示
            compilationSuccessInfo: {
              messages: [`Your application is running here: http://localhost:${port}`],
            },
          })
        ]
      })
      resolve(devConfig)
    }
  })
})