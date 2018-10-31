const layout = require('@/utils/layout') // 引用工具
// const index = require('@/pages/index.ejs') // 引入此页面

// const topBar = require('@/components/topBar/layout.js') // 引入组件 template

module.exports = layout.page({
  title: '这是自定义的页面名称',
  content: 'index'
})