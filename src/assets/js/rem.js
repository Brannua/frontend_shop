/**
 * @description rem
 * @author Brannua
 */

(function (root) {
  var docEl = root.document.documentElement // html
  var timer

  // 重置rem
  function reset() {
    clearTimeout(timer)
    timer = setTimeout(refreshRem, 10)
  }

  function refreshRem() {
    // 获取屏幕宽度( window.document.documentElement.getBoundClientRect().width )
    var width = docEl.getBoundingClientRect().width
    // 将屏幕宽度分成6.4份, 1份为1rem
    var rem = width / 6.4

    // 给html设置内联样式( fontSize = 1rem )
    // 320/6.4     html的fontsize = 50
    docEl.style.fontSize = rem + 'px'
  }

  // 监听调整页面尺寸
  root.addEventListener('resize', function () {
    reset()
  }, false)

  // 监听页面加载于缓存cache
  root.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      // 页面从缓存加载
      reset()
    }
  }, false)

  refreshRem()

})(window)
