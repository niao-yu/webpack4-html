import './index.scss';
import '@/components/some/index.js';
import '@/components/one/index.js';
console.log('这儿是topBar的js')
setTimeout(() => {
  $('.topImg').attr('src', require('../../imgs/abc.png'))
}, 5000);