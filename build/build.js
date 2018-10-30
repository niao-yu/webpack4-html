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
  ],
  // 代码拆分抽离公共模块
  optimization: {
    minimize: true, //是否进行代码压缩
    splitChunks: {
      chunks: 'async',
      minSize: 30000, //模块大于30k会被抽离到公共模块
      minChunks: 1, //模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, //入口模块最多只能加载3个
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  }
  // optimization: {
  //   runtimeChunk: {
  //     name: 'manifest',
  //   },
  //   splitChunks: {
  //     minSize: 20000, // 超过20k才会被打包
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all',
  //         minChunks: 1
  //       },
  //       commons: {
  //         name: 'commons',
  //         chunks: 'all',
  //         minChunks: 2
  //       }
  //     }
  //   }
  // }
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