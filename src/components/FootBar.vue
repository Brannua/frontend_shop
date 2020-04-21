<template>
  <van-tabbar v-model="active" @change="changeHandler">
    <van-tabbar-item icon="shop-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="records" to="/category">分类</van-tabbar-item>
    <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="star-o" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  created() {
    let stringResult = sessionStorage.getItem("active")
    if (stringResult) {
      // 刷新页面 footer当前选中不改变
      this.active = parseInt(stringResult)
    } else {
      this.active = 0
    }
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    changeHandler(active) {
      sessionStorage.setItem("active", active)
    }
  }
}
</script>