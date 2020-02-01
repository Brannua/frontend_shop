
import Mock from 'mockjs'
import { mockSwiperImage, mockProductData } from './tool.js'
import api from '@/service.config.js'


/* 模拟首页轮播图数据接口 */
Mock.mock(api.getSwipeItems, () => {
  return mockSwiperImage()
})

/* 模拟首页热门商品数据接口 */
Mock.mock(api.getHotProducts, () => {
  return mockProductData()
})

/* 模拟首页推荐商品数据接口 */
Mock.mock(api.getRecommendProducts, () => {
  return mockProductData()
})