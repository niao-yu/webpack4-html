import HTMLTemplate from '@/index.ejs';
const pages = {
  index: require('@/pages/index/index.ejs')()
}
const layout = {
  page(obj) {
    return HTMLTemplate({
      title: obj.title,
      content: pages[obj.content],
    })
  },
};
// const layout = require('@/utils/layout') // 引用工具


let obj = {
  index: layout.page({
    title: '这是自定义的页面名称',
    content: 'index'
  })
}
let get = (value) => {
  return obj[value]
}
module.exports = get