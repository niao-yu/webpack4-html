

// let entry = '../components'
let obj = {}
// componentsNameAttr.forEach(val => {
//   obj[val] = {
//     ejs: require(`${entry}/${val}/index.ejs`)(),
//     js: require(`${entry}/${val}/index.js`),
//   }
// })
let getRes = {}
// getRes.obj = {}
getRes.component = (sourceName, resourceName) => {
  // if (!process.env.mySource) process.env.mySource = {}
  if (!process.env.mySource[sourceName]) process.env.mySource[sourceName] = []
  process.env.mySource[sourceName].push(resourceName)
  // if (getRes.obj[sourceName] === undefined) {
  //   getRes.obj[sourceName] = {
  //     cb: undefined,
  //     list: []
  //   }
  // }
  // getRes.obj[sourceName].list.push(resourceName)
  // if (getRes.obj[sourceName].cb) getRes.obj[sourceName].cb(resourceName)
  // console.log(getRes.obj)
  return require(`../components/${resourceName}/index.ejs`)()
}
// getRes.jsArr = (sourceName, cb) => {
//   console.log('jsArr')
//   console.log('getRes.obj', getRes.obj)
//   if (getRes.obj[sourceName] === undefined) {
//     getRes.obj[sourceName] = {
//       list: [],
//       cb
//     }
//   } else {
//     getRes.obj[sourceName].cb = cb
//     getRes.obj[sourceName].list.forEach(v => {
//       cb(v)
//     })
//   }
// }


module.exports = getRes