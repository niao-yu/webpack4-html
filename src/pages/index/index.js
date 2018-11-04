import './index.scss'
// import '@/components/topBar/index.js'
// import getRes from '@/utils/getRes'
// console.log('getRes', getRes)
// console.log('getRes', getRes.jsArr)
// getRes.jsArr('index', val => {
//   console.log('1234   ' + val)
//   require(`@/components/${val}/index.js`)
// })
console.log(1, mySource)
if (mySource.index) {
  mySource.index.forEach(v => {
    require(`@/components/${v}/index.js`)
  })
}
console.log('这里是 index')