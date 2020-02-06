import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/reset.css' // css基础样式重置
import '@/assets/js/rem.js' // 不同移动端屏幕适配解决方案

/* Vue 挂载 axios */
import axios from 'axios'
Vue.prototype.$axios = axios

/* mock.js 生成随机数据模拟后端接口 , 拦截 Ajax 请求 , 后端接口上线即废弃 */
import '@/mock/mock.js'

/* 按需引入vant组件 */
import {
  NavBar,
  Icon,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Lazyload,
  Tab,
  Tabs,
  CellGroup,
  Field,
  Button,
  Toast,
  Col,
  Row,
  List,
} from 'vant'
Vue.use(NavBar).use(Icon).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem).use(Lazyload).use(Tab).use(Tabs).use(CellGroup).use(Field).use(Button).use(Toast).use(Col).use(Row).use(List)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')