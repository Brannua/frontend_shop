(function (win) {
  var docEl = win.document.documentElement, // html
    timer;

  function refreshRem() {
    // 获取屏幕宽度( window.document.documentElement.getBoundClientRect().width )
    var width = docEl.getBoundingClientRect().width,
      // 将屏幕宽度分成6.4份, 1份为1rem
      rem = width / 6.4;

    // 给html设置内联样式( fontSize = 1rem; )
    // 320/6.4     html的fontsize = 50
    docEl.style.fontSize = rem + 'px';
  }

  function reset() {
    clearTimeout(timer);
    timer = setTimeout(refreshRem, 10);
  }

  /* 监听调整页面尺寸 */
  win.addEventListener('resize', function () {
    reset();
  }, false);

  /* 监听页面加载于缓存cache */
  win.addEventListener('pageshow', function (e) {
    // e.persisted判断如果页面加载于缓存
    e.persisted && reset();
  }, false);

  refreshRem();

})(window);