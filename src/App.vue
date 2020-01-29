<template>
  <div id="app">
    <!-- views中的路由default默认组件渲染到这里 -->
    <router-view></router-view>
    <!-- components中的路由具名组件渲染到这里 -->
    <router-view name="foot-bar"></router-view>
  </div>
</template>
