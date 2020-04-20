# 移动端农机商城前端 ( SPA )

![](https://s1.ax1x.com/2020/04/20/J3SU3R.png)

- 项目技术栈

  - `Vue全家桶、Vant、ES6、Scss、webpack、babel、eslint`

- 开发环境 [VueCLI v3.11.0](https://cli.vuejs.org/zh/config/)

  ```
    vue create front_shop // 创建项目结构
  ```

- 模块化规范 : ES6

- 路由模式 : hash

- /src 目录

  ```
    assets              // 第三方资源文件
    components          // 公共组件
    mock                // 生成随机数据拦截Ajax请求模拟后端数据接口 ( 用于后端接口未完成的前端开发环境下 )
    router              // vue-router 管理路由
    store               // vuex 状态管理
    views               // 页面组件
    App.vue             // 根组件
    main.js             // 主js文件
    service.config.js   // 统一配置后台接口
  ```

- 针对不同移动端屏幕采用的适配解决方案

  - **rem** ( @/assets/js/rem.js )

  - **Flex** ( 弹性盒模型 )

- vant 按需导入组件配置 ( babel7 )

  ```
    npm i babel-plugin-import -D
  ```
  ```js
    // in babel.config.js
    module.exports = {
      plugins: [
        ['import', {
          libraryName: 'vant',
          libraryDirectory: 'es',
          style: true
        }, 'vant']
      ]
    }
  ```
  ```js
    // /src/main.js
    import { Component, ... } from 'vant'
    Vue.use( Component ).use(...) // 支持链式操作
  ```

- 首页头部导航栏

  - Chrome 控制台中的 ```element.style``` 是通过 js 代码添加的内联样式

  - Css 中 ```!important``` 权重值最高

    ```css
      elem {
        style: xxx!important;
      }
    ```

- 首页轮播图优化

  - 强制规定了首页轮播图的宽高

    ```html
      <van-swipe class="swipe">
        <van-swipe-item>
          <img/>
        </van-swipe-item>
      </van-swipe>
    ```
    ```css
      .swipe {
        height: 3.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    ```

  - 图片懒加载

    ```js
      import { Lazyload } from 'vant'
      Vue.use( Lazyload )
    ```
    ```html
      <img v-lazy="imgSrc"/>
    ```

- 首页热门商品插件 : [Vue-Awesome-Swiper](https://www.npmjs.com/package/vue-awesome-swiper)

  - mount with component

    ```js
      import 'swiper/dist/css/swiper.css'
      import { swiper, swiperSlide } from 'vue-awesome-swiper'
      export default {
        components: {
          swiper,
          swiperSlide
        }
      }
    ```

  - 一页展示三条热门商品数据

    - [swiper-api](https://swiperjs.com/api/)

      ```html
        <swiper :options="swiperOption" />
      ```
      ```js
        export default {
          data() {
            return {
              swiperOption: {
                slidesPerView: 3
              }
            }
          }
        }
      ```

- 首页推荐商品采用flex布局

  ```css
    .parent {
      display: flex;
    }
    .son {
      flex-basis: 45%; // 设置宽度, 优先级比 width 高
    }
  ```

- 路由跳转的两种方式

  - [van-tabbar](https://youzan.github.io/vant/#/zh-CN/tabbar) : ```<van-tabbar-item to="path"/>```

  - vue-router : ```<router-link to="path"/>```

- 前后端通信采用基于Promise的HTTP库 : [Axios](https://www.npmjs.com/package/axios)

    - 引入 axios 的两种方式 ( 采用第一种 )

      - On Vue.prototype

        ```js
          // in main.js
          import axios from 'axios'
          Vue.prototype.$axios = axios

          // in component to get axios
          this.$axios
        ```

      - In component

        ```js
          import axios from 'axios'
        ```        

    - axios 处理并发请求的方式

      - axios.all() 按照请求的顺序返回结果数组

      - axios.spread() 处理结果数组

        ```js
          axios.all([func1(), func2(), func3(), ...]).then(
            axios.spread((res1, res2, res3, ...) => {
              // ...
            })
          )
        ```

    - get 和 post 发送请求的区别

      - get : 获取数据 , 请求参数可见 , 通过请求头发送数据 , 数据量小...

      - post : 提交数据 , 请求参数隐藏 , 通过请求体发送数据 , 数据量大...

- [Mock.js](http://mockjs.com/) 插件生成随机数据模拟后端接口拦截Ajax请求

  - 定义: @/mock

  - 引入: main.js

    ```js
      import '@/mock/mock.js'
    ```

- 统一配置后台接口

  ```js
    // src/service.config.js
    export default {
      registUser: `${SERVERURL}user/registUser`
    }

    // in component
    import api from '@/service.config.js'
    axios({
      method: 'get',
      url: api.getSwipeItems
    })
  ```

- 保存成功登陆的用户信息的实现方案

  - 方法一 : 挑选使用基于 Session 会话的中间件，使用 cookie-session-redis 的方式
  
    - [koa2-session](https://www.npmjs.com/package/koa2-session)

    - [cookie-session](https://www.npmjs.com/package/cookie-session)

    - Tips : cookie 保存在客户端 , session 保存在服务端 , sessionID 保存在 cookie 里面

  - 方法二 : H5 本地化存储方案

    - localStorage

    - sessionStorage

  - 方法三 : [Vuex](https://vuex.vuejs.org/zh/)

    - vuex保存的信息会在页面刷新后被清除掉

    - 由于本项目的业务并不复杂 , 为了复习巩固技术知识 , 在保存用户登录状态功能的开发中采用 Vuex

    - 该功能中 actions 的使用单纯是为了练习通过 actions 派发 commit 来调用 mutations 的方法来改变 state 中的数据 , 而 actions 的真正意义在于其中可以书写异步代码 , mutations 是唯一可以改变 state 中数据的方法 , 其中只能书写同步代码

- 商品分类页面 [van-col 栅格布局](https://youzan.github.io/vant/#/zh-CN/col)

  - 改变选中的商品分类交互

    ```html
      <li
        :class="{active: index == active}"
        @click="activeHandler(index)"
      >{{ item.typeName }}</li>
    ```
    ```css
      .active {
        color: #fff;
        background-color: rgb(25, 137, 251);
      }
    ```
    ```js
      data() {
        return {
          active: 0 // 默认选中第一种商品分类
        }
      }
      methods: {
        // 改变选中的商品分类
        activeHandler(index) {
          this.active = index;
        }
      }
    ```

  - 商品分类对应的商品列表 [van-list](https://youzan.github.io/vant/#/zh-CN/list)

    - 商品名称只显示两行 , 多余内容打点显示

      ```css
        .list-item-name {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      ```

  - [BUG 记录](https://github.com/youzan/vant/issues/5634)

    - 将 position : fixed; 改为 position : absolute; 就可以触发 load 事件

    - ```:immediate-check="false``` 取消首次加载数据就触发 load 事件 , 否则如下代码报错 , 因为首次加载组件的时候 this.productTypes 和 this.productList 都为空数组

      ```js
        loadMoreData() {
          this.getProductList(
            this.productTypes[this.active].typeId,
            this.productList.length,
            // ...
          )
        }
      ```

    - Tips: 在实现下拉刷新功能时 , 由于 van-list 设置了 ```position: absolute;``` 导致父元素 ```<van-pull-refresh/>``` 塌陷 , 故已将如下 css 代码从 ```<van-list/>``` 迁移至 ```<van-pull-refresh/>``` 的父元素 ```<van-col class="container">```

      ```css
        {
          position: absolute;
          right: 0;
          top: 1rem;
          bottom: 1rem;
          overflow-y: scroll;
        }
      ```

- Vue-Router 中传递参数的三种方式

  - 匿名路由 ( 类似于 GET 方式传参 , 参数拼接在URL后 , 用户刷新页面后仍可获取到参数 )

    ```js
      // src/router/index.js
      {
        path: '/detail',
      }

      // src/views/Category.vue
      this.$router.push({
        path: '/detail',
        query: {id: ...}
      });

      // src/views/Detail.vue
      created() {
        console.log(this.$route.query.id);
      }
    ```

  - 具名路由 ( 类似于 POST 方式传参 , 用户刷新页面后参数丢失 )

    ```js
      // src/router/index.js
      {
        path: '/detail',
        name: 'detail',
      }

      // src/views/Category.vue
      this.$router.push({
        name: 'detail',
        params: {id: ...}
      });

      // src/views/Detail.vue
      created() {
        console.log(this.$route.params.id);
      }
    ```

  - path可动态配置的路由 ( 参数拼接在URL上 , 用户刷新页面后仍可获取到参数 )

    ```js
      // src/router/index.js
      {
        path: '/detail/:id',
      }

      // src/views/Category.vue
      this.$router.push(`/detail/${id}`);

      // src/views/Detail.vue
      created() {
        console.log(this.$route.params.id);
      }
    ```

- 加入购物车功能的两种思路

  - 点击加入购物车后 , 将商品信息保存在本地存储 , 购物车页面可从本地存储中读取商品信息并展示 , 在用户点击提交订单结算的时候再判断用户是否登录

  - 点击加入购物车后 , 判断用户是否登录 , 只有登陆成功的用户才可以将商品信息加入到数据库中的购物车表中 , 在购物车页面读取数据库展示信息

    - Tips : 本项目采用前端Vuex保存用户信息页面刷新后信息会丢失 , 一般项目大多采用后端保存用户信息( oa2-session / redis ) 结合 JWT token

    - 判断对象是空对象的方式

      ```js
        let obj = {}
        JSON.stringify(obj) == '{}'
      ```

- 计算属性 ```computed``` 计算购物车总价

  - 当一个属性依赖于多个属性的值的时候适合使用该属性

    - Tips : 只要其关联的属性值不发生变化 , 可直接从缓存中取出上一次计算的值使用

- 刷新页面后 , 优化FooterBar组件的默认选中

  ```js
    // vant文档说明切换标签时会触发change事件, 故给tabbar组件绑定change事件, 在其中将当前active值保存在本地存储, 每次刷新页面从本地存储读取active值应用到该组件上
    // Tips: localStorage读取的是string类型的数据, 需要转化成number类型

    // FooterBar.vue
    changeHandler(active) {
      localStorage.setItem('active', active);
    }

    created() {
      this.active = parseInt(localStorage.getItem('active'));
    }
  ```

- vue2.x 提出 [keep-alive](https://cn.vuejs.org/v2/api/#keep-alive) 组件 , 主要用于保留组件状态或避免重新渲染。

  ```html
    // App.vue
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-else="!$route.meta.keepAlive"></router-view>
  ```
  ```js
    // @/router/index.js 中指定需要被缓存的组件的路由
    meta: {
      keepAlive: true
    }
  ```

- 路由组件采用懒加载的方式

  ```js
    {
      path: '/',
      component: () => import("@/views/Home")
    }
  ```

- 增添404错误组件 (@/views/Error.vue)

- 项目打包和分析(--report)

  ```
    vue.config.js // vue-cli配置的核心文件

    "build": "vue-cli-service build --report" // package.json
  ```

- gzip压缩项目

  ```
    npm install compression-webpack-plugin --save-dev
  ```
