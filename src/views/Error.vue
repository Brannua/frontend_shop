<template>
  <div class="error">
    <h2>404 页面走丢啦~</h2>
    <van-button type="primary" @click="$router.push('/')">点击去往首页</van-button>
  </div>
</template>

<style lang="scss">
.error {
  text-align: center;
  height: 3rem;
  line-height: 3rem;
}
</style>