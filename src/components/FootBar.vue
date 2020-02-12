<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="shop-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="records" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="star-o" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
};
</script>