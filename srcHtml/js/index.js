$(function() {
  // 语言切换功能
  window.changeLanguage = function(lang) {
    document.cookie = 'lang' + '=' + lang;
    window.lang = lang
    var langData = this[lang]
    var change = function(obj) {
      var cb = obj.cb || undefined
      if (cb) {
        cb(langData)
      } else {
        var dom = $(obj.$)
        var attr = obj.attr || undefined
        var key = obj.key || undefined
        if (!dom) return console.warn('未选中 dom')
        if (!key) return console.warn('未指定语言的变量')
        if (!attr) dom.html(eval('langData.' + key))
        else dom.attr(attr, eval('langData.' + key))
      }
    }
    // 网站title
    change({cb: function(langData){
      document.title = langData.title.index
    }})
    // nav
    change({cb: function(langData){
      var data = langData.nav
      var span = ''
      $.each(data, function(k, v) {
        if (k === $('#app')[0].className) span += '<span to="' + k + '" class="canClick active nav-' + k + '">' + v + '</span>'
        else span += '<span to="' + k + '" class="canClick nav-' + k + '">' + v + '</span>'
      })
      $('#nav nav div.list').html(span)
    }})
    change({ $: '#nav #lang span', key: 'lang'})
    // index
    change({ $: '#index .banner-title', key: 'index.title'})
    change({ $: '#index #banner-info', key: 'index.info'})
    change({cb: function(langData) {
      var data = langData.index.features
      var li = ''
      $.each(data, function(index, val) {
        li += '<li>' + val + '</li>'
      })
      $('#index .banner ul.banner-features').html(li)
      if (langData.lang === 'CN') { // 中文
        $('#index .banner ul.banner-features').css('width', '210px')
      } else if (langData.lang === 'EN') { // 英文
        $('#index .banner ul.banner-features').css('width', '300px')
      }
    }})
    change({ $: '#index .input-box input', attr: 'placeholder', key: 'index.input'})
    change({cb: function(langData) {
      dom = $('#index .input-box .btn')
      var tab = '<span><span>' + langData.index.span + '</span>' + '<i class="iconfont icon-feiji"></i></span>'
      dom.html(tab)
    }})
    change({ $: '#index .VBC_title > h3', key: 'Indices.title_box.title'})
    change({ $: '#index #VBC_title_one span:eq(0)', key: 'Indices.title_box.subtitle[0]'})
    change({ $: '#index #VBC_title_two span:eq(0)', key: 'Indices.title_box.subtitle[1]'})
    // footer
    change({ $: '#footer > ul > li:eq(0) h6', key: 'footer.contact_title' })
    change({cb: function(langData) {
      var data = langData.footer.contact_list
      var li = ''
      $.each(data, function (index, footer) {
        li += '<li>' + footer.key + '<a href="mailto:' + footer.value + '">' + footer.value + '</a></li>'
      })
      $('#footer > ul > li:eq(0) > ul.contact').html(li)
    }})
    change({ $: '#footer > ul > li:eq(1) h6', key: 'footer.attention' })
    change({ $: '#footer #footer-tip span:eq(1)', key: 'footer.footer' })
  }
  var lang
  if (document.cookie) { // 从cookie里面取值
    var a = document.cookie.split(';');
    for (var i = 0; i < a.length; i++) {
      if (a[i].split('=')[0].trim() == 'lang') {
        lang = a[i].split('=')[1];
      }
    }
  }
  if (!lang) { // 如果没有,则获取浏览器默认语言
    var type = navigator.appName
    if (type == 'Netscape') lang = navigator.language //获取浏览器配置语言，支持非IE浏览器
    else lang = navigator.userLanguage //获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
    lang = lang.substr(0, 2) //获取浏览器配置语言前两位
    if (lang !== 'zh' && lang !== 'en') lang = 'en'
  }
  changeLanguage(lang)

  // 获取深度图数据
  var getDeepData = function () {
    $.ajax({
      url: 'https://bvc16.jar.today/api/mark/init',
      type: 'post',
      success: function (data) {
        $('#index .routerHighcharts .shake-box').remove()
        chart.series[0].update({
          data: data.data.list,
        });
        $('#index #VBC_title_one span:eq(1)').html(data.data.mark.idx)
        $('#index #VBC_title_two > span:eq(1) > span').html(data.data.mark.per + ' %').addClass(data.data.mark.per >= 0 ? 'rise' : 'fall')
        $('#index #VBC_title_two > span:eq(1) > img').attr('src', data.data.mark.per >= 0 ? './img/bvc16/rise.png' : './img/bvc16/fall.png')
      },
      error: function(error) {
        $('#index .routerHighcharts .shake-box').remove()
      }
    })
  }
  function setRootPx() {
    // banner 背景动画
    $("#bg-canvas").bezierCanvas({
      maxStyles: 10,
      maxLines: 100,
      lineSpacing: 1,
      colorBase: { r: 30, g: 255, b: 255 },
      colorVariation: { r: 150, g: 120, b: 150 },
      delayVariation: 0.5,
      globalAlpha: 0.4,
      globalSpeed: 500,
    });
    if (InnerWidth) { // 移动端页面
      $('#index .banner canvas').css('height', $('#index .banner canvas').height() + $('#nav').height() + 'px')
    } else { // pc端页面
      // 深度图
      (function (window) {
        Highcharts.setOptions({ global: { useUTC: false } });
        window.chart = new Highcharts.stockChart($('.highcharts-container')[0], {
          rangeSelector: {
            selected: 1,
            buttons: [{
              type: 'hour',
              count: 1,
              text: '1h'
            }, {
              type: 'day',
              count: 1,
              text: '1d'
            }, {
              type: 'week',
              count: 1,
              text: '1w'
            }, {
              type: 'month',
              count: 1,
              text: '1m'
            }, {
              type: 'all',
              text: 'All'
            }]
          },
          title: {
            text: null,
            align: 'center',
            floating: true,
            style: {
              color: '#999'
            },
          },
          yAxis: {
            opposite: false,
            labels: {
              align: 'center',
              x: -10,
              y: 0,
              formatter: function () {
                return '3'
              }
            }
          },
          plotOptions: {
            series: {
              showInLegend: true
            }
          },
          tooltip: {
            split: true,
            shared: true,
            backgroundColor: '#fff',   // 背景颜色
            borderColor: 'black',         // 边框颜色
            borderRadius: 5,             // 边框圆角
            borderWidth: 1,               // 边框宽度
            shadow: true,                 // 是否显示阴影
            animation: true,               // 是否启用动画效果
            style: {                      // 文字内容相关样式
              color: "#999",
              fontSize: "12px",
              fontWeight: "blod",
              fontFamily: "Courir new"
            },
            pointFormatter: function (value) {
              return 'Indices.title_box.title'
            },
          },
          series: [{
            type: 'line',
            // name: this.$t('Indices.title_box.title'),
            name: 'Indices.title_box.title',
            data: []
          }],
          credits: {
            enabled: false,
          }
        });
        getDeepData()
      })(window)
    }
  }
  setRootPx()
  // 窗口大小改变
  $(window).on('resize', function (e) {
    setRootPx()
  })

  // 订阅邮件
  function emailSubscribe () {
    if ($('#index .banner .input-box .btn').hasClass('onLoading')) return console.log(33)
    var dom = $('#index .banner .input-box input')
    var email = dom.val().trim()
    if (!email) { // 内容为空
      dom.val('')
      toast({
        message: 'Place Input!',
        type: 'warn'
      })
    } else { // 输入了邮箱
      if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)) { // 未通过校验
        toast({
          message: window[window.lang].email.error_email,
        })
        return false;
      }
      $('#index .banner .input-box .btn').addClass('onLoading')
      // 订阅邮箱
      $.ajax({
        url: 'https://api.coinmeet.io/api/blockemail',
        type: 'post',
        data: {
          email: email
        },
        success: function (data) {
          $('#index .banner .input-box .btn').removeClass('onLoading')
          if (data.code === 200) { // 订阅成功
            dom.val('')
            toast({
              message: window[window.lang].email.Subscription,
            })
          } else if (data.code === 400) { // 订阅失败
            toast({
              message: window[window.lang].email.email_repeat,
              type: 'error'
            })
          } else { // 订阅失败
            toast({
              message: window[window.lang].email.HTTP_error,
              type: 'error'
            })
          }
        },
        error: function (error) {
          $('#index .banner .input-box .btn').removeClass('onLoading')
          toast({
            message: 'HTTP request failed',
            type: 'error'
          })
          console.log(error)
        }
      })
    }
  }
  // 邮箱订阅
  $('#index .banner .input-box input').on('keyup', function(e) {
    e = e || event
    if (e.keyCode === 13) emailSubscribe()
  })
  $('#index .banner .input-box .btn').on('click', function() {
    emailSubscribe()
  })

// this.axios.post('https://bvc16.jar.today/api/mark/init').then(res => {
//   if (_this.$refs.simpleChart) {
//     _this.$refs.simpleChart.chart.series[0].update({
//       data: res.data.data.list,
//     });
//     this.spinShow = false;
//   }
//   _this.IndexLevel = res.data.data.mark.idx;
//   _this.Change = res.data.data.mark.per
// });
// this.interval = setInterval(() => {
//   this.axios.post('https://bvc16.jar.today/api/mark/init').then(res => {
//     if (_this.$refs.simpleChart) {
//       _this.$refs.simpleChart.chart.series[0].update({
//         data: res.data.data.list,
//       });
//       this.spinShow = false;
//     }
//     _this.IndexLevel = res.data.data.mark.idx;
//     _this.Change = res.data.data.mark.per
//   });
// }, 30000);
})