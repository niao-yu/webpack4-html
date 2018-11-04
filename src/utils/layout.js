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

module.exports = layout;