<template>
  <div>
    <van-nav-bar class="nav" title="商品分类"></van-nav-bar>
    <div class="category">
      <van-row>
        <van-col class="left-nav" span="6">
          <ul>
            <li v-for="(item, index) in productTypes" :key="index" :class="{active: index == active}" @click="activeHandler(index)">{{ item.typeName }}</li>
          </ul>
        </van-col>
        <van-col class="container" span="18">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list class="list" v-model="loading" :finished="finished" :immediate-check="false" @load="loadMoreData">
              <div v-for="(item, index) in productList" :key="index" class="list-item" @click="goDetail(item._id)">
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
import api from "@/service.config.js"
export default {
  data() {
    return {
      active: 0, // 默认选中商品分类
      productTypes: [], // 商品类别
      productList: [],  // 商品数据
      count: 10, // 默认一次查询数据条数
      loading: false,
      finished: false,
      isRefresh: false
    }
  },
  created() {
    this.$axios({
      method: "get",
      url: api.getProductTypes
    })
      .then((res) => {
        const {data: {data}} = res

        const {typeId} = data[this.active]
        const {length} = this.productList
        const {count} = this

        this.productTypes = data
        this.getProductList( typeId, length, count )
      })
      .catch(() => {
        this.$toast.fail(
          `获取商品分类失败`
        )
      })
  },
  methods: {
    /**
     * @description 获取商品列表
     * @param {number} typeId typeId
     * @param {number} start 用于分页查询
     * @param {number} count 一次查询的数据条数
     */
    getProductList(typeId, start, count) {
      this.$axios({
        method: "get",
        url: api.getProductsByType,
        params: { typeId, start, count }
      })
        .then((res) => {

          const {data: {data}} = res

          if (data.length) {
            this.productList = this.productList.concat(data)
            this.loading = false
            return
          }

          this.finished = true
        })
        .catch(() => {

          this.$toast.fail(
            `获取商品数据失败`
          )

        })
    },

    /**
     * @description 改变选中的商品分类
     * @param {number} index index
     */
    activeHandler(index) {
      this.active = index
      this.productList = []

      const {typeId} = this.productTypes[this.active]
      const {length} = this.productList
      const {count} = this

      this.getProductList( typeId, length, count )
    },

    /**
     * @description 上拉加载
     */
    loadMoreData() {
      const {typeId} = this.productTypes[this.active]
      const {length} = this.productList
      const {count} = this

      this.getProductList( typeId, length, count )
    },

    /**
     * @description 下拉刷新
     */
    onRefresh() {
      this.productList = []

      const {typeId} = this.productTypes[this.active]
      const {length} = this.productList
      const {count} = this

      this.getProductList( typeId, length, count )
      this.isRefresh = false
    },

    /**
     * @description 进入商品详情
     * @param {string} productId productId
     */
    goDetail(productId) {

      this.$router.push({
        path: '/detail',
        query: {
          id: productId
        }
      })

    }
  }
}
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
