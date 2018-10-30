const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 解析html插件
let CopyWebpackPlugin = require('copy-webpack-plugin') // 整体直接复制的插件
// const ExtractTextPlugin = require('extract-text-webpack-plugin') // css文件拆分插件 注:下载时候为extract-text-webpack-plugin@next
const MiniCssExtractPlugin = require('mini-css-extract-plugin')  //处理css工具
const optimizeCss = require('optimize-css-assets-webpack-plugin') // css 压缩插件

const { defaultConfig } = require('../config/index')

let js_arr = glob.sync(path.join(defaultConfig.entry, '/js/**/*.js')) // js入口文件
let html_arr = glob.sync(path.join(defaultConfig.entry, '/pages/**/*.*')) // 页面口文件
let entry = {}
let HtmlWebpackPluginArr = []
// 遍历处理html的文件们
html_arr.forEach(value => {
  let name = value.slice(value.lastIndexOf('/') + 1, value.lastIndexOf('.'))
  let temp = new HtmlWebpackPlugin({ // 解析html插件
    template: path.resolve(__dirname, value), // 路径
    filename: `${name}.html`, // 文件名:默认为index.html
    minify: { // 使用的功能
      removeAttributeQuotes: true,//去除引号
      removeComments: true,//去除注释
      removeEmptyAttributes: true,//去除空属性
      collapseWhitespace: true//去除空格
    },
    chunks: [`${name}`]
  })
  HtmlWebpackPluginArr.push(temp)
})
// 遍历处理入口js们
js_arr.forEach(value => {
  entry[value.slice(value.lastIndexOf('/') + 1, value.lastIndexOf('.'))] = value
})


module.exports = {
  entry, // => {index: '...', homePage: '...', ...}
  output: {
    path: defaultConfig.output, // 加点为相对路径,否则为此盘的绝对路径
    // publicPath: '../../../../build/',
    filename: 'js/[name].[hash].js'
  },
  // 加载器
  module: {
    rules: [
      { // 编译 es6
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { // 编译css
        test:/\.css$/,
        exclude: /node_modules/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }, { // 编译sass
        test:/\.scss$/,
        exclude: /node_modules/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }, { // 解析html文件中引入的img图片
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader',
      }, { // 解析通过css引入的图片
        test: /\.(jpg|jpeg|png|gif)$/,
        use: ['url-loader?limit=1024&name=./imgs/[name].[hash].[ext]'] // 带参数,可拆分入文件夹并设置大小
      },
      { // 解析字体图标
        test: /\.(woff|ttf|svg|eot|xttf|woff2)$/,
        use: 'file-loader?name=./fonts/[name].[hash].[ext]'
      },
      { // 解析字体图标
        test: /static\//,
        use: 'file-loader',
      },
    ]
  },
  // 插件
  plugins: [
    new webpack.DefinePlugin({ // 插入编译后代码中的全局变量
      'MSG1': '\'webpack is good tool\'',
      'MSG2': JSON.stringify('webpack is good tool---'),
      'MSG3': 123
    }),
    ...HtmlWebpackPluginArr, // html们
    new optimizeCss(), // css的压缩
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      // chunkFilename: "styles.[contentHash:8].css"   //把css文件单独打包
    }),
    // 复制插件
    new CopyWebpackPlugin([
      {
        from: path.join(defaultConfig.entry, '/static'),
        to: path.join(defaultConfig.output, '/static'),
        // ignore: '' // 忽略的文件
      },
    ])
  ]
}
