<template>
  <!-- 底部菜单栏组件, 采用命名空间的命名方式来配合scss -->
  <ul class="footer-bar">
    <li class="footer-bar-item">
      <router-link to="/">首页</router-link>
    </li>
    <li class="footer-bar-item">
      <router-link to="/category">分类</router-link>
    </li>
    <li class="footer-bar-item">
      <router-link to="/cart">购物车</router-link>
    </li>
    <li class="footer-bar-item">
      <router-link to="/profile">我的</router-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer-bar {
  display: flex;
  background-color: #eee;
  position: fixed;

  // 该行是因为position:fixed;会导致脱离文档流
  width: 100%;

  bottom: 0;
  height: 1rem;
  line-height: 1rem;
  &-item {
    flex-grow: 1;
    text-align: center;
  }
}
</style>