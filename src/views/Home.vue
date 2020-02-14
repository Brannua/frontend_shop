<template>
  <div class="container">
    <!-- 首页头部导航栏 -->
    <van-nav-bar class="nav-bar" title="首页">
      <van-icon name="search" slot="left"></van-icon>
      <van-icon slot="right" @click="loginHandler">{{ JSON.stringify(userInfo) === '{}' ? '点击登录' : userInfo.userName }}</van-icon>
    </van-nav-bar>

    <!-- 轮播图 -->
    <van-swipe class="swiper" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in swipeItems" :key="index">
        <img v-lazy="item.imgSrc" />
      </van-swipe-item>
    </van-swipe>

    <!-- 热门商品 -->
    <div class="hot">
      <p class="hot-title">热门商品</p>
      <swiper class="hot-swiper" :options="swiperOption">
        <swiper-slide v-for="(product, index) in hotProducts" :key="index">
          <div class="hot-swiper-item">
            <img :src="product.img" />
            <div>{{ product.name }}</div>
            <div>$ {{ product.price }}</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- 推荐商品 -->
    <div class="recommend">
      <p>推荐商品</p>
      <ul class="recommend-list">
        <li v-for="(product, index) in recommendProducts" :key="index" class="recommend-list-item">
          <img :src="product.img" />
          <p>{{ product.name }}</p>
          <p>$ {{ product.price }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import api from '@/service.config.js';
import { mapState } from 'vuex';
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swipeItems: [],
      hotProducts: [],
      swiperOption: {
        // 热门商品配置项
        slidesPerView: 3
      },
      recommendProducts: []
    };
  },
  computed: mapState(['userInfo']),
  methods: {
    getSwipeItems() {
      return this.$axios({
        method: 'get',
        url: api.getSwipeItems
      })
    },
    getHotProducts() {
      return this.$axios({
        method: 'get',
        url: api.getHotProducts
      })
    },
    getRecommendProducts() {
      return this.$axios({
        method: 'get',
        url: api.getRecommendProducts
      })
    },
    loginHandler() {
      this.$router.push('/profile');
    }
  },
  created() {
    this.$axios.all([this.getSwipeItems(), this.getHotProducts(), this.getRecommendProducts()]).then(
      this.$axios.spread((res1, res2, res3) => {
        this.swipeItems = res1.data
        this.hotProducts = res2.data
        this.recommendProducts = res3.data
      })
    )
  }
};
</script>

<style lang="scss">
// 设置首页底色
.container {
  background-color: #eee;
}

// 首页头部导航栏
.nav-bar {
  z-index: 999 !important;
  position: fixed;
  top: 0;
  left: 0;

  // fixed脱离文档流
  width: 100%;
}

// 强制规定轮播图宽高
.swiper {
  height: 3.6rem;
  margin-top: 1rem;
  img {
    width: 100%;
    height: 100%;
  }
}

// 热门商品
.hot {
  margin-top: 0.2rem;
  background-color: #fff;
  &-title {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
  }
  &-swiper {
    &-item {
      width: 2rem;
      text-align: center;
      img {
        width: 100%;
      }
    }
  }
}

// 推荐商品
.recommend {
  background-color: #fff;
  margin-top: 0.2rem;
  text-align: center;
  margin-bottom: 1rem;
  &-list {
    display: flex;

    // flex换行显示
    flex-wrap: wrap;

    justify-content: space-around;
    &-item {
      flex-basis: 45%;
      img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}
</style>
