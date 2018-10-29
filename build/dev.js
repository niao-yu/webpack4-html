const webpack = require('webpack')
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
  mode = 'development'
})