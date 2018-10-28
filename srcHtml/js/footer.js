$(function(){
  $('#footer .attention li:eq(2)').on('mouseover', function() {
    $('#footer .wechat_img').css({ 'display': 'block'})
  })
  $('#footer .attention li:eq(2)').on('mouseout', function() {
    $('#footer .wechat_img').css({'display': 'none'})
  })
})