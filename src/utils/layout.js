// const config = require('configModule');
// const noJquery = require('withoutJqueryModule');
// const dirsConfig = config.DIRS;

// /* 整理渲染公共部分所用到的模板变量 */
// const pf = {
//   pageTitle: '',
//   constructInsideUrl: noJquery.constructInsideUrl,
// };

// const moduleExports = {
//   /* 处理各个页面传入而又需要在公共区域用到的参数 */
//   init({ pageTitle }) {
//     pf.pageTitle = pageTitle; // 比如说页面名称，会在<title>或面包屑里用到
//     return this;
//   },

//   /* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */
//   run(content) {
//     const headerRenderData = Object.assign(dirsConfig, pf); // 页头组件需要加载css/js等，因此需要比较多的变量
//     const renderData = {
//       header: header(headerRenderData),
//       footer: footer(),
//       topNav: topNav(pf),
//       sideMenu: sideMenu(pf),
//       content,
//     };
//     return layout(renderData);
//   },
// };

// module.exports = moduleExports;


import HTMLTemplate from '@/index.ejs';
// import index from '@/pages/index.ejs';
// import topBar from '@/components/topBar/index.ejs';
// import '@/css/index.scss'
// console.log(345, NODE_ENV)
// let aaa = mainPage({
//   content: index()
// })
// console.log(aaa)
// module.exports = mainPage({
//   content: index({
//     topBar: topBar()
//   })
// })
// import { 
//   topBar } from
import templateLayout from './templateLayout';
// consot topBar = require('@/components/topBar.ejs')

const params = {}
const layout = {
  /* 处理各个页面传入而又需要在公共区域用到的参数 */
  // init(obj) {
  //   params = Object.assign(...params, ...obj)
  //   return this;
  // },

  /* 整合各公共组件和页面实际内容，最后生成完整的HTML文档 */
  page(obj) {
    // const headerRenderData = Object.assign(dirsConfig, pf); // 页头组件需要加载css/js等，因此需要比较多的变量
    // const renderData = {
    //   ...params,
    //   content,
    // };
    // if (fatherHtml) return HTMLTemplate(obj)
    // else return fatherHtml(obj)
    return HTMLTemplate({
      title: obj.title,
      content: templateLayout[obj.content],
    })
  },
};

module.exports = layout;