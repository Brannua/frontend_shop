import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const FootBar = () => import("@/components/FootBar.vue")

const routes = [{
    path: '/',
    components: {
      default: () => import("@/views/Home"),
      'foot-bar': FootBar
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/category',
    components: {
      default: () => import("@/views/Category"),
      'foot-bar': FootBar
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import("@/views/Detail")
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
    },
    meta: {
      keepAlive: true
    }
  },
  {
    path: '*',
    component: () => import("@/views/Error")
  }
]

const router = new VueRouter({
  routes
})

export default router
