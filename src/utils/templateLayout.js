const index = require('@/pages/index/index.ejs') // 主页主体
const topBar = require('@/components/topBar/index.ejs') // topBar 顶部
const some = require('@/components/some/index.ejs') // topBar 顶部
const one = require('@/components/one/index.ejs') // topBar 顶部

let templateLayout = {}

// 组件
templateLayout.some = some()
templateLayout.one = one()
templateLayout.topBar = topBar({
  some: templateLayout.some,
  one: templateLayout.one,
})


// 页面
templateLayout.index = index({
  topBar: templateLayout.topBar
})


module.exports = templateLayout
