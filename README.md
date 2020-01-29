# 移动端农机商城前端 ( SPA )

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

----------------------

## Day 1

> 开发环境
- Vue/cli --> v3.11.0

  ```
  vue create front_shop
  ```
- 依赖 ( In dedicated config files )
  - Babel
  - Router
  - Vuex
  - CSS Pre-processors Sass/SCSS (with dart-sass) for SCSS
  - ESLint with error prevention only ( Lint on save )

- 路由模式
  - hash

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