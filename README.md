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

- [Vue-cli 配置参考文档](https://cli.vuejs.org/zh/config/)
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

- 路由模式 : **hash**

- 路由跳转的方式
  - vue-router : ```<router-link to="path"/>```
  - vant : ```<van-tabbar-item to="path"/>``` [[doc](https://youzan.github.io/vant/#/zh-CN/tabbar)]

> src 说明
- assets : 第三方资源文件
- components : 公共组件
- router : vue-router 管理路由
- store : vuex 管理数据
- views : 页面组件
- App.vue : 根组件
- main.js : 主js文件

> 针对不同移动端屏幕采用的适配解决方案

  - **rem** ( @/assets/js/rem.js )
  - **Flex** ( 弹性盒模型 )

> 本项目采用组件库 : Vant ( v2.2.3 )

  - [参考文档](https://youzan.github.io/vant/#/zh-CN/intro/)

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

  - [vant组件参考文档](https://youzan.github.io/vant/#/zh-CN/intro/)

  - 其他常见的优秀Vue.js组件库 : Vux、iView、ElementUI、Muse-UI ...

- 首页头部导航栏
  - chrome控制台中的element.style是通过js代码添加的内联样式
  - css中!important权重值最高
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
  - [参考文档](https://www.npmjs.com/package/vue-awesome-swiper)
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
    - [Swiper API](https://swiperjs.com/api/)
    - html组件和js配置项建立对应关系如下
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
  - flex布局 , 子元素使用flex-basis设置宽度
    ```
    flex-basis: 45%; // 优先级比width高
    ```