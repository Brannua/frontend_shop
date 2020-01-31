import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/reset.css'// css基础样式重置
import '@/assets/js/rem.js'// 不同移动端屏幕适配解决方案

// 按需引入vant组件
import { NavBar, Icon, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload } from 'vant'
Vue.use( NavBar ).use( Icon ).use( Tabbar ).use( TabbarItem ).use( Swipe ).use( SwipeItem ).use( Lazyload )

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
