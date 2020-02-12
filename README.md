# 移动端农机商城前端 ( SPA )

> 基础命令

```
npm install // Project setup

npm run serve // Compiles and hot-reloads for development

npm run build // Compiles and minifies for production

npm run test // Run your tests

npm run lint // Lints and fixes files
```

> 开发环境

- [Vue-cli-config-doc](https://cli.vuejs.org/zh/config/)

- Vue/cli --> v3.11.0 

  ```
  vue create front_shop // 创建项目结构
  ```

- 依赖 ( In dedicated config files )

  - Babel
  - Router
  - Vuex
  - CSS Pre-processors Sass/SCSS (with dart-sass) for sass
  - ESLint with error prevention only ( Lint on save )

> 开发规则

- 路由模式 : hash

- 模块化规范遵循 ES6

- 路由跳转的方式

  - vant : ```<van-tabbar-item to="path"/>```
  - [van-tabbar-doc](https://youzan.github.io/vant/#/zh-CN/tabbar)
  - vue-router : ```<router-link to="path"/>```

> src 目录

- assets : 第三方资源文件
- components : 公共组件
- mock : 生成随机数据模拟后端数据接口 , 拦截 Ajax 请求 , 用于后端接口未完成的前端开发环境下
- router : vue-router 管理路由
- store : vuex 管理数据
- views : 页面组件
- App.vue : 根组件
- main.js : 主js文件

> 针对不同移动端屏幕采用的适配解决方案

  - **rem** ( @/assets/js/rem.js )
  - **Flex** ( 弹性盒模型 )

> 本项目采用组件库 : Vant ( v2.2.3 )

  - [vant-doc](https://youzan.github.io/vant/#/zh-CN/intro/)

  - 安装

    ```
    npm i vant@2.2.3 -S
    ```

  - babel7 按需导入组件配置

    ```
    npm i babel-plugin-import -D
    ```

    ```
    // in babel.config.js
    module.exports = {
      plugins: [
        ['import', {
          libraryName: 'vant',
          libraryDirectory: 'es',
          style: true
        }, 'vant']
      ]
    };
    ```

  - 按需导入组件示例 ( main.js )

    ```
    import { Component, ... } from 'vant'
    Vue.use( Component ).use(...) // 支持链式操作
    ```

  - [vant-doc](https://youzan.github.io/vant/#/zh-CN/intro/)

  - 其他常见的优秀 Vue.js 组件库 : Vux、iView、ElementUI、Muse-UI ...

- 首页头部导航栏

  - chrome 控制台中的 element.style 是通过 js 代码添加的内联样式

  - css 中 !important 权重值最高

    ```
    elem {
      style: xxx!important;
    }
    ```

- 首页轮播图优化

  > 强制规定了首页轮播图的宽高

  ```
  // html
  <van-swipe class="swipe">
    <van-swipe-item>
      <img/>
    </van-swipe-item>
  </van-swipe>

  // css
  .swipe {
    height: 3.6rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  ```

  > 采用图片懒加载

  ```
  // 引入Lazyload组件
  import { Lazyload } from 'vant'
  Vue.use( Lazyload )
  // 使用
  <img v-lazy="imgSrc"/>
  ```

- 首页热门商品组件 ( Vue-Awesome-Swiper )

  - [doc](https://www.npmjs.com/package/vue-awesome-swiper)

  - 安装

    ```
    npm install vue-awesome-swiper --save
    ```

  - mount with component

    ```
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

    - html 组件和 js 配置项建立对应关系如下

    ```
    // html
    <swiper :options="swiperOption" />

    // js
    export default {
      data() {
        return {
          swiperOption: {
            slidesPerView: 3
          }
        };
      }
    };
    ```

- 首页推荐商品

  - flex 布局 , 子元素使用 flex-basis 设置宽度

    ```
    flex-basis: 45%; // 优先级比 width 高
    ```

- 前后端交互通信技术 Ajax && Axios ( v0.19.2 )

  - 手动封装兼容性 Ajax

    ```
    // flag 默认为 true , 表示发送ajax请求是异步操作
    function ajaxFunc(method, url, data, callback, flag) {

      // 获取兼容IE的AJAX对象
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
      method = method.toUpperCase(); // 转大写

      // 发送请求
      if (method == 'GET') {
          xhr.open(method, url, flag);
          xhr.send();
      }
      if (method == 'POST') {
          xhr.open(method, url + '?' + data, flag);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //设置请求头,使用form表单的默认编码格式
          xhr.send(data);
      }

      // 事件监听
      xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                  callback(xhr.responseText);
              }
          }
      }

    }
    ```

  - get 和 post 发送请求的区别

    - get : 获取数据 , 请求参数可见 , 通过请求头发送数据 , 数据量小...

    - post : 提交数据 , 请求参数隐藏 , 通过请求体发送数据 , 数据量大...

  - Axios : 基于 Promise 的 HTTP 库

    - [axios-doc](https://www.npmjs.com/package/axios)

    - 安装

      ```
      npm install axios --save
      ```

    - 引入 axios 的两种方式 ( 采用第一种 )

      - On Vue.prototype

        ```
        // in main.js
        import axios from 'axios'
        Vue.prototype.$axios = axios

        // in component to get axios
        this.$axios
        ```

      - In component

        ```
        import axios from 'axios'
        ```        

    - axios 处理并发请求的方式

      - axios.all() 按照请求的顺序返回结果数组
      - axios.spread() 处理结果数组

      ```
      axios.all([func1(), func2(), func3(), ...]).then(
        axios.spread((res1, res2, res3, ...) => {
          // ...
        })
      )
      ```

    - [Vue.js 生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

- Mock.js 生成随机数据 , 拦截 Ajax 请求

  - [mock-doc](http://mockjs.com/)

  - 安装

    ```
    npm install mockjs --save-dev
    ```

  - 引入

    ```
    // main.js
    import '@/mock/mock.js'
    ```

  - 定义

    ```
    @/mock
    ```    

- 后台接口配置

  - 统一定义后台接口

    ```
    // src/service.config.js
    const SERVERURL = URL
    export default {
      getSwipeItems: `${SERVERURL}getSwipeItems`,
    }
    ```

  - 接口调用示例

    ```
    // component
    import api from '@/service.config.js'
    axios.get(api.getSwipeItems).then(res=>{...})
    ```

- 注册 / 登录 页面编写 ( @/views/profile.vue )

- 用户登录功能还可以使用 阿里大于 给用户发短信验证码 , 哈哈哈哈哈哈~

- 保存成功登陆的用户信息的一些实现方案

  - 方法一 : 挑选使用基于 Session 会话的中间件 
  
    - [koa2-session](https://www.npmjs.com/package/koa2-session)

    - [cookie-session](https://www.npmjs.com/package/cookie-session)

    - cookie 保存在客户端 , session 保存在服务端 , sessionID 保存在 cookie 里面

  - 方法二 : Redis

  - 方法三 : H5 本地化存储方案

    - sessionStorage

    - localStorage

  - 方法四 : [Vuex](https://vuex.vuejs.org/zh/)

    - vuex保存的信息会在页面刷新后被清除掉

    - 由于本项目的业务并不复杂 , 为了复习巩固技术知识 , 在保存用户登录状态功能的开发中采用 Vuex

    - 该功能中 actions 的使用单纯是为了练习通过 actions 派发 commit 来调用 mutations 的方法来改变 state 中的数据 , 而 actions 的真正意义在于其中可以书写异步代码 , mutations 是唯一可以改变 state 中数据的方法 , 其中只能书写同步代码

- 商品分类页面 ( [van-col](https://youzan.github.io/vant/#/zh-CN/col) 栅格布局 )

  - 改变选中的商品分类交互

    ```
    // html
    <li
      v-for="(item, index) in productTypes"
      :key="index"
      :class="{active: index == active}"
      @click="activeHandler(index)"
    >{{ item.typeName }}</li>

    // data
    data() {
      return {
        active: 0, // 默认选中第一种商品分类
      };
    }

    // css
    .active {
      color: #fff;
      background-color: rgb(25, 137, 251);
    }

    // js
    methods: {
      // 改变选中的商品分类
      activeHandler(index) {
        this.active = index;
      }
    }
    ```

  - 商品分类对应的商品列表 ( [van-list](https://youzan.github.io/vant/#/zh-CN/list) 自带上拉加载和下拉刷新 )

    - 商品名称只显示两行 , 多余内容打点显示

      ```
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

      ```
      loadMoreData() {
        this.getProductList(
          this.productTypes[this.active].typeId,
          this.productList.length,
          // ...
        );
      }
      ```

    - Tips: 在实现下拉刷新功能时 , 由于 van-list 设置了 ```position: absolute;``` 导致父元素 ```<van-pull-refresh/>``` 塌陷 , 故已将如下 css 代码从 ```<van-list/>``` 迁移至 ```<van-pull-refresh/>``` 的父元素 ```<van-col class="container">```

      ```
      position: absolute;
      right: 0;
      top: 1rem;
      bottom: 1rem;
      overflow-y: scroll;
      ```

- Vue-Router 中传递参数的三种方式

  - 匿名路由 ( 类似于 GET 方式传参 , 参数拼接在URL后 , 用户刷新页面后仍可获取到参数 )

    ```
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

    ```
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

    ```
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

      ```
      let obj = {}
      JSON.stringify(obj) == '{}'
      ```