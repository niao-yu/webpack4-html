
require('../css/index.scss')
require('../css/aaa.scss')
// import '../css/aaa.scss'
// import '../css/bbb.scss'
// import '../css/index.scss'
let a = ['111', '23', 'asf']
a.map(val => {
  if (val === '111') debugger
  val += 'aaaaa'
  console.log(1, val)
})
a.forEach(v => {
  console.log(1, v)
})

console.log('index')