const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 解析html插件
const ExtractTextPlugin = require('extract-text-webpack-plugin') // css文件拆分插件 注:下载时候为extract-text-webpack-plugin@next
const CleanWebpackPlugin = require('clean-webpack-plugin') // 用于在构建前清除dist目录中的内容
const optimizeCss = require('optimize-css-assets-webpack-plugin') // css 压缩插件
let js_arr = glob.sync('./src/js/**/*.js')
let html_arr = glob.sync('./src/pages/**/*.html')
let entry = {}
let HtmlWebpackPluginArr = []
// console.log(process.env.ABC)
html_arr.forEach(v => {
  let name = v.replace('./src/pages/', '').replace('.html', '')
  let temp = new HtmlWebpackPlugin({ // 解析html插件
    template: path.resolve(__dirname, v), // 路径
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
js_arr.forEach(v => {
  entry[v.replace('./src/js/', '').replace('.js', '')] = v
})
module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, './dist'), // 加点为相对路径,否则为此盘的绝对路径
    // publicPath: '../../../../build/',
    filename: 'js/[name].js'
  },
  // 前台开发本地服务插件
  devServer: {
    contentBase: './dist/', //路径(注意:加点-此路径为相对 output 的相对路径;不加点:此盘的绝对路径)
    port: '8085', // 端口
    compress: true, // 服务器压缩式，一般为true
    inline: true, // 实时刷新
    open: false // 服务启动,自动打开浏览器
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
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('autoprefixer')({
                    remove: false,
                    browsers: ['ie >= 8', '> 1% in CN'], // 浏览器兼容情况
                  })
                ]
              }
            },
          ],
          publicPath: '../', // 用来指向根目录(压缩后dist根目录)
        })
      }, { // 编译sass
        test:/\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('autoprefixer')({
                    remove: false,
                    browsers: ['ie >= 8', '> 1% in CN'], // 浏览器兼容情况
                  })
                ]
              }
            },
            {
              loader: 'sass-loader'
            },
          ],
          publicPath: '../', // 用来指向根目录(压缩后dist根目录)
        })
      }, { // 解析html文件中引入的img图片
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader',
      }, { // 解析通过css引入的图片
        test: /\.(jpg|jpeg|png|gif)$/,
        use: ['url-loader?limit=1024&name=./imgs/[name].[ext]'] // 带参数,可拆分入文件夹并设置大小
      },
      { // 解析字体图标
        test: /\.(woff|ttf|svg|eot|xttf|woff2)$/,
        use: 'file-loader?name=./fonts/[name].[ext]'
      }
    ]
  },
  // // 插件
  plugins: [
    new webpack.DefinePlugin({ // 插入编译后代码中的全局变量
      'MSG1': '\'webpack is good tool\'',
      'MSG2': JSON.stringify('webpack is good tool---'),
      'MSG3': 123
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, './dist')), // 清除dist构建目录文件
    ...HtmlWebpackPluginArr, // html们
    new optimizeCss(), // css的压缩
    new ExtractTextPlugin('css/[name].css'), // css文件拆分插件
  ]
}