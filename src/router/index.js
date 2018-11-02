
// if (process.env.flag && process.env.flag < 0) {
//   process.env.flag = -1
//   return module.exports = 1
// }

const layout = require('@/utils/layout') // 引用工具
// const index = require('@/pages/index.ejs') // 引入此页面
// const topBar = require('@/components/topBar/layout.js') // 引入组件 template
let arr = []
arr.push(layout.page({
  title: '这是自定义的页面名称',
  content: 'index'
}))
arr.push(layout.page({
  title: '这是自定义的页面名称',
  content: 'home'
}))
if (process.env.flag === undefined) process.env.flag = -1
if ((process.env.flag + 1) < arr.length) {
  process.env.flag++
  module.exports = arr[process.env.flag]
} else module.exports = false