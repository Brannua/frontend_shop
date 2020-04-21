<template>
  <div>
    <van-nav-bar title="商品详情" left-text="返回" @click-left="returnPrevPage"></van-nav-bar>
    <img :src="detail.img" class="detail-img" />
    <div class="detail">
      <p class="detail-name">{{ detail.name }}</p>
      <p class="detail-price">${{ detail.price }}</p>
      <p>公司 : {{ detail.company }}</p>
      <p>产地 : {{ detail.city }}</p>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCartHandler" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>

import api from "@/service.config.js"
import { mapState } from "vuex"

export default {
  data() {
    return {
      detail: {}
    }
  },
  computed: mapState(["userInfo"]),
  created() {

    const {id} = this.$route.query

    this.$axios({
      method: "get",
      url: api.getProductDetailById,
      params: { id }
    })
      .then((res) => {
        this.detail = res.data.data
      })
      .catch(() => {

        this.$toast.fail(
          `获取商品详细信息失败`
        )

      })
  },
  methods: {
    /**
     * @description 返回上一页
     */
    returnPrevPage() {
      this.$router.go(-1)
    },
    /**
     * @description 添加到购物车
     */
    addCartHandler() {

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

      const {_id: productId} = this.detail
      const {_id: userId} = this.userInfo

      // 添加购物车
      this.$axios({
        method: "post",
        url: api.addProductToCart,
        data: { productId, userId }
      })
        .then(res => {
          const {data} = res
          if (data.code === 200) {
            this.$toast.success(data.message)
          }
        })
        .catch(() => {
          this.$toast.fail(
            `添加失败`
          )
        })
    }
  }
}
</script>

<style lang="scss">
.detail {
  padding: 0.2rem;
  &-img {
    width: 100%;
    height: 5rem;
  }
  &-name {
    font-weight: bold;
  }
  &-price {
    color: #ff7300;
    font-size: 0.4rem;
  }
}
</style>
