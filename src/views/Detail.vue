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
import api from "@/service.config.js";
import { mapState } from 'vuex';
export default {
  created() {
    this.$axios({
      method: "get",
      url: api.getProductDetailById,
      params: {
        id: this.$route.query.id
      }
    })
      .then(res => {
        this.detail = res.data.data;
        console.log(this.detail);
      })
      .catch(err => {
        console.error(err);
      });
  },
  data() {
    return {
      detail: {}
    };
  },
  computed: mapState(['userInfo']),
  methods: {
    returnPrevPage() {
      this.$router.go(-1);
    },
    addCartHandler() {
      if (JSON.stringify(this.userInfo) === '{}') {
        this.$toast.fail('请先登录');
        this.$router.push('/profile');
      } else {
        // 插入购物车
        
      }
    }
  }
};
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
