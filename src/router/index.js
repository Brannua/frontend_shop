import Vue from 'vue'
import VueRouter from 'vue-router'

import FootBar from '@/components/FootBar.vue' // 底部菜单栏组件

Vue.use(VueRouter)

const routes = [{
    path: '/',
    components: {
      default: () => import("@/views/Home"),
      'foot-bar': FootBar
    }
  },
  {
    path: '/category',
    components: {
      default: () => import("@/views/Category"),
      'foot-bar': FootBar
    }
  },
  {
    path: '/cart',
    components: {
      default: () => import("@/views/Cart"),
      'foot-bar': FootBar
    }
  },
  {
    path: '/profile',
    components: {
      default: () => import("@/views/Profile"),
      'foot-bar': FootBar
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
