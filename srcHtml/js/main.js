function setRootPx() {
  var width = window.innerWidth || document.body.clientWidth;
  document.documentElement.style.fontSize = width / 16 + 'px';
  width <= 800 ? window.InnerWidth = true : window.InnerWidth = false;
  if (!InnerWidth) { // pc页面
    if ($('#index .VBC_title')) $('#index .VBC_title').css({ 'display': 'block' })
    if ($('#index .routerHighcharts')) $('#index .routerHighcharts').css({ 'display': 'block' })
  } else { // 移动端页面
    if ($('#index .VBC_title')) $('#index .VBC_title').css({ 'display': 'none' })
    if ($('#index .routerHighcharts')) $('#index .routerHighcharts').css({ 'display': 'none' })
  }
}
setRootPx()
// 窗口大小改变
$(window).on('resize', function (e) {
  setRootPx()
})
window.toast = function(obj) {
  var dom = $('.toast-box')
  clearTimeout(window.toastTimer)
  if (!dom.length) {
    dom = $('<div></div>')
    $('body').append(dom)
  }
  var color = obj.color || '#71c844'
  if (obj.type) {
    if (obj.type === 'warn') color = '#dda639' 
    else if (obj.type === 'error') color = '#e9392a'
  }
  dom.css({
    'background': obj.background || '#fff',
    'font-size': '14px',
    'position': 'fixed',
    'color': color,
    'display': 'fixed',
    'top': '50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
    'border-radius': '5px' || obj['border-radius'],
    'display': 'none',
    'border': obj.border || '',
    'opacity': 0,
    'z-index': '1000',
    'padding': '10px 20px'
  })
  dom.addClass('toast-box').html(obj.message).css('display', 'block').animate({'opacity': 1}, function() {
    window.toastTimer = setTimeout(() => {
      dom.animate({ 'opacity': 0 }, function() {
        dom.css('display', 'none')
      })
    }, obj.timer || 3000);
  })
}