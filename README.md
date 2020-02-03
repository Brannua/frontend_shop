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
- mock : 生成随机数据 , 拦截 Ajax 请求 , 用于后端接口未完成的前端开发环境下
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

