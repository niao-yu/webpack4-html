import './index.scss'
import { innerWidth } from '@/main'
const dom = {
  body: $('body'),
  topBar: $('#topBar'),
  logo_img: $('#topBar .logo img'),
  nav_span: $('#topBar .nav > span'),
  nav_list: $('#topBar .nav-list'),
  nav_my_shadow: $('#topBar .nav .my-shadow'),
}
let topBarHeight
if (innerWidth) { // 如果移动端
  dom.nav_list.css({'display': 'none'})
  dom.nav_span.on('click', () => {
    if (dom.nav_my_shadow.css('display') === 'none') {
      dom.nav_my_shadow.css({'display': 'block'})
      dom.nav_list.css({'display': 'block'})
    } else {
      dom.nav_my_shadow.css({'display': 'none'})
      dom.nav_list.css({'display': 'none'})
    }
  })
  dom.nav_my_shadow.on('click', () => {
    dom.nav_my_shadow.css({ 'display': 'none' })
    dom.nav_list.css({ 'display': 'none' })
  })
  dom.nav_list.on('click', () => {
    dom.nav_my_shadow.css({ 'display': 'none' })
    dom.nav_list.css({ 'display': 'none' })
  })
} else {
  dom.nav_list.css({ 'display': 'flex' })
}
let bannerHeight = $('.home').height()
let scrollWatch = () => {
  let navArr = []
  let tempArr = $('.nav-list')
  for (let i = 0, length = tempArr.length; i < length; i++) {
    let obj = {
      className: tempArr[i].getAttribute('name'),
      spaceTop: $(tempArr[i]).offset().top
    }
    navArr.push(navArr)
  }
  let scroll = document.documentElement.scrollTop || document.body.scrollTop
  let opacity
  if (scroll < (bannerHeight - topBarHeight)) {
    opacity = scroll / (bannerHeight - topBarHeight)
    dom.topBar.css({
      'background-color': `rgba(255,255,255,${opacity})`,
      'box-shadow': `0 2px 4px 0 rgba(0,0,0,${opacity / 10})`,
    })
    if (opacity <= 0.5) {
      dom.logo_img.attr('src', require('@/assets/imgs/my_logo_white.png'))
      dom.nav_span.removeClass('black')
      dom.nav_list.children('div.nav-con').removeClass('black-font')
    }
    if (opacity > 0.5) {
      dom.logo_img.attr('src', require('@/assets/imgs/my_logo_black.png'))
      dom.nav_span.addClass('black')
      dom.nav_list.children('div.nav-con').addClass('black-font')
    }
  }
  else {
    dom.logo_img.attr('src', require('@/assets/imgs/my_logo_black.png'))
    dom.nav_span.addClass('black')
    dom.nav_list.children('div.nav-con').addClass('black-font')
    dom.topBar.css({
      'background-color': 'rgba(255,255,255,1)',
      'box-shadow': '0 2px 4px 0 rgba(0,0,0,.1)',
    })
  }
  scroll += topBarHeight
  for (let i = 0; i < navArr.length; i++) {
    if (navArr[i].spaceTop <= scroll) {
      if ((navArr[i + 1] && scroll < navArr[i + 1].spaceTop) || !navArr[i + 1]) {
        dom.nav_list.children('div').removeClass('nav-active')
        dom.nav_list.find(`[name=${navArr[i].className}]`).addClass('nav-active')
        break
      }
    }
  }
}
let init = () => {
  topBarHeight = dom.topBar.height()
  scrollWatch()
}
$(window).on('scroll', scrollWatch)
let changeNav = (className) => {
  let flagDom = $(`.${className}`)
  if (!flagDom) return console.warn('无此类名')
  let space = flagDom.offset().top
  $('html, body').animate({ scrollTop: space - topBarHeight}, 500)
  setTimeout(() => {
    dom.nav_list.children('div').removeClass('nav-active')
    dom.nav_list.find(`[name=${className}]`).addClass('nav-active')
  }, 500)
}
dom.nav_list.on('click', '.nav-con', function () {
  changeNav($(this).attr('name'))
})
init()
module.exports = changeNav