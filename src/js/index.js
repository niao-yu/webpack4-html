

console.log(33)
import '@/css/index.scss'
// import '@/css/aaa.scss'
// import '../css/index.scss'
let a = ['111', '23', 'asf']
a.map(val => {
  val += 'aaaaa'
  console.log(1, val)
})
a.forEach(v => {
  console.log(1, v)
})
console.log('index')
$('div').html(a[1])