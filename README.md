# 移动端农机商城前端项目

> [项目后端部分请移步此处](https://github.com/Brannua/backend_shop)

> [项目文档和开发笔记总结请移步此处](https://blog.csdn.net/Brannua/article/details/104320841)

### 项目技术栈

```Vue全家桶、Vant组件库、scss、es6、eslint、babel、webpack、mock.js```

### 快速启动项目

```
  npm install   // 安装依赖
  npm run dev   // 运行项目( 开发环境下 )
```

### 项目结构概览

```
  .
  ├── babel.config.js       // bebel配置
  ├── package.json          // 项目配置
  ├── public                // 存放公共静态资源
  ├── README.md             // 项目说明书
  ├── src                   // 存放源代码
  │   ├── App.vue           // 根组件
  │   ├── assets            // 存放资源文件
  │   ├── components        // 存放公共组件
  │   ├── main.js           // 主js文件
  │   ├── mock              // mock模拟的后台，用于测试开发，当前mock效果只保留于项目首页
  │   ├── router            // 路由
  │   ├── service.config.js // 统一的后台接口配置
  │   ├── store             // 数据状态管理
  │   └── views             // 存放页面组件
  │       ├── Cart.vue      // 购物车页面组件
  │       ├── Category.vue  // 商品分类页面组件
  │       ├── Detail.vue    // 商品详情页面组件
  │       ├── Error.vue     // 404错误处理页面组件
  │       ├── Home.vue      // 首页页面组件
  │       └── Profile.vue   // 登录注册页面组件
  └── vue.config.js         // vue配置文件
```

- 项目运行结果预览

  ![](https://s1.ax1x.com/2020/04/20/J3SU3R.png)

> Author: 东北农业大学微机1705 -- 刘培杰
