import HTMLTemplate from '@/index.ejs';
import tps from './templateLayout';
// consot topBar = require('@/components/topBar.ejs')

// const params = {}
const layout = {
  /* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */
  page(obj) {
    return HTMLTemplate({
      title: obj.title,
      content: tps[obj.content],
    })
  },
};

module.exports = layout;