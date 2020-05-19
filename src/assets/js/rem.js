/**
 * @description rem
 * @author Brannua
 */

(function (root) {
  var docEl = root.document.documentElement // html

  function setRem() {
    // 获取屏幕宽度
    var width = docEl.getBoundingClientRect().width
    // 将屏幕宽度分成6.4份, 1份为1rem ( 320/6.4 --> html的fontsize = 50 )
    var rem = width / 6.4
    // 计算并设置html内联字体大小( fontSize = 1rem )
    docEl.style.fontSize = rem + 'px'
  }

  // init: 初始化立即设置一下html标签的字体大小
  setRem()

  // 监听调整页面尺寸
  root.addEventListener('resize', setRem, false)

  // 监听页面加载于缓存cache
  root.addEventListener('pageshow', (e) => {
    e.persisted && setRem()
  }, false)

})(window)
