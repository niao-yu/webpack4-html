import '../css/index.scss'
let a = ['111', '23', 'asf']
a.map(val => {
  val += 'aaaaa'
  console.log(1, val)
})
a.forEach(v => {
  console.log(1, v)
})

console.log('index')