const topBar = require('@/components/topBar/index.ejs') // topBar 顶部
const some = require('@/components/some/index.ejs') // topBar 顶部
const one = require('@/components/one/index.ejs') // topBar 顶部
const index = require('@/pages/index/index.ejs') // 主页主体
const home = require('@/pages/home/index.ejs') // 主页主体

let tps = {}

// // 组件
// tps.some = some()

// tps.one = one()

// tps.topBar = topBar({
//   some: tps.some,
//   one: tps.one,
// })


// 页面
tps.index = index()
// 页面
tps.home = home()


module.exports = tps
