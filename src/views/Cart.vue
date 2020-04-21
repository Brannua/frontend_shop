<template>
  <div>
    <van-nav-bar class="nav" title="购物车"></van-nav-bar>
    <div class="card">
      <van-card v-for="(item, index) in productList" :key="index" :price="item.price" :desc="item.company" :title="item.name" :thumb="item.img">
        <div slot="footer">
          <van-button size="mini" @click="deleteProductHandler(item._id, index)">删除</van-button>
        </div>
      </van-card>
    </div>
    <van-submit-bar class="submit-bar" button-text="提交订单" :price="sumPrice" @submit="submitHandler"></van-submit-bar>
  </div>
</template>

<script>

import { mapState } from "vuex" // vuex状态管理
import api from "@/service.config.js" // 统一接口配置

export default {
  data() {
    return {
      productList: [] // 默认购物车数据为空数组
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    // 计算总价
    sumPrice() {
      return (
        this.productList.reduce((sum, item) => {
          return sum += item.price
        }, 0) * 100
      )
    }
  },
  created() {

    // 获取登录状态
    let isLogin = true
    if (JSON.stringify(this.userInfo) === "{}") {
      isLogin = false
    }

    // 没登录就先登录
    if (!isLogin) {
      this.$toast.fail("请先登录")
      this.$router.push("/profile")
      return
    }

    const { _id: userId } = this.userInfo
    this.$axios({
      method: "get",
      url: api.getCartByUserId,
      params: { userId }
    })
      .then((res) => {
        const {data: {data}} = res

        if (data.length === 0) {
          this.$toast.fail(
            `空空如也`
          )
          return
        }

        for (let item of data) {
          this.productList.push(item.productId)
        }

      })
      .catch(() => {
        this.$toast.fail(
          `获取购物车列表失败`
        )
      })
  },
  methods: {
    /**
     * @description 友好提示
     */
    submitHandler() {
      this.$toast.success(
        `结算功能该项目未涉及`
      )
    },
    /**
     * @description 删除购物车中的指定商品
     * @param {string} id 商品id
     * @param {number} index index
     */
    deleteProductHandler(id, index) {
      this.$axios({
        method: "post",
        url: api.deleteProductInCartByProductId,
        data: {
          productId: id
        }
      })
        .then((res) => {

          const {data} = res

          if (data.code === 200) {
            this.productList.splice(index, 1)
            this.$toast.success(data.message)
          }

        })
        .catch(() => {
          this.$toast.fail(
            `删除失败`
          )
        })
    }
  }
}
</script>

<style lang="scss">
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.card {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.submit-bar {
  margin-bottom: 0.8rem;
}
</style>
