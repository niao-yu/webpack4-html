$(function() {
  // 滚动事件
  var topHeaderHeight = $('.topHeader').height()
  var navHeight = $('#nav').height()
  var navBg = $('#nav .nav-bg')
  $(window).on('scroll', function(e) {
    var scroll = document.documentElement.scrollTop || document.body.scrollTop - navHeight;
    var space = navHeight
    if (scroll < space) {
      navBg.css({ 'opacity': scroll / space})
    } else navBg.css({ 'opacity': 1 })
  })

  $('#nav div.list').on('click', 'span', function(e) {
    e = e || event
    $(e.target).addClass('active').siblings().removeClass('active')
    var to = $(e.target).attr('to')
    var arr = window.location.href.split('/')
    var url = arr[0] + '/' + arr[1] + '/' + arr[2]
    if (to === 'about') return window.location = url + '/index.html'
    // window.location = './' + $(e.target).attr('to') + '.html'
  })

  $('#nav #lang.canClick').on('click', function() {
    $('#nav #lang.canClick > ul.lang-list').fadeToggle('fast')
  })
  $('#nav #lang .lang-list').on('click', 'li', function(e) {
    e = e || event
    changeLanguage($(e.target).attr('lang'))
  })

  // 移动端显示和隐藏页面列表nav
  $('#nav nav > div > i.iconfont').on('click', function () {
    var dom = $('#nav nav div.list')
    if (dom.css('display') === 'none') {
      dom.css({'opacity': 0, 'display': 'flex'})
      dom.animate({ 'opacity': 1 }, 'fast')
    } else {
      dom.animate({ 'opacity': 0 }, 'fast', function() {
        dom.css('display', 'none')
      })
    }
  })
})