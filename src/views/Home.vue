<template>
  <div class="container">
    <!-- 首页头部导航栏 -->
    <van-nav-bar title="首页" class="nav-bar">
      <van-icon name="search" slot="left"></van-icon>
      <van-icon name="cart" slot="right"></van-icon>
    </van-nav-bar>

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="swiper">
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
        <li v-for="(product, index) in recommendProducts" class="recommend-list-item" :key="index">
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
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swipeItems: [// 轮播图假数据
        {
          imgSrc:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1041994715,1243354266&fm=26&gp=0.jpg"
        },
        {
          imgSrc:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1041994715,1243354266&fm=26&gp=0.jpg"
        },
        {
          imgSrc:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1041994715,1243354266&fm=26&gp=0.jpg"
        },
        {
          imgSrc:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1041994715,1243354266&fm=26&gp=0.jpg"
        }
      ],
      hotProducts: [// 热门商品假数据
        {
          name: "汽油动力手推割杆机 养殖场专用青储割晒机",
          img:
            "http://img47.nongjx.com/2/20180628/636657846366213316507_198_170_5.jpg",
          price: "3260",
          company: "曲阜市润众机械制造有限公司",
          city: "曲阜市"
        },
        {
          name: "手扶带牧草收割机 青储高杆作物割晒机",
          img:
            "http://img47.nongjx.com/2/20180628/636657846396789904965_198_170_5.jpg",
          price: "3260",
          company: "曲阜市润众机械制造有限公司",
          city: "曲阜市"
        },
        {
          name: "不缠秧的花生果子收割机 手扶马铃薯收获机",
          img:
            "http://img48.nongjx.com/2/20180628/636657836692623289517_198_170_5.jpg",
          price: "2800",
          company: "曲阜市润众机械制造有限公司",
          city: "曲阜市"
        },
        {
          name: "高港区手扶车带动土豆收获机收山芋机器",
          img:
            "http://img49.nongjx.com/2/20180511/636616318740584319169_198_170_5.jpg",
          price: "1900",
          company: "山东曲阜宏燊工贸有限公司",
          city: "曲阜市"
        },
        {
          name: "拖拉机带多功能割晒机 玉米高粱杆子收割机",
          img:
            "http://img50.nongjx.com/2/20180628/636657846333452686281_198_170_5.jpg",
          price: "3260",
          company: "曲阜市润众机械制造有限公司",
          city: "曲阜市"
        },
        {
          name: "厂家直销大型花生收获机 地下薯类挖收机",
          img:
            "http://img48.nongjx.com/2/20180628/636657834205779466463_198_170_5.jpg",
          price: "2800",
          company: "  曲阜市润众机械制造有限公司",
          city: "曲阜市"
        }
      ],
      swiperOption: {// 热门商品配置项
        slidesPerView: 3
      },
      recommendProducts: [// 推荐商品假数据
        {
          name: "汽油动力手推割杆机 养殖场专用青储割晒机",
          img:
            "http://img47.nongjx.com/2/20180628/636657846366213316507_198_170_5.jpg",
          price: "3260",
          company: "曲阜市润众机械制造有限公司",
          city: "曲阜市"
        },
        {
          name: "手扶带牧草收割机 青储高杆作物割晒机",
          img:
            "http://img47.nongjx.com/2/20180628/636657846396789904965_198_170_5.jpg",
          price: "3260",
          company: "曲阜市润众机械制造有限公司",
          city: "曲阜市"
        },
        {
          name: "不缠秧的花生果子收割机 手扶马铃薯收获机",
          img:
            "http://img48.nongjx.com/2/20180628/636657836692623289517_198_170_5.jpg",
          price: "2800",
          company: "曲阜市润众机械制造有限公司",
          city: "曲阜市"
        },
        {
          name: "高港区手扶车带动土豆收获机收山芋机器",
          img:
            "http://img49.nongjx.com/2/20180511/636616318740584319169_198_170_5.jpg",
          price: "1900",
          company: "山东曲阜宏燊工贸有限公司",
          city: "曲阜市"
        },
        {
          name: "拖拉机带多功能割晒机 玉米高粱杆子收割机",
          img:
            "http://img50.nongjx.com/2/20180628/636657846333452686281_198_170_5.jpg",
          price: "3260",
          company: "曲阜市润众机械制造有限公司",
          city: "曲阜市"
        },
        {
          name: "厂家直销大型花生收获机 地下薯类挖收机",
          img:
            "http://img48.nongjx.com/2/20180628/636657834205779466463_198_170_5.jpg",
          price: "2800",
          company: "  曲阜市润众机械制造有限公司",
          city: "曲阜市"
        }
      ]
    };
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
  z-index: 999!important;
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
