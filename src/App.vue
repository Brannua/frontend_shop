<template>
  <div id="app">

    <!-- views中的路由default默认组件渲染到这里( 还使用了keep-alive 指定缓存组件 ) -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <!-- components中的公共组件FootBar 路由具名组件foot-bar -->
    <router-view name="foot-bar"></router-view>

  </div>
</template>
