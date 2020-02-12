<template>
  <div>
    <van-nav-bar title="商品分类" class="nav"></van-nav-bar>
    <div class="category">
      <van-row>
        <van-col span="6" class="left-nav">
          <ul>
            <li
              v-for="(item, index) in productTypes"
              :key="index"
              :class="{active: index == active}"
              @click="activeHandler(index)"
            >{{ item.typeName }}</li>
          </ul>
        </van-col>
        <van-col span="18" class="container">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list
              class="list"
              v-model="loading"
              :finished="finished"
              @load="loadMoreData"
              :immediate-check="false"
            >
              <div @click="goDetail(item._id)" class="list-item" v-for="(item, index) in productList" :key="index">
                <img :src="item.img" />
                <p class="list-item-name">{{ item.name }}</p>
                <p>$ {{ item.price }}</p>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import api from "@/service.config.js";
export default {
  created() {
    this.$axios({
      method: "get",
      url: api.getProductTypes
    })
      .then(res => {
        this.productTypes = res.data.data;
        this.getProductList(
          this.productTypes[this.active].typeId,
          this.productList.length,
          this.count
        );
      })
      .catch(err => {
        console.error(err);
      });
  },
  data() {
    return {
      active: 0, // 默认选中第一种商品分类
      productTypes: [],
      productList: [],
      count: 10, // 默认一次查询十条数据
      loading: false,
      finished: false,
      isRefresh: false
    };
  },
  methods: {
    getProductList(typeId, start, count) {
      this.$axios({
        method: "get",
        url: api.getProductsByType,
        params: {
          typeId,
          start,
          count
        }
      })
        .then(res => {
          if (res.data.data.length) {
            this.productList = this.productList.concat(res.data.data);
            this.loading = false;
          } else {
            this.finished = true;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 改变选中的商品分类
    activeHandler(index) {
      this.active = index;
      this.productList = [];
      this.getProductList(
        this.productTypes[this.active].typeId,
        this.productList.length,
        this.count
      );
    },
    loadMoreData() {
      this.getProductList(
        this.productTypes[this.active].typeId,
        this.productList.length,
        this.count
      );
    },
    onRefresh() {
      this.productList = [];
      this.getProductList(
        this.productTypes[this.active].typeId,
        this.productList.length,
        this.count
      );
      this.isRefresh = false;
    },
    goDetail(productId) {
      this.$router.push({
        path: '/detail',
        query: {
          id: productId
        }
      });
    }
  }
};
</script>

<style lang="scss">
.nav {
  height: 1rem;
  line-height: 1rem;
}

.left-nav {
  background-color: #eee;
  li {
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    padding: 0.2rem;
    border-bottom: 2px solid #fff;
  }
  .active {
    color: #fff;
    background-color: rgb(25, 137, 251);
  }
}

.container {
  position: absolute;
  right: 0;
  top: 1rem;
  bottom: 1rem;
  overflow-y: scroll;
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    &-item {
      width: 40%;
      text-align: center;
      img {
        width: 2rem;
        height: 2rem;
      }
      &-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
