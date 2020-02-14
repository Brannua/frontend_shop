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
import { mapState } from "vuex";
import api from "@/service.config.js";
export default {
  created() {
    if (JSON.stringify(this.userInfo) === "{}") {
      this.$toast.fail("请先登录");
      this.$router.push("/profile");
    } else {
      this.$axios({
        method: "get",
        url: api.getCartByUserId,
        params: {
          userId: this.userInfo._id
        }
      })
        .then(res => {
          if (res.data.data.length === 0) {
            this.$toast.fail("空空如也");
          } else {
            for (let item of res.data.data) {
              this.productList.push(item.productId);
            }
          }
        })
        .catch(() => {
          this.$toast.fail("获取购物车列表失败");
        });
    }
  },
  data() {
    return {
      productList: []
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    sumPrice() {
      return (
        this.productList.reduce((sum, itemPrice) => {
          return sum += itemPrice.price;
        }, 0) * 100
      );
    }
  },
  methods: {
    submitHandler() {
      this.$toast.success("结算功能该项目未涉及");
    },
    deleteProductHandler(id, index) {
      this.$axios({
        method: "post",
        url: api.deleteProductInCartByProductId,
        data: {
          productId: id
        }
      })
        .then((res) => {
          if (res.data.code === 200) {
            this.productList.splice(index, 1);
            this.$toast.success(res.data.message);
          }
        })
        .catch(() => {
          this.$toast.fail("删除失败");
        });
    }
  }
};
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
